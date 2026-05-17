import { Link } from "wouter";
import { useCars } from "@/contexts/CarContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { CarCard } from "@/components/CarCard";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Heart, ArrowRight } from "@phosphor-icons/react";

export default function Favorites() {
  usePageTitle("Favoritos", "Seus carros favoritos salvos na Márcio Veículos.");
  const { cars } = useCars();
  const { favorites } = useWishlist();
  const favCars = cars.filter((c) => favorites.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Heart weight="fill" className="w-6 h-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Meus Favoritos</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {favCars.length === 0
              ? "Você ainda não salvou nenhum carro nos favoritos."
              : `${favCars.length} ${favCars.length === 1 ? "carro salvo" : "carros salvos"} nos favoritos.`
            }
          </p>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        {favCars.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">Navegue pelo catálogo e salve seus carros favoritos.</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Ir para o Catálogo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
