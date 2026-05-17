import { Link } from "wouter";
import { useCars } from "@/contexts/CarContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ArrowsLeftRight, X, WhatsappLogo } from "@phosphor-icons/react";

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatMileage(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value) + " km";
}

const ROWS: { label: string; getValue: (car: import("@/types/car").Car) => string }[] = [
  { label: "Preço", getValue: (c) => formatPrice(c.price) },
  { label: "Ano", getValue: (c) => String(c.year) },
  { label: "Quilometragem", getValue: (c) => formatMileage(c.mileage) },
  { label: "Transmissão", getValue: (c) => c.transmission },
  { label: "Combustível", getValue: (c) => c.fuelType },
  { label: "Carroceria", getValue: (c) => c.bodyType },
  { label: "Motor", getValue: (c) => c.engineSize },
  { label: "Potência", getValue: (c) => `${c.horsepower} cv` },
  { label: "Cor", getValue: (c) => c.color },
  { label: "Condição", getValue: (c) => c.condition },
  { label: "VIN", getValue: (c) => c.vin },
];

export default function Comparison() {
  usePageTitle("Comparar", "Compare veículos lado a lado na Márcio Veículos.");
  const { cars } = useCars();
  const { compareIds, removeFromCompare, clearCompare } = useComparison();
  const compareCars = compareIds.map((id) => cars.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <ArrowsLeftRight className="w-6 h-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Comparar Veículos</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {compareCars.length === 0
              ? "Selecione até 3 veículos no catálogo para comparar lado a lado."
              : `Comparando ${compareCars.length} de até 3 veículos.`
            }
          </p>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        {compareCars.length === 0 ? (
          <div className="text-center py-20">
            <ArrowsLeftRight className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">Adicione veículos no catálogo para comparar.</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Ir para o Catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-semibold text-muted-foreground p-3 w-40" />
                    {compareCars.map((car) => (
                      <th key={car!.id} className="p-3 min-w-[200px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(car!.id)}
                            className="absolute -top-1 -right-1 p-0.5 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`Remover ${car!.make} ${car!.model}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={car!.imageUrl}
                            alt={`${car!.year} ${car!.make} ${car!.model}`}
                            width={200}
                            height={130}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <h3 className="font-semibold text-sm">{car!.make} {car!.model}</h3>
                          <p className="text-xs text-muted-foreground">{car!.year}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-border/50">
                      <td className="text-sm font-medium text-muted-foreground p-3">{row.label}</td>
                      {compareCars.map((car) => (
                        <td key={car!.id} className="text-sm text-foreground p-3">{row.getValue(car!)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Quer saber mais sobre esses veículos?</span>
                <a
                  href={`https://wa.me/5521972657221?text=${encodeURIComponent("Olá, gostaria de saber mais sobre os veículos que estou comparando.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <WhatsappLogo weight="fill" className="w-4 h-4" /> Falar com Vendedor
                </a>
              </div>
              <button
                onClick={clearCompare}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Limpar comparação
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
