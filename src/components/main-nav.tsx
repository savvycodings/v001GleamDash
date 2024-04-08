import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/Dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/Pool"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Pool
      </Link>
      <Link
        href="/Events"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Events
      </Link>
      <Link
        href="/Contact"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Contact Us
      </Link>
    </nav>
  );
}