import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles, Download } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function MockupGenerator() {
  const [description, setDescription] = useState("");
  const [generatedMockup, setGeneratedMockup] = useState<{
    mockupImageUrl: string;
    enhancedPrompt: string;
  } | null>(null);

  const generateMutation = trpc.mockup.generateMockup.useMutation();

  const handleGenerate = async () => {
    if (description.trim().length < 10) {
      toast.error("Please provide a more detailed description (at least 10 characters)");
      return;
    }

    try {
      const result = await generateMutation.mutateAsync({
        description: description.trim(),
      });

      if (result.mockupImageUrl) {
        setGeneratedMockup({
          mockupImageUrl: result.mockupImageUrl,
          enhancedPrompt: result.enhancedPrompt || "",
        });
        toast.success("Mockup generated successfully!");
      }
    } catch (error) {
      toast.error("Failed to generate mockup. Please try again.");
      console.error(error);
    }
  };

  const handleDownload = () => {
    if (generatedMockup?.mockupImageUrl) {
      window.open(generatedMockup.mockupImageUrl, '_blank');
    }
  };

  return (
    <section id="mockup-generator" className="py-20 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-10 w-10 text-[oklch(0.72_0.11_215)]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.51_0.12_230)]">
              See Your Idea Come to Life
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            Describe your web app or website idea, and our AI will generate a custom UI/UX mockup in seconds.
          </p>
          <p className="text-sm text-foreground">
            No login required. Completely free. Powered by advanced AI design tools.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-2 border-[oklch(0.72_0.11_215)]">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Textarea */}
                <div>
                  <label
                    htmlFor="mockup-description"
                    className="block text-sm font-semibold text-foreground mb-3"
                  >
                    Describe your web app idea:
                  </label>
                  <Textarea
                    id="mockup-description"
                    placeholder="Example: A donation platform for animal rescues with monthly giving options, volunteer scheduling, and impact reporting dashboards showing animals helped..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[150px] text-base border-[oklch(0.72_0.11_215)] focus:border-[oklch(0.51_0.12_230)] focus:ring-[oklch(0.51_0.12_230)]"
                    disabled={generateMutation.isPending}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Be specific about features, user types, and key workflows for best results.
                  </p>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending || description.trim().length < 10}
                  className="w-full bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white font-semibold text-lg py-6"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Your Mockup...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create My Mockup
                    </>
                  )}
                </Button>

                {/* Loading State Info */}
                {generateMutation.isPending && (
                  <div className="bg-[oklch(0.96_0.02_215)] p-4 rounded-lg">
                    <p className="text-sm text-center text-muted-foreground">
                      Our AI is analyzing your idea and creating a professional mockup. This may take 10-20 seconds...
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generated Mockup Display */}
          {generatedMockup && (
            <div className="mt-12 space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[oklch(0.51_0.12_230)] mb-2">
                  Your Custom Mockup
                </h3>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  {generatedMockup.enhancedPrompt}
                </p>
              </div>

              <Card className="shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-[oklch(0.96_0.02_215)]">
                    <img
                      src={generatedMockup.mockupImageUrl}
                      alt="Generated mockup"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-2 border-[oklch(0.51_0.12_230)] text-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.51_0.12_230)] hover:text-white font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Mockup
                </Button>
                <Button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="bg-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.45_0.12_230)] text-white font-semibold"
                >
                  Love it? Let's Build It Together →
                </Button>
              </div>

              {/* Try Again */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setGeneratedMockup(null);
                    setDescription("");
                  }}
                  className="text-sm text-[oklch(0.72_0.11_215)] hover:text-[oklch(0.51_0.12_230)] font-medium underline"
                >
                  Generate Another Mockup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
