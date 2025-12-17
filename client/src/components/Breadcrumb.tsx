import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Breadcrumb() {
  const [location] = useLocation();
  
  // Parse pathname into breadcrumb segments
  const pathSegments = location.split("/").filter(Boolean);
  
  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) {
    return null;
  }
  
  // Convert path segment to readable title
  const formatTitle = (segment: string) => {
    return segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  return (
    <nav aria-label="Breadcrumb" className="bg-[oklch(0.96_0.02_215)] border-b border-[oklch(0.72_0.11_215)]/20">
      <div className="container py-3">
        <ol className="flex items-center gap-2 text-sm">
          {/* Home link */}
          <li>
            <Link href="/" className="flex items-center gap-1 text-[oklch(0.51_0.12_230)] hover:text-[oklch(0.72_0.11_215)] transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </li>
          
          {/* Path segments */}
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            
            return (
              <li key={segment} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {formatTitle(segment)}
                  </span>
                ) : (
                  <Link 
                    href={href}
                    className="text-[oklch(0.51_0.12_230)] hover:text-[oklch(0.72_0.11_215)] transition-colors"
                  >
                    {formatTitle(segment)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
