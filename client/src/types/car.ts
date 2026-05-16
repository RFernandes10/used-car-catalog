/**
 * Car data types for the used car catalog
 * Defines the structure for car listings and details
 */

export interface Car {
  id: string;
  make: string; // Brand (e.g., Toyota, Honda)
  model: string; // Model name
  year: number; // Year of manufacture
  price: number; // Price in USD
  mileage: number; // Mileage in miles
  color: string; // Exterior color
  imageUrl: string; // Main image URL (thumbnail)
  images: string[]; // Array of all car images
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  bodyType: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Hatchback' | 'Wagon';
  engineSize: string; // e.g., "2.5L"
  horsepower: number;
  description: string;
  features: string[]; // e.g., ['Sunroof', 'Leather Interior', 'Navigation']
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair';
  vin: string; // Vehicle Identification Number
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
}
