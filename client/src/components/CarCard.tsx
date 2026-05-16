import { useState } from "react";
import { Link } from "wouter";
import { Car } from "@/types/car";
import { ChevronRight, Zap, Gauge, ImageOff } from "lucide-react";
import { getCarImage } from "@/lib/imageUtils";

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const src = getCarImage(car.id, car.imageUrl);

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);

  const formatMileage = (mileage: number): string =>
    new Intl.NumberFormat("pt-BR").format(mileage);

  const fuelLabel: Record<string, string> = {
    Gasoline: "Gasolina", Diesel: "Diesel", Electric: "Elétrico", Hybrid: "Híbrido",
  };

  const bodyLabel: Record<string, string> = {
    Sedan: "Sedã", SUV: "SUV", Truck: "Caminhonete", Coupe: "Cupê",
  };

  return (
    <Link href={`/car/${car.id}`} className="group block h-full">
      <div className="bg-card text-card-foreground rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 hover:-translate-y-0.5 h-full flex flex-col">
        <div className="relative overflow-hidden bg-muted aspect-[4/3]">
            {imgFailed ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <ImageOff className="w-10 h-10 text-muted-foreground/50" />
              </div>
            ) : (
              <img
                src={src}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            )}
            <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2.5 py-0.5 rounded-md text-xs font-medium">
              {car.condition === "Excellent" ? "Excelente" : car.condition === "Good" ? "Bom" : car.condition}
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="mb-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground">{car.year} {car.make}</h3>
              <p className="text-sm text-muted-foreground">{car.model}</p>
            </div>

            <div className="mb-3">
              <p className="text-xl font-bold text-primary">{formatPrice(car.price)}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Gauge className="w-3.5 h-3.5" />
                <span>{formatMileage(car.mileage)} km</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="w-3.5 h-3.5" />
                <span>{fuelLabel[car.fuelType] || car.fuelType}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 mt-auto pt-2 border-t border-border/50">
              <span>{car.color}</span>
              <span>{bodyLabel[car.bodyType] || car.bodyType}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary">Ver Detalhes</span>
              <ChevronRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
    </Link>
  );
};

export default CarCard;
