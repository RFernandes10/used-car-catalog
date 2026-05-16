import { Link } from "wouter";
import { CaretRight } from "@phosphor-icons/react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 overflow-x-auto">
      <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">
        Início
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
          <CaretRight className="w-3 h-3 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
