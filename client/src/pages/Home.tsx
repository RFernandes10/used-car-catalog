import { Link } from "wouter";
import { useCars } from "@/contexts/CarContext";
import { CarCard } from "@/components/CarCard";
import { FinancingSimulator } from "@/components/FinancingSimulator";
import { TESTIMONIALS } from "@/data/testimonials";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Shield, TrendUp, Star, Heart, WhatsappLogo, ArrowRight, Quotes } from "@phosphor-icons/react";

const DIFFERENTIALS = [
  { icon: Shield, title: "Transparência", desc: "Você sabe exatamente o que está comprando. Documentação completa e histórico veicular." },
  { icon: TrendUp, title: "Qualidade Garantida", desc: "Cada veículo passa por inspeção rigorosa de 120 pontos antes de chegar até você." },
  { icon: Star, title: "Procedência", desc: "Todos os carros com débitos zero, documentação regularizada e garantia inclusa." },
  { icon: Heart, title: "Atendimento", desc: "Do financiamento à entrega, acompanhamento personalizado com sua equipe de vendas." },
];

export default function Home() {
  usePageTitle("Início", "Concessionária Márcio Veículos no Rio de Janeiro. Sedãs, SUVs e caminhonetes semi-novos com procedência garantida.");
  const { cars } = useCars();
  const featured = cars.filter((c) => c.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container py-20 md:py-32 relative">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-primary/20">
              <Star weight="fill" className="w-3 h-3" /> Concessionária Premium no Rio de Janeiro
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.05]">
              Seu Próximo Carro<br />
              <span className="text-primary">Está Aqui</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Sedãs, SUVs e caminhonetes semi-novos com procedência garantida.
              Cada veículo inspecionado e higienizado para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              >
                Ver Catálogo <ArrowRight className="w-5 h-5" weight="bold" />
              </Link>
              <a
                href="https://wa.me/5521972657221"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-green-600/20 active:scale-[0.98]"
              >
                <WhatsappLogo weight="fill" className="w-5 h-5" /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      {/* Featured Cars */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Carros em Destaque</h2>
              <p className="text-muted-foreground">Selecionados a dedo para você</p>
            </div>
            <Link
              href="/catalogo"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Ver Todos os Carros <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-16 md:py-20 bg-muted/30 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Por que escolher a Márcio Veículos?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Há mais de 10 anos transformando a experiência de comprar um seminovo no Rio de Janeiro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DIFFERENTIALS.map((item) => (
              <div key={item.title} className="group bg-card rounded-xl p-6 border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" weight="fill" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Veículos Vendidos" },
              { value: "10+", label: "Anos de Mercado" },
              { value: "50+", label: "Marcas" },
              { value: "98%", label: "Clientes Satisfeitos" },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl md:text-5xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-muted/30 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">O que nossos clientes dizem</h2>
            <p className="text-muted-foreground">A satisfação dos nossos clientes é o nosso melhor cartão de visitas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/20 transition-colors duration-300">
                <Quotes className="w-8 h-8 text-primary/30 mb-3" weight="fill" />
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} weight={i < t.rating ? "fill" : "regular"} className={`w-4 h-4 ${i < t.rating ? "text-yellow-500" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  {t.car && <p className="text-xs text-muted-foreground">{t.car}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Simulator */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Simule seu Financiamento</h2>
              <p className="text-muted-foreground">Descubra o valor das parcelas do seu carro seminovo</p>
            </div>
            <FinancingSimulator />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-accent/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pronto para encontrar seu carro?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            Fale agora com Roberto no WhatsApp e dê o primeiro passo rumo ao carro dos seus sonhos.
          </p>
          <a
            href="https://wa.me/5521972657221"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 py-4 font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-green-600/20 active:scale-[0.98] shadow-lg"
          >
            <WhatsappLogo weight="fill" className="w-6 h-6" />
            Falar com Roberto Agora
          </a>
        </div>
      </section>
    </div>
  );
}
