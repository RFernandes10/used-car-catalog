export type WhatsAppSource = "float" | "hero" | "catalog" | "detail" | "contact" | "contact-cta" | "simulator" | "card";

export function trackWhatsAppClick(source: WhatsAppSource, extra?: Record<string, string>) {
  const payload = {
    type: "whatsapp_click",
    source,
    timestamp: new Date().toISOString(),
    ...extra,
  };

  if (import.meta.env.DEV) {
    console.log("[Tracking]", payload);
  }

  try {
    localStorage.setItem(`wa_click_${Date.now()}`, JSON.stringify(payload));
  } catch {}
}

export function getWhatsAppUrl(source: WhatsAppSource, text?: string): string {
  const base = "https://wa.me/5521972657221";
  const params = new URLSearchParams();
  if (text) params.set("text", text);
  return params.toString() ? `${base}?${params}` : base;
}
