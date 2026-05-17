/**
 * Car data types for the used car catalog
 * Defines the structure for car listings and details
 */

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  imageUrl: string;
  images: string[];
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  bodyType: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Hatchback' | 'Wagon';
  engineSize: string;
  horsepower: number;
  description: string;
  features: string[];
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair';
  vin: string;
  featured?: boolean;
}

export interface FilterOptions {
  make: string[];
  model: string[];
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  bodyType: string[];
  fuelType: string[];
}

export interface SearchFilters {
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  bodyType?: string;
  fuelType?: string;
  searchTerm?: string;
  vin?: string;
}
