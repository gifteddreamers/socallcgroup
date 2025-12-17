import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { mockupRequests } from "../drizzle/schema";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { eq, desc } from "drizzle-orm";

export const mockupRouter = router({
  /**
   * Generate a mockup from user description
   * Uses LLM to enhance description + image generation to create mockup
   */
  generateMockup: publicProcedure
    .input(
      z.object({
        description: z.string().min(10, "Description must be at least 10 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { description } = input;
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Create initial mockup request record
      const [mockupRequest] = await db.insert(mockupRequests).values({
        userId: ctx.user?.id,
        description,
        status: "generating",
      }).$returningId();

      try {
        // Step 1: Use LLM to enhance the user's description into a detailed UI/UX prompt
        const llmResponse = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a UI/UX design expert. Given a user's web app idea, create a detailed prompt for an AI image generator to create a professional mockup. 

The mockup should use the Ocean Trust color palette:
- Primary Blue: #1B7BA8 (main headings, CTAs, highlights)
- Accent Cyan: #45B9DE (secondary elements, hover states)
- Dark Blue: #0D4E6B (section dividers, callout boxes)
- Light Blue: #E8F4F8 (backgrounds)

Output format: A single paragraph describing the mockup layout, colors, components, and visual style. Be specific about UI elements (navigation, hero section, cards, buttons, forms, etc.).`,
            },
            {
              role: "user",
              content: `Create a detailed UI/UX mockup prompt for this web app idea:\n\n"${description}"`,
            },
          ],
        });

        const enhancedPrompt = typeof llmResponse.choices[0]?.message?.content === 'string' 
          ? llmResponse.choices[0].message.content 
          : description;

        // Step 2: Generate mockup image using the enhanced prompt
        const imagePrompt = `Professional web application UI mockup: ${enhancedPrompt}. Modern, clean design with clear typography, intuitive layout, and professional color scheme. Desktop view, high-quality interface design.`;

        const { url: mockupImageUrl } = await generateImage({
          prompt: imagePrompt,
        });

        // Step 3: Update mockup request with results
        await db
          .update(mockupRequests)
          .set({
            enhancedPrompt,
            mockupImageUrl,
            status: "completed",
          })
          .where(eq(mockupRequests.id, mockupRequest.id));

        return {
          id: mockupRequest.id,
          mockupImageUrl,
          enhancedPrompt,
          status: "completed" as const,
        };
      } catch (error) {
        // Update mockup request with error
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        await db
          .update(mockupRequests)
          .set({
            status: "failed",
            errorMessage,
          })
          .where(eq(mockupRequests.id, mockupRequest.id));

        throw new Error(`Failed to generate mockup: ${errorMessage}`);
      }
    }),

  /**
   * Get user's mockup history (authenticated users only)
   */
  getMyMockups: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const mockups = await db
      .select()
      .from(mockupRequests)
      .where(eq(mockupRequests.userId, ctx.user.id))
      .orderBy(desc(mockupRequests.createdAt))
      .limit(20);

    return mockups;
  }),

  /**
   * Get a specific mockup by ID
   */
  getMockupById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const [mockup] = await db
        .select()
        .from(mockupRequests)
        .where(eq(mockupRequests.id, id))
        .limit(1);

      return mockup || null;
    }),
});
