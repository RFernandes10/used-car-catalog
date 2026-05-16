/**
 * Footer Component - Company information and links
 */

import React from 'react';
import { Link } from 'wouter';
import { Phone, Envelope, MapPin, List, Info, WhatsappLogo } from '@phosphor-icons/react';

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
              Cada veículo do nosso estoque passa por uma inspeção rigorosa e por um processo completo de higienização, garantindo a máxima confiabilidade, segurança e o valor que você merece.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-sm mb-3">Links Rápidos</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <List className="w-4 h-4" /> Catálogo
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Info className="w-4 h-4" /> Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <WhatsappLogo weight="fill" className="w-4 h-4" /> Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-sm mb-3">Contato</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">(21) 97265-7221</span>
              </div>
              <div className="flex items-center gap-2">
                <Envelope className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">robertofernandes144@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Rio de Janeiro, Realengo - RJ</span>
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
