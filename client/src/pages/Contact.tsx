/**
 * Contact Page - Contact form and information
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, User, Mailbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Fale Conosco
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estamos prontos para ajudá-lo a encontrar o carro perfeito. 
              Entre em contato pelos canais abaixo ou preencha o formulário.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rio de Janeiro, RJ - Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefone</h3>
                    <p className="text-muted-foreground">
                      (21) 97265-7221
                    </p>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp disponível
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">E-mail</h3>
                    <p className="text-muted-foreground">
                      robertofernandes144@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 8h às 16h
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sábado: 10h às 14h
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-muted rounded-xl p-8 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Mapa da localização
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Rio de Janeiro, RJ
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Obrigado pelo contato. Retornaremos em breve.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Enviar Nova Mensagem
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Envie uma Mensagem
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome completo"
                          required
                          className="bg-background pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mailbox className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          required
                          className="bg-background pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                        Telefone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(21) 99999-9999"
                          required
                          className="bg-background pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                        Mensagem
                      </label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Como podemos ajudar?"
                          rows={5}
                          required
                          className="bg-background pl-10 resize-none"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}