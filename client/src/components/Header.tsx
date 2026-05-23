/**
 * Header Component - Navigation and branding
 * Displays logo, title, and navigation links
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Car, List, X, Sun, Moon, Heart, ArrowsLeftRight } from '@phosphor-icons/react';
import { useTheme } from '@/contexts/ThemeContext';

export const Header: React.FC = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location === path;

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
            <Car className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold tracking-tight">Márcio Veículos</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">Semi-Novos & Usados</p>
          </div>
        </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/favoritos"
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                isActive("/favoritos") ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Heart weight={isActive("/favoritos") ? "fill" : "regular"} className="w-3.5 h-3.5" />
              Favoritos
            </Link>
            <Link
              href="/comparar"
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                isActive("/comparar") ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <ArrowsLeftRight className="w-3.5 h-3.5" />
              Comparar
            </Link>
          </nav>

        {/* Theme Toggle */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-foreground transition-all hover:rotate-12 hover:bg-muted/50 rounded-lg"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <span className="block transition-transform duration-300 ease-out">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </span>
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span className="block transition-transform duration-200" style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-border/50 bg-background overflow-hidden transition-all duration-200 ease-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium transition-colors px-3 py-2.5 rounded-lg ${
                isActive(link.href)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/favoritos"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-base font-medium transition-colors px-3 py-2.5 rounded-lg flex items-center gap-2 ${
              isActive("/favoritos") ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Heart weight={isActive("/favoritos") ? "fill" : "regular"} className="w-4 h-4" />
            Favoritos
          </Link>
          <Link
            href="/comparar"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-base font-medium transition-colors px-3 py-2.5 rounded-lg flex items-center gap-2 ${
              isActive("/comparar") ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <ArrowsLeftRight className="w-4 h-4" />
            Comparar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;