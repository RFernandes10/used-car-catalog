/**
 * CarContext - Global state management for the car catalog
 * Manages car data, filters, and search functionality using Context API
 */

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Car, SearchFilters } from '@/types/car';
import { CARS } from '@/data/cars';

interface CarContextType {
  cars: Car[];
  filteredCars: Car[];
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  resetFilters: () => void;
  getCarById: (id: string) => Car | undefined;
  getUniqueMakes: () => string[];
  getModelsByMake: (make: string) => string[];
}

const CarContext = createContext<CarContextType | undefined>(undefined);

/**
 * CarProvider - Wraps the application to provide car context
 * Handles filtering logic and state management
 */
export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<SearchFilters>({});

  // Memoized filtered cars based on current filters
  const filteredCars = useMemo(() => {
    return CARS.filter((car) => {
      // Filter by make
      if (filters.make && car.make !== filters.make) {
        return false;
      }

      // Filter by model
      if (filters.model && car.model !== filters.model) {
        return false;
      }

      // Filter by year range
      if (filters.yearMin && car.year < filters.yearMin) {
        return false;
      }
      if (filters.yearMax && car.year > filters.yearMax) {
        return false;
      }

      // Filter by price range
      if (filters.priceMin && car.price < filters.priceMin) {
        return false;
      }
      if (filters.priceMax && car.price > filters.priceMax) {
        return false;
      }

      // Filter by body type
      if (filters.bodyType && car.bodyType !== filters.bodyType) {
        return false;
      }

      // Filter by fuel type
      if (filters.fuelType && car.fuelType !== filters.fuelType) {
        return false;
      }

      // Filter by search term (searches in make, model, and description)
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matchesSearch =
          car.make.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term) ||
          car.description.toLowerCase().includes(term);
        if (!matchesSearch) {
          return false;
        }
      }

      // Filter by VIN
      if (filters.vin) {
        if (!car.vin.toLowerCase().includes(filters.vin.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // Get unique car makes from the sample data
  const getUniqueMakes = (): string[] => {
    const makes = Array.from(new Set(CARS.map((car) => car.make)));
    return makes.sort();
  };

  // Get models for a specific make
  const getModelsByMake = (make: string): string[] => {
    const models = Array.from(
      new Set(CARS.filter((car) => car.make === make).map((car) => car.model))
    );
    return models.sort();
  };

  // Get a specific car by ID
  const getCarById = (id: string): Car | undefined => {
    return CARS.find((car) => car.id === id);
  };

  // Reset all filters
  const resetFilters = (): void => {
    setFilters({});
  };

  const value: CarContextType = {
    cars: CARS,
    filteredCars,
    filters,
    setFilters,
    resetFilters,
    getCarById,
    getUniqueMakes,
    getModelsByMake,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

/**
 * useCars - Hook to access car context
 * Must be used within a CarProvider
 */
export const useCars = (): CarContextType => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};
