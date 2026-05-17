/**
 * CarFilters Component - Provides filtering and search functionality
 * Allows users to filter by make, model, year, price, body type, and fuel type
 */

import React, { useState, useEffect } from 'react';
import { SearchFilters } from '@/types/car';
import { useCars } from '@/contexts/CarContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, MagnifyingGlass, Funnel, Sliders } from '@phosphor-icons/react';

interface CarFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
}

export const CarFilters: React.FC<CarFiltersProps> = ({ onFiltersChange, currentFilters }) => {
  const { getUniqueMakes, getModelsByMake } = useCars();
  const [localFilters, setLocalFilters] = useState<SearchFilters>(currentFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync local filters with external changes
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  // Get unique makes and models
  const makes = getUniqueMakes();
  const models = localFilters.make ? getModelsByMake(localFilters.make) : [];

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: string | number | undefined) => {
    let cleanValue: string | number | undefined = value;
    if (typeof value === 'string') {
      cleanValue = (value === '' || value === 'all') ? undefined : value;
    } else if (typeof value === 'number') {
      cleanValue = value || undefined;
    }
    const newFilters = { ...localFilters, [key]: cleanValue };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Handle search term
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('searchTerm', e.target.value);
  };

  // Reset all filters
  const handleReset = () => {
    setLocalFilters({});
    onFiltersChange({});
    setShowAdvanced(false);
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(localFilters).some((v) => v !== undefined && v !== '');

  return (
    <div className="bg-card text-card-foreground rounded-xl p-4 sm:p-5 border border-border/50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Funnel className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filtros</h3>
      </div>

      {/* Search Bar */}
      <div className="mb-5">
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Buscar por marca, modelo..."
            value={localFilters.searchTerm || ''}
            onChange={handleSearch}
            className="pl-9 bg-background text-foreground placeholder:text-muted-foreground h-10"
          />
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Make */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Marca</label>
          <Select 
            value={localFilters.make || ''} 
            onValueChange={(value) => {
              const newValue = value || undefined;
              const newFilters = { ...localFilters, make: newValue, model: undefined };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            <SelectTrigger className="bg-background text-foreground h-9 text-sm">
              <SelectValue>{localFilters.make || 'Selecione...'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Modelo</label>
          <Select
            value={localFilters.model || ''}
            onValueChange={(value) => {
              const newValue = value || undefined;
              const newFilters = { ...localFilters, model: newValue };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
            disabled={!localFilters.make}
          >
            <SelectTrigger className="bg-background text-foreground h-9 text-sm disabled:opacity-50">
              <SelectValue>{localFilters.model || 'Selecione...'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Toggle Advanced Filters */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors mb-3 flex items-center gap-1"
      >
        <Sliders className="w-3.5 h-3.5" />
        {showAdvanced ? 'Ocultar filtros' : 'Mais filtros'}
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-3 pt-3 border-t border-border">
          {/* VIN Search */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Buscar por VIN</label>
            <Input
              type="text"
              placeholder="Ex: 4T1BF1AK5CU123456"
              value={localFilters.vin || ''}
              onChange={(e) => handleFilterChange('vin', e.target.value || undefined)}
              className="bg-background text-foreground h-8 text-sm"
            />
          </div>

          {/* Year Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Ano Min</label>
              <Input
                type="number"
                min="2000"
                max="2024"
                placeholder="2000"
                value={localFilters.yearMin || ''}
                onChange={(e) => handleFilterChange('yearMin', e.target.value ? parseInt(e.target.value) : undefined)}
                className="bg-background text-foreground h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Ano Max</label>
              <Input
                type="number"
                min="2000"
                max="2024"
                placeholder="2024"
                value={localFilters.yearMax || ''}
                onChange={(e) => handleFilterChange('yearMax', e.target.value ? parseInt(e.target.value) : undefined)}
                className="bg-background text-foreground h-8 text-sm"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Preço Min</label>
              <Input
                type="number"
                min="0"
                step="10000"
                placeholder="0"
                value={localFilters.priceMin || ''}
                onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                className="bg-background text-foreground h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Preço Max</label>
              <Input
                type="number"
                min="0"
                step="10000"
                placeholder="200000"
                value={localFilters.priceMax || ''}
                onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                className="bg-background text-foreground h-8 text-sm"
              />
            </div>
          </div>

          {/* Body Type */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Carroceria</label>
            <Select value={localFilters.bodyType || ''} onValueChange={(v) => handleFilterChange('bodyType', v === 'all' ? undefined : v || undefined)}>
              <SelectTrigger className="bg-background text-foreground h-8 text-sm">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="Sedan">Sedã</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Truck">Caminhonete</SelectItem>
                <SelectItem value="Coupe">Cupê</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Combustível</label>
            <Select value={localFilters.fuelType || ''} onValueChange={(v) => handleFilterChange('fuelType', v === 'all' ? undefined : v || undefined)}>
              <SelectTrigger className="bg-background text-foreground h-8 text-sm">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Gasoline">Gasolina</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Hybrid">Híbrido</SelectItem>
                <SelectItem value="Electric">Elétrico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filters Count */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {Object.values(localFilters).filter(v => v !== undefined && v !== '').length} filtro(s) ativo(s)
          </span>
          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            Limpar
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarFilters;
