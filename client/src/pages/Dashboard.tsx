import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, Download, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Fetch subscription data
  const { data: subscription, isLoading: subLoading } = trpc.stripe.getSubscription.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Fetch billing history
  const { data: billingHistory, isLoading: billingLoading } = trpc.stripe.getBillingHistory.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Fetch user's mockups
  const { data: mockups, isLoading: mockupsLoading } = trpc.mockup.getMyMockups.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Cancel subscription mutation
  const cancelMutation = trpc.stripe.cancelSubscription.useMutation({
    onSuccess: () => {
      toast.success("Subscription canceled successfully");
    },
    onError: () => {
      toast.error("Failed to cancel subscription");
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.51_0.12_230)]" />
      </div>
    );
  }

  if (!user) {
    setLocation("/");
    return null;
  }

  const handleCancelSubscription = async () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      await cancelMutation.mutateAsync();
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "startups":
        return "bg-[oklch(0.72_0.11_215)] text-white";
      case "emerging-growth":
        return "bg-[oklch(0.51_0.12_230)] text-white";
      case "scale":
        return "bg-[oklch(0.28_0.06_230)] text-white";
      case "enterprise":
        return "bg-gradient-to-r from-[oklch(0.51_0.12_230)] to-[oklch(0.28_0.06_230)] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatTierName = (tier: string) => {
    return tier
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-[oklch(0.51_0.12_230)] to-[oklch(0.72_0.11_215)] text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-white/80">Manage your subscription and view your generated mockups</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Card */}
          <Card className="lg:col-span-2 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[oklch(0.51_0.12_230)]">
                <CreditCard className="h-6 w-6" />
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.51_0.12_230)]" />
                </div>
              ) : subscription ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-foreground">
                          {user.currentTier ? formatTierName(user.currentTier) : "Active"}
                        </h3>
                        <Badge className={user.currentTier ? getTierBadgeColor(user.currentTier) : "bg-gray-500 text-white"}>
                          {subscription.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subscription ID</p>
                      <p className="text-xs font-mono text-foreground truncate max-w-[150px]">
                        {subscription.id.slice(0, 20)}...
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
                      <p className="font-semibold">
                        {subscription.currentPeriodEnd
                          ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                      <p className="font-semibold">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setLocation("/pricing")}
                      className="flex-1 border-[oklch(0.51_0.12_230)] text-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.51_0.12_230)] hover:text-white"
                    >
                      Change Plan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancelSubscription}
                      disabled={cancelMutation.isPending}
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      {cancelMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Canceling...
                        </>
                      ) : (
                        "Cancel Subscription"
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No active subscription</p>
                  <Button
                    onClick={() => setLocation("/#pricing")}
                    className="bg-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.45_0.12_230)] text-white"
                  >
                    View Pricing Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-[oklch(0.51_0.12_230)]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setLocation("/#mockup-generator")}
                className="w-full bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate New Mockup
              </Button>
              <Button
                onClick={() => window.open("https://www.calendly.com/kristinesocall", "_blank")}
                variant="outline"
                className="w-full border-[oklch(0.51_0.12_230)] text-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.51_0.12_230)] hover:text-white"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Billing History */}
        <Card className="mt-8 shadow-xl">
          <CardHeader>
            <CardTitle className="text-[oklch(0.51_0.12_230)]">Billing History</CardTitle>
            <CardDescription>Your recent invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            {billingLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.51_0.12_230)]" />
              </div>
            ) : billingHistory && billingHistory.length > 0 ? (
              <div className="space-y-4">
                {billingHistory.map((invoice: any) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-[oklch(0.96_0.02_215)] transition-colors"
                  >
                    <div>
                      <p className="font-semibold">
                        ${(invoice.amount / 100).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        className={
                          invoice.status === "paid"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }
                      >
                        {invoice.status}
                      </Badge>
                      {invoice.invoiceUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(invoice.invoiceUrl, "_blank")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No billing history available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Mockup Gallery */}
        <Card className="mt-8 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[oklch(0.51_0.12_230)]">
              <Sparkles className="h-6 w-6" />
              Your Generated Mockups
            </CardTitle>
            <CardDescription>AI-generated web app mockups from your ideas</CardDescription>
          </CardHeader>
          <CardContent>
            {mockupsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.51_0.12_230)]" />
              </div>
            ) : mockups && mockups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockups.map((mockup) => (
                  <Card key={mockup.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-[oklch(0.96_0.02_215)] relative">
                      {mockup.mockupImageUrl ? (
                        <img
                          src={mockup.mockupImageUrl}
                          alt="Generated mockup"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.51_0.12_230)]" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {mockup.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(mockup.createdAt).toLocaleDateString()}
                      </p>
                      {mockup.mockupImageUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(mockup.mockupImageUrl!, "_blank")}
                          className="w-full mt-3 border-[oklch(0.72_0.11_215)] text-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.72_0.11_215)] hover:text-white"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 text-[oklch(0.72_0.11_215)] mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No mockups generated yet</p>
                <Button
                  onClick={() => setLocation("/#mockup-generator")}
                  className="bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white"
                >
                  Create Your First Mockup
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
