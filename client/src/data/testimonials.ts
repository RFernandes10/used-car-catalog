export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  car?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos Oliveira",
    text: "Comprei meu SUV na Márcio Veículos e fui super bem atendido do início ao fim. O carro estava impecável, exatamente como descrito. Recomendo de olhos fechados!",
    rating: 5,
    car: "Jeep Compass 2022",
  },
  {
    name: "Ana Beatriz Santos",
    text: "Primeira vez comprando um seminovo e tive uma experiência excelente. O Roberto tirou todas as minhas dúvidas pelo WhatsApp e o financiamento foi super tranquilo.",
    rating: 5,
    car: "Honda Civic 2020",
  },
  {
    name: "Marcos Pereira",
    text: "Loja séria e transparente. Visitei várias concessionárias antes de encontrar a Márcio Veículos. A diferença no atendimento e na qualidade dos veículos é visível.",
    rating: 5,
    car: "Toyota Corolla 2021",
  },
];
