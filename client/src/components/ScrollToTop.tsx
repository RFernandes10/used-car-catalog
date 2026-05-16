import { useState, useEffect } from "react";
import { ArrowUp } from "@phosphor-icons/react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-6 z-50 flex items-center justify-center w-11 h-11 bg-card border border-border/50 text-foreground rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5" weight="bold" />
    </button>
  );
}
