import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/5521972657221";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full pl-4 pr-5 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
}
