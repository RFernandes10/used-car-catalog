import { Phone, Mail, MapPin, Clock, MessageCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = "5521972657221";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const SELLER_NAME = "Roberto";

const PRE_FILLED_MESSAGES = [
  { label: "Quero financiar", msg: "Olá, tenho interesse em financiar um veículo. Poderia me ajudar?" },
  { label: "Tabela FIPE", msg: "Olá, gostaria de saber o valor na Tabela FIPE do carro..." },
  { label: "Agendar visita", msg: "Olá, gostaria de agendar uma visita para ver os veículos." },
  { label: "Trocar meu carro", msg: "Olá, tenho interesse em trocar meu carro em um da loja." },
];

function waLink(msg: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`;
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Fale Conosco</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estamos prontos para ajudá-lo a encontrar o carro perfeito.
              Fale diretamente com {SELLER_NAME} pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Informações de Contato</h2>

              <div className="space-y-6">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-4 group">
                  <div className="bg-green-600/15 p-3 rounded-lg group-hover:bg-green-600/25 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">WhatsApp</h3>
                    <p className="text-muted-foreground group-hover:text-green-400 transition-colors">
                      (21) 97265-7221
                    </p>
                    <p className="text-sm text-green-500">Clique para falar agora</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Endereço</h3>
                    <p className="text-muted-foreground">Rio de Janeiro, RJ - Brasil</p>
                  </div>
                </div>

                <a href={`tel:+55${WHATSAPP_NUMBER}`} className="flex items-start gap-4 group">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefone</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      (21) 97265-7221
                    </p>
                  </div>
                </a>

                <a href="mailto:robertofernandes144@gmail.com" className="flex items-start gap-4 group">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">E-mail</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      robertofernandes144@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">Segunda a Sexta: 8h às 16h</p>
                    <p className="text-sm text-muted-foreground">Sábado: 10h às 14h</p>
                  </div>
                </div>
              </div>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-4 font-semibold text-lg transition-all hover:scale-[1.02]">
                <MessageCircle className="w-7 h-7" />
                Falar com {SELLER_NAME} no WhatsApp
              </a>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-600/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Atendimento via WhatsApp</h2>
                <p className="text-muted-foreground">
                  Clique em uma das opções abaixo para iniciar uma conversa:
                </p>
              </div>

              <div className="space-y-3">
                {PRE_FILLED_MESSAGES.map((item) => (
                  <a
                    key={item.label}
                    href={waLink(item.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full text-left bg-background hover:bg-green-600/10 border border-border/50 hover:border-green-500/30 rounded-xl px-5 py-4 transition-all group"
                  >
                    <MessageCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground font-medium group-hover:text-green-400 transition-colors">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-3">Ou envie uma mensagem personalizada:</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar Agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
