import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  tagline: string;
  monthlyPrice: number;
  transactionRange: string;
  transactionMin: number;
  transactionMax: number;
  features: string[];
  recommended?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  coreServices: string[];
}

export default function PricingCard({ tier, coreServices }: PricingCardProps) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const createCheckoutMutation = trpc.stripe.createCheckoutSession.useMutation();

  const handleGetStarted = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to subscribe to a tier");
      window.location.href = getLoginUrl();
      return;
    }

    setIsLoading(true);
    try {
      const result = await createCheckoutMutation.mutateAsync({
        tierId: tier.id,
      });

      if (result.url) {
        toast.success("Redirecting to checkout...");
        window.open(result.url, '_blank');
      }
    } catch (error) {
      toast.error("Failed to create checkout session");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  return (
    <Card
      className={`relative flex flex-col h-full transition-all duration-300 hover:shadow-xl ${
        tier.recommended
          ? 'border-2 border-[oklch(0.51_0.12_230)] shadow-lg scale-105'
          : 'border border-border hover:border-[oklch(0.72_0.11_215)]'
      }`}
    >
      {tier.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-[oklch(0.72_0.11_215)] text-white px-4 py-1 text-sm font-semibold">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-[oklch(0.51_0.12_230)]">
            {tier.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {tier.description}
          </CardDescription>
        </div>

        <div className="pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-foreground">
              {formatPrice(tier.monthlyPrice)}
            </span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <div className="mt-2 text-sm font-medium text-[oklch(0.51_0.12_230)]">
            {tier.transactionRange} transactions
          </div>
        </div>

        <div className="pt-3">
          <p className="text-sm italic text-muted-foreground">
            "{tier.tagline}"
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-3">
          {tier.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[oklch(0.68_0.15_160)] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {tier.id === 'startups' && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              All tiers include:
            </p>
            <div className="space-y-2">
              {coreServices.slice(0, 3).map((service, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[oklch(0.72_0.11_215)] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          className={`w-full font-semibold text-base py-6 ${
            tier.recommended
              ? 'bg-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.45_0.12_230)] text-white'
              : 'bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white'
          }`}
          onClick={handleGetStarted}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Get Started'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
