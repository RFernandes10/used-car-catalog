import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useCars } from "@/contexts/CarContext";
import { SearchFilters } from "@/types/car";
import { CarFilters } from "@/components/CarFilters";
import { CarList } from "@/components/CarList";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ArrowsDownUp } from "@phosphor-icons/react";

type SortOption = "default" | "price-asc" | "price-desc" | "year-desc" | "mileage-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Padrão" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "year-desc", label: "Ano: Mais Novo" },
  { value: "mileage-asc", label: "Menor Km" },
];

const SESSION_KEY = "catalog-state";

interface CatalogState {
  filters: SearchFilters;
  sortBy: SortOption;
  scrollY: number;
}

function loadState(): CatalogState | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state: Partial<CatalogState>) {
  try {
    const current = loadState() ?? {} as CatalogState;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...current, ...state }));
  } catch { /* noop */ }
}

export default function Catalog() {
  usePageTitle("Catálogo", "Confira nossa seleção de veículos semi-novos. Filtre por marca, modelo, preço e encontre o carro ideal no Rio de Janeiro.");
  const { filteredCars, setFilters, filters } = useCars();
  const [isLoading] = useState(false);

  const saved = useMemo(() => loadState(), []);
  const [sortBy, setSortBy] = useState<SortOption>(saved?.sortBy ?? "default");

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    saveState({ filters: newFilters });
  }, [setFilters]);

  useEffect(() => {
    if (saved?.scrollY) {
      requestAnimationFrame(() => window.scrollTo(0, saved.scrollY));
    }
  }, []);

  useEffect(() => {
    const handleSave = () => saveState({ scrollY: window.scrollY });
    window.addEventListener("beforeunload", handleSave);
    return () => {
      handleSave();
      window.removeEventListener("beforeunload", handleSave);
    };
  }, []);

  useEffect(() => {
    saveState({ sortBy });
  }, [sortBy]);

  useEffect(() => {
    if (saved?.filters) setFilters(saved.filters);
  }, []);

  const sortedCars = useMemo(() => {
    const cars = [...filteredCars];
    switch (sortBy) {
      case "price-asc": return cars.sort((a, b) => a.price - b.price);
      case "price-desc": return cars.sort((a, b) => b.price - a.price);
      case "year-desc": return cars.sort((a, b) => b.year - a.year);
      case "mileage-asc": return cars.sort((a, b) => a.mileage - b.mileage);
      default: return cars;
    }
  }, [filteredCars, sortBy]);

  return (
    <div className="min-h-screen bg-background">
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

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <CarFilters
                onFiltersChange={handleFiltersChange}
                currentFilters={filters}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredCars.length}</span>{" "}
                {filteredCars.length === 1 ? "carro encontrado" : "carros encontrados"}
              </p>

              <div className="flex items-center gap-2">
                <ArrowsDownUp className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-background text-foreground text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <CarList cars={sortedCars} isLoading={isLoading} />
          </div>
        </div>
      </div>

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
