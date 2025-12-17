import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, BarChart3, Zap, TrendingUp, MessageSquare, FileText } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

export default function AIWorkflowSection() {
  // Chatbot state
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Blog generator state
  const [blogTopic, setBlogTopic] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isBlogLoading, setIsBlogLoading] = useState(false);

  const SUGGESTED_QUESTIONS = [
    "How can I automate invoice generation from my CRM?",
    "What's the best way to sync Stripe payments with QuickBooks?",
    "Can you help me set up automated expense tracking?",
    "How do I connect Airtable to my accounting dashboard?",
  ];

  const handleChatSubmit = async () => {
    if (!chatQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setIsChatLoading(true);
    setChatResponse("");

    try {
      // Simulate AI response (replace with actual LLM call if needed)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const mockResponse = `Great question! Here's how you can ${chatQuestion.toLowerCase()}:\n\n1. **Choose Your Integration Platform**: Tools like n8n, Zapier, or Make.com offer pre-built connectors for most business apps.\n\n2. **Map Your Data Flow**: Identify which fields need to sync between systems (e.g., customer name, amount, invoice number).\n\n3. **Set Up Triggers**: Configure when the automation should run (e.g., when a new deal closes in CRM, when a payment is received).\n\n4. **Test Thoroughly**: Run test transactions to ensure data flows correctly before going live.\n\n5. **Monitor & Optimize**: Review automation logs weekly to catch any errors or inefficiencies.\n\nWant a custom automation workflow designed specifically for your business? **Schedule a consultation** and we'll build it together!`;
      
      setChatResponse(mockResponse);
      toast.success("Response generated!");
    } catch (error) {
      toast.error("Failed to generate response");
      console.error(error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleBlogGenerate = async () => {
    if (!blogTopic.trim()) {
      toast.error("Please enter a blog topic");
      return;
    }

    setIsBlogLoading(true);
    setBlogContent("");

    try {
      // Simulate AI blog generation (replace with actual LLM call if needed)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const mockBlog = `# ${blogTopic}\n\nIn today's fast-paced business environment, ${blogTopic.toLowerCase()} has become a critical factor for success. Whether you're a startup founder or managing an established nonprofit, understanding this topic can transform your operations.\n\n## Why This Matters\n\nMany organizations struggle with inefficient processes that drain time and resources. By focusing on ${blogTopic.toLowerCase()}, you can:\n\n- **Save Time**: Automate repetitive tasks and focus on strategic growth\n- **Reduce Errors**: Eliminate manual data entry mistakes\n- **Improve Cash Flow**: Get real-time visibility into your financial health\n- **Scale Confidently**: Build systems that grow with your organization\n\n## Getting Started\n\nThe first step is understanding your current workflow. Map out where data enters your system, how it moves between tools, and where bottlenecks occur.\n\n**Ready to optimize your operations?** Contact Socall C Group for a free consultation on custom automation solutions tailored to your business.`;
      
      setBlogContent(mockBlog);
      toast.success("Blog post generated!");
    } catch (error) {
      toast.error("Failed to generate blog post");
      console.error(error);
    } finally {
      setIsBlogLoading(false);
    }
  };

  return (
    <section id="ai-automation" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.51_0.12_230)] mb-6">
            Automate Your Financial Workflow
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Generate, Develop & Nurture Relationships with Customers or Donors
          </p>
          <p className="text-base text-foreground">
            Integrate CRM, QuickBooks Online and 800+ apps into custom dashboards for a seamless automation pipeline. Powered by People. Scaled with Technology.
          </p>
        </div>

        {/* Visual Flow Diagram */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-xl bg-gradient-to-r from-[oklch(0.96_0.02_215)] to-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* CRM Input */}
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-[oklch(0.51_0.12_230)] flex items-center justify-center mb-4">
                    <BarChart3 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[oklch(0.51_0.12_230)] mb-2">CRM</h3>
                  <p className="text-sm text-muted-foreground">(Input)</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block">
                  <TrendingUp className="h-8 w-8 text-[oklch(0.72_0.11_215)]" />
                </div>

                {/* Automation Engine */}
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-24 h-24 rounded-full bg-[oklch(0.72_0.11_215)] flex items-center justify-center mb-4 shadow-lg">
                    <Zap className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-[oklch(0.72_0.11_215)] mb-2">Automation Engine</h3>
                  <p className="text-sm text-muted-foreground">(Center, Highlighted)</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block">
                  <TrendingUp className="h-8 w-8 text-[oklch(0.72_0.11_215)]" />
                </div>

                {/* QBO + Dashboards Output */}
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-[oklch(0.51_0.12_230)] flex items-center justify-center mb-4">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[oklch(0.51_0.12_230)] mb-2">QBO + Dashboards</h3>
                  <p className="text-sm text-muted-foreground">(Output)</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold text-[oklch(0.51_0.12_230)]">$275/month</span> — Seamless integration of your entire financial ecosystem
                </p>
                <Button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white font-semibold"
                >
                  Learn About Automation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* FAQ Chatbot */}
          <Card className="shadow-xl">
            <CardHeader className="bg-[oklch(0.96_0.02_215)]">
              <CardTitle className="flex items-center gap-2 text-[oklch(0.51_0.12_230)]">
                <MessageSquare className="h-6 w-6" />
                Ask About Automation Workflows
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Get instant answers about automation possibilities for your business:
              </p>

              {/* Suggested Questions */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Suggested Questions:</p>
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setChatQuestion(question)}
                    className="block w-full text-left text-xs text-[oklch(0.72_0.11_215)] hover:text-[oklch(0.51_0.12_230)] hover:underline"
                  >
                    • {question}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask your automation question..."
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
                  disabled={isChatLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleChatSubmit}
                  disabled={isChatLoading || !chatQuestion.trim()}
                  className="bg-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.45_0.12_230)]"
                >
                  {isChatLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Response */}
              {chatResponse && (
                <div className="bg-[oklch(0.96_0.02_215)] p-4 rounded-lg max-h-64 overflow-y-auto">
                  <Streamdown>{chatResponse}</Streamdown>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Blog Generator */}
          <Card className="shadow-xl">
            <CardHeader className="bg-[oklch(0.96_0.02_215)]">
              <CardTitle className="flex items-center gap-2 text-[oklch(0.51_0.12_230)]">
                <FileText className="h-6 w-6" />
                AI Blog Post Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate a 100-word blog post introduction on any financial or automation topic:
              </p>

              {/* Input */}
              <div className="space-y-2">
                <Input
                  placeholder="Enter a topic (e.g., 'Automating Nonprofit Donations')"
                  value={blogTopic}
                  onChange={(e) => setBlogTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBlogGenerate()}
                  disabled={isBlogLoading}
                />
                <Button
                  onClick={handleBlogGenerate}
                  disabled={isBlogLoading || !blogTopic.trim()}
                  className="w-full bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white"
                >
                  {isBlogLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Blog Post"
                  )}
                </Button>
              </div>

              {/* Generated Content */}
              {blogContent && (
                <div className="bg-white border border-[oklch(0.72_0.11_215)] p-4 rounded-lg max-h-64 overflow-y-auto prose prose-sm max-w-none">
                  <Streamdown>{blogContent}</Streamdown>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
