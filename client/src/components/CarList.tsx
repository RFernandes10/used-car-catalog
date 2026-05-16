import { useState, useEffect, useRef } from 'react';
import { Car } from '@/types/car';
import { CarCard } from './CarCard';
import { XCircle, SpinnerGap } from '@phosphor-icons/react';

const ITEMS_PER_PAGE = 6;

interface CarListProps {
  cars: Car[];
  isLoading?: boolean;
}

export const CarList: React.FC<CarListProps> = ({ cars, isLoading = false }) => {
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleCars = cars.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = visibleCars.length < cars.length;

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, cars.length]);

  useEffect(() => {
    setPage(1);
  }, [cars.length]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden border border-border/50">
            <div className="aspect-[4/3] skeleton-shimmer" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-2/3 skeleton-shimmer rounded" />
              <div className="h-3 w-1/2 skeleton-shimmer rounded" />
              <div className="h-6 w-1/3 skeleton-shimmer rounded" />
              <div className="flex gap-2">
                <div className="h-3 w-1/4 skeleton-shimmer rounded" />
                <div className="h-3 w-1/4 skeleton-shimmer rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 bg-card rounded-2xl">
        <div className="text-center max-w-md">
          <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum carro encontrado</h3>
          <p className="text-muted-foreground text-sm">Tente ajustar os filtros para encontrar o carro perfeito.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCars.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          <SpinnerGap className="w-6 h-6 text-muted-foreground animate-spin" />
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground py-4">
        Mostrando {visibleCars.length} de {cars.length} carros
      </div>
    </div>
  );
};

export default CarList;
