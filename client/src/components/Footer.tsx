/**
 * Footer Component - Company information and links
 */

import React from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Menu, Info, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 text-foreground border-t border-border/50 mt-16">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-base mb-3">Márcio Veículos</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sua fonte confiável para veículos seminovos de qualidade. Inspecionamos cada carro para garantir confiabilidade e valor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-sm mb-3">Links Rápidos</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Menu className="w-4 h-4" />
                  Ver Estoque
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Info className="w-4 h-4" />
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Fale Conosco
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Info className="w-4 h-4" />
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-sm mb-3">Contato</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">(21) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">vendas@marcioveiculos.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Rio de Janeiro, RJ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} Márcio Veículos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
