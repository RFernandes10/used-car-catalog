import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WarningCircle, House } from "@phosphor-icons/react";
import { useLocation } from "wouter";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Página não encontrada");
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mx-4 border border-border/50 bg-card">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/10 rounded-full animate-ping opacity-75" />
              <WarningCircle className="relative h-16 w-16 text-destructive" weight="fill" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-2 tracking-tight">404</h1>
          <h2 className="text-xl font-semibold text-foreground mb-4">Página não encontrada</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <Button onClick={() => setLocation("/")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-lg transition-all">
            <House className="w-4 h-4 mr-2" weight="fill" /> Voltar ao Catálogo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
