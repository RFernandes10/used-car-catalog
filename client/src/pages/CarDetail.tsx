import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useCars } from "@/contexts/CarContext";
import { Button } from "@/components/ui/button";
import { ImageGalleryModal } from "@/components/ImageGalleryModal";
import { getCarImage, getCarGallery } from "@/lib/imageUtils";
import {
  ArrowLeft,
  Check,
  Gauge,
  Cog,
  Fuel,
  ZoomIn,
  Palette,
  Calendar,
  Settings,
  Hash,
  Car,
  ImageOff,
} from "lucide-react";

const condLabel: Record<string, string> = {
  Excellent: "Excelente", "Very Good": "Muito Bom", Good: "Bom", Fair: "Regular",
};

const fuelLabel: Record<string, string> = {
  Gasoline: "Gasolina", Diesel: "Diesel", Electric: "Elétrico", Hybrid: "Híbrido",
};

const transLabel: Record<string, string> = {
  Automatic: "Automática", Manual: "Manual", CVT: "CVT",
};

const bodyLabel: Record<string, string> = {
  Sedan: "Sedã", SUV: "SUV", Truck: "Caminhonete", Coupe: "Cupê",
};

export default function CarDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { getCarById } = useCars();
  const car = getCarById(params.id || "");
  const [mainFailed, setMainFailed] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Carro não encontrado</h1>
          <p className="text-muted-foreground mb-6">O carro que você procura não existe.</p>
          <Button onClick={() => setLocation("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Catálogo
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(p);

  const formatMileage = (m: number) =>
    new Intl.NumberFormat("pt-BR").format(m);

  const mainSrc = getCarImage(car.id, car.imageUrl);
  const galleryImages = getCarGallery(car.id, car.images);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <Button onClick={() => setLocation("/")} variant="ghost" className="text-accent hover:text-primary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Catálogo
          </Button>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
              {mainFailed ? (
                <div className="w-full h-96 md:h-[500px] flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <ImageOff className="w-16 h-16 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Imagem não disponível</p>
                  </div>
                </div>
              ) : (
                <img
                  src={mainSrc}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-96 md:h-[500px] object-cover group-hover:brightness-75 transition-all duration-300"
                  onError={() => setMainFailed(true)}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 text-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                  <ZoomIn className="w-5 h-5" /> Clique para ver a galeria
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-lg h-fit sticky top-24">
            <div className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium mb-4">
              {condLabel[car.condition] || car.condition}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{car.year} {car.make}</h1>
            <p className="text-lg text-muted-foreground mb-6">{car.model}</p>
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-1">Preço</p>
              <p className="text-4xl font-bold text-primary">{formatPrice(car.price)}</p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-primary flex-shrink-0" />
                <div><p className="text-xs text-muted-foreground">Quilometragem</p><p className="font-semibold text-foreground">{formatMileage(car.mileage)} km</p></div>
              </div>
              <div className="flex items-center gap-3">
                <Fuel className="w-5 h-5 text-primary flex-shrink-0" />
                <div><p className="text-xs text-muted-foreground">Combustível</p><p className="font-semibold text-foreground">{fuelLabel[car.fuelType] || car.fuelType}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <Cog className="w-5 h-5 text-primary flex-shrink-0" />
                <div><p className="text-xs text-muted-foreground">Transmissão</p><p className="font-semibold text-foreground">{transLabel[car.transmission] || car.transmission}</p></div>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold">
              Falar com Vendedor
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-foreground mb-6">Especificações</h2>
            <div className="space-y-4">
              <SpecRow icon={<Car className="w-5 h-5 text-muted-foreground flex-shrink-0" />} label="Tipo de Carroceria" value={bodyLabel[car.bodyType] || car.bodyType} />
              <SpecRow icon={<Settings className="w-5 h-5 text-muted-foreground flex-shrink-0" />} label="Motor" value={car.engineSize} />
              <SpecRow icon={<Gauge className="w-5 h-5 text-muted-foreground flex-shrink-0" />} label="Potência" value={`${car.horsepower} cv`} />
              <SpecRow icon={<Palette className="w-5 h-5 text-muted-foreground flex-shrink-0" />} label="Cor" value={car.color} />
              <SpecRow icon={<Hash className="w-5 h-5 text-muted-foreground flex-shrink-0" />} label="Chassi" value={car.vin} mono />
              <SpecRow icon={<Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />} label="Ano" value={String(car.year)} />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-foreground mb-6">Características</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {car.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-card rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">Descrição</h2>
          <p className="text-foreground leading-relaxed text-lg">{car.description}</p>
        </div>
      </div>

      <ImageGalleryModal
        isOpen={isGalleryOpen}
        images={galleryImages}
        carTitle={`${car.year} ${car.make} ${car.model}`}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}

function SpecRow({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-border">
      {icon}
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold text-foreground ml-auto ${mono ? "font-mono text-sm" : ""}`}>{value}</span>
    </div>
  );
}
