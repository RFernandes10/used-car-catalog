import { useState } from "react";
import { Calculator, WhatsappLogo } from "@phosphor-icons/react";

interface FinancingSimulatorProps {
  precoSugerido?: number;
}

function calcularParcela(valorFinanciado: number, taxaMensal: number, parcelas: number): number {
  if (taxaMensal === 0) return valorFinanciado / parcelas;
  const r = taxaMensal / 100;
  const fator = Math.pow(1 + r, parcelas);
  return valorFinanciado * (r * fator) / (fator - 1);
}

export function FinancingSimulator({ precoSugerido }: FinancingSimulatorProps) {
  const [preco, setPreco] = useState(precoSugerido ?? 50000);
  const [entrada, setEntrada] = useState(20);
  const [parcelas, setParcelas] = useState(48);
  const [taxa, setTaxa] = useState(1.5);
  const [calculado, setCalculado] = useState(false);

  const valorEntrada = preco * (entrada / 100);
  const valorFinanciado = preco - valorEntrada;
  const valorParcela = calcularParcela(valorFinanciado, taxa, parcelas);
  const totalPago = valorParcela * parcelas;
  const totalJuros = totalPago - valorFinanciado;

  const handleCalcular = () => {
    if (preco > 0 && parcelas > 0) setCalculado(true);
  };

  return (
    <div className="bg-card rounded-xl p-6 sm:p-8 border border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2.5 rounded-lg">
          <Calculator className="w-5 h-5 text-primary" weight="fill" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Simular Financiamento</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Valor do Veículo (R$)</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => { setPreco(Number(e.target.value)); setCalculado(false); }}
            className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Entrada (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={entrada}
            onChange={(e) => { setEntrada(Number(e.target.value)); setCalculado(false); }}
            className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Parcelas</label>
          <select
            value={parcelas}
            onChange={(e) => { setParcelas(Number(e.target.value)); setCalculado(false); }}
            className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {[12, 24, 36, 48, 60, 72].map((n) => (
              <option key={n} value={n}>{n}x</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Taxa de Juros (% a.m.)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={taxa}
            onChange={(e) => { setTaxa(Number(e.target.value)); setCalculado(false); }}
            className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <button
        onClick={handleCalcular}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-2.5 font-medium text-sm transition-colors flex items-center justify-center gap-2"
      >
        <Calculator className="w-4 h-4" /> Calcular Parcelas
      </button>

      {calculado && (
        <div className="mt-6 pt-6 border-t border-border animate-fade-in-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Valor da Parcela</p>
              <p className="text-xl font-bold text-primary">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorParcela)}
              </p>
              <p className="text-xs text-muted-foreground">{parcelas}x</p>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Entrada</p>
              <p className="text-lg font-semibold text-foreground">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorEntrada)}
              </p>
              <p className="text-xs text-muted-foreground">{entrada}%</p>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Financiado</p>
              <p className="text-lg font-semibold text-foreground">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorFinanciado)}
              </p>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Total de Juros</p>
              <p className="text-lg font-semibold text-foreground">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalJuros)}
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            *Simulação meramente ilustrativa. As taxas podem variar conforme aprovação de crédito.
          </p>

          <div className="mt-4 text-center">
            <a
              href="https://wa.me/5521972657221?text=Olá, gostaria de simular um financiamento de um veículo."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2.5 font-medium text-sm transition-colors"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4" /> Falar sobre Financiamento
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
