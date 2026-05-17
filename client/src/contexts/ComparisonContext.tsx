import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ComparisonContextType {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARE = 3;

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const addToCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.length >= MAX_COMPARE ? prev : [...prev, id]);
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((f) => f !== id));
  }, []);

  const isInCompare = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  return (
    <ComparisonContext.Provider value={{ compareIds, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison(): ComparisonContextType {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error("useComparison must be used within a ComparisonProvider");
  return ctx;
}
