/**
 * About Page - Company information
 */

import React from 'react';
import { Shield, CheckCircle, Award, Users, TrendingUp, Star, Heart, Wrench } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Quem Somos
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Márcio Veículos é uma concessionária de veículos semi-novos localizada no Rio de Janeiro. 
              Somos especializados em oferecer veículos de qualidade com procedência garantida e todos os documentos em ordem.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Nossos Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Transparência</h3>
              <p className="text-sm text-muted-foreground">
                Transparência total. Você sabe exatamente o que está comprando.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Qualidade</h3>
              <p className="text-sm text-muted-foreground">
                Cada veículo passa por inspeção rigorosa.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <Star className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Experiência</h3>
              <p className="text-sm text-muted-foreground">
                Anos de experiência no mercado.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <Heart className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Atendimento</h3>
              <p className="text-sm text-muted-foreground">
                Personalizado do início ao fim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-2">Veículos Vendidos</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground mt-2">Anos de Mercado</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground mt-2">Marcas</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground mt-2">Clientes Satisfeitos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Nossa Equipe
          </h2>
          
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-6 border border-border/50 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Equipe de Vendas</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Especialistas em ajudar você
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Mecânicos</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Técnicos certificados
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">SAC</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Humanizado e especializado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Precisando de ajuda?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Nossa equipe está pronta para tirar suas dúvidas e ajudá-lo a encontrar o carro dos seus sonhos.
          </p>
          <a 
            href="/contato"
            className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </section>
    </div>
  );
}