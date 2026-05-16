/**
 * Catalog Page - Main page showing car listings with filters
 * Displays hero section, filters, and car grid
 */

import React, { useState } from "react";
import { useCars } from "@/contexts/CarContext";
import { SearchFilters } from "@/types/car";
import { CarFilters } from "@/components/CarFilters";
import { CarList } from "@/components/CarList";

export default function Catalog() {
  const { filteredCars, setFilters, filters } = useCars();
  const [isLoading] = useState(false);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Encontre o Carro Perfeito
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Navegue por nossa seleção cuidadosamente curada de veículos
              seminovos. Cada carro é inspecionado e verificado para qualidade e
              confiabilidade.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <CarFilters
                onFiltersChange={handleFiltersChange}
                currentFilters={filters}
              />
            </div>
          </div>

          {/* Car List */}
          <div className="lg:col-span-3">
            <CarList cars={filteredCars} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <section className="bg-card border-t border-border py-12 md:py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Entre em contato com nossa equipe de vendas para saber sobre estoque
            futuro ou solicitar um veículo específico.
          </p>
          <a
            href="/contato"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </section>
    </div>
  );
}
