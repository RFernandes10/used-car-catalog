/**
 * Header Component - Navigation and branding
 * Displays logo, title, and navigation links
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Car, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { href: '/', label: 'Catálogo' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/">
          <a className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Car className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold tracking-tight">Márcio Veículos</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Semi-Novos & Usados</p>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                <a
                  className={`text-base font-medium transition-colors py-2 ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;