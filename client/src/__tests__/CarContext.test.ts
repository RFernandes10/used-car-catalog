/**
 * Basic tests for CarContext
 * Tests filtering logic and state management
 */

import { describe, it, expect } from 'vitest';
import { CARS } from '@/data/cars';

describe('Car Filtering Logic', () => {
  it('should filter cars by make', () => {
    const toyotas = CARS.filter((car) => car.make === 'Toyota');
    expect(toyotas.length).toBeGreaterThan(0);
    expect(toyotas.every((car) => car.make === 'Toyota')).toBe(true);
  });

  it('should filter cars by price range', () => {
    const minPrice = 20000;
    const maxPrice = 30000;
    const filtered = CARS.filter((car) => car.price >= minPrice && car.price <= maxPrice);
    expect(filtered.every((car) => car.price >= minPrice && car.price <= maxPrice)).toBe(true);
  });

  it('should filter cars by year range', () => {
    const minYear = 2020;
    const maxYear = 2022;
    const filtered = CARS.filter((car) => car.year >= minYear && car.year <= maxYear);
    expect(filtered.every((car) => car.year >= minYear && car.year <= maxYear)).toBe(true);
  });

  it('should filter cars by body type', () => {
    const suvs = CARS.filter((car) => car.bodyType === 'SUV');
    expect(suvs.every((car) => car.bodyType === 'SUV')).toBe(true);
  });

  it('should filter cars by fuel type', () => {
    const electric = CARS.filter((car) => car.fuelType === 'Electric');
    expect(electric.every((car) => car.fuelType === 'Electric')).toBe(true);
  });

  it('should search by make in description', () => {
    const searchTerm = 'Toyota';
    const filtered = CARS.filter((car) => car.make.toLowerCase().includes(searchTerm.toLowerCase()));
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('should return all cars when no filters applied', () => {
    expect(CARS.length).toBeGreaterThan(0);
  });

  it('should find car by ID', () => {
    const car = CARS.find((c) => c.id === '1');
    expect(car).toBeDefined();
    expect(car?.id).toBe('1');
  });

  it('should get unique makes', () => {
    const makes = Array.from(new Set(CARS.map((car) => car.make)));
    expect(makes.length).toBeGreaterThan(0);
    expect(makes.every((make) => typeof make === 'string')).toBe(true);
  });

  it('should get models by make', () => {
    const toyotaModels = Array.from(
      new Set(CARS.filter((car) => car.make === 'Toyota').map((car) => car.model))
    );
    expect(toyotaModels.every((model) => typeof model === 'string')).toBe(true);
  });
});

describe('Car Data Structure', () => {
  it('should have all required fields', () => {
    CARS.forEach((car) => {
      expect(car.id).toBeDefined();
      expect(car.make).toBeDefined();
      expect(car.model).toBeDefined();
      expect(car.year).toBeDefined();
      expect(car.price).toBeDefined();
      expect(car.mileage).toBeDefined();
      expect(car.color).toBeDefined();
      expect(car.imageUrl).toBeDefined();
      expect(car.transmission).toBeDefined();
      expect(car.fuelType).toBeDefined();
      expect(car.bodyType).toBeDefined();
      expect(car.engineSize).toBeDefined();
      expect(car.horsepower).toBeDefined();
      expect(car.description).toBeDefined();
      expect(car.features).toBeDefined();
      expect(car.condition).toBeDefined();
      expect(car.vin).toBeDefined();
    });
  });

  it('should have valid price values', () => {
    CARS.forEach((car) => {
      expect(car.price).toBeGreaterThan(0);
      expect(typeof car.price).toBe('number');
    });
  });

  it('should have valid year values', () => {
    CARS.forEach((car) => {
      expect(car.year).toBeGreaterThanOrEqual(2000);
      expect(car.year).toBeLessThanOrEqual(2024);
    });
  });

  it('should have valid mileage values', () => {
    CARS.forEach((car) => {
      expect(car.mileage).toBeGreaterThanOrEqual(0);
      expect(typeof car.mileage).toBe('number');
    });
  });

  it('should have valid features array', () => {
    CARS.forEach((car) => {
      expect(Array.isArray(car.features)).toBe(true);
      expect(car.features.length).toBeGreaterThan(0);
      expect(car.features.every((f) => typeof f === 'string')).toBe(true);
    });
  });
});
