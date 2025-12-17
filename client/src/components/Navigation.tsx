import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu, X, Calendar, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/SocallCGroup_Icon.jpeg" alt="Socall C Group Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-lg" />
            <div className="hidden sm:block">
              <p className="font-bold text-lg text-[oklch(0.51_0.12_230)]">Socall C Group</p>
              <p className="text-xs text-muted-foreground">Finance + Creative</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href.substring(1))}
                className="text-sm font-medium text-foreground hover:text-[oklch(0.51_0.12_230)] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA + Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.name || "Dashboard"}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => window.location.href = getLoginUrl()}>
                Login
              </Button>
            )}
            <Button
              size="sm"
              className="bg-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.45_0.12_230)] gap-2"
              onClick={() => window.open('https://www.calendly.com/kristinesocall', '_blank')}
            >
              <Calendar className="h-4 w-4" />
              Schedule Call
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-[oklch(0.51_0.12_230)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href.substring(1))}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-[oklch(0.51_0.12_230)] hover:bg-secondary rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="px-4 pt-4 border-t border-border space-y-3">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      {user?.name || "Dashboard"}
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => window.location.href = getLoginUrl()}>
                  Login
                </Button>
              )}
              <Button
                className="w-full bg-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.45_0.12_230)] gap-2"
                onClick={() => {
                  window.open('https://www.calendly.com/kristinesocall', '_blank');
                  setMobileMenuOpen(false);
                }}
              >
                <Calendar className="h-4 w-4" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
