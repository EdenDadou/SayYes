import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";

interface PortfolioContextType {
  portfolio: PortfolioData | null;
  allPortfolios: PortfolioData[];
  filteredPortfolios: PortfolioData[];
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  isLoading: boolean;
  error: string | null;
  fetchAllPortfolios: () => Promise<void>;
  fetchPortfolioBySlug: (slug: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [allPortfolios, setAllPortfolios] = useState<PortfolioData[]>([]);
  const [portfolioCache, setPortfolioCache] = useState<
    Map<string, PortfolioData>
  >(new Map());
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredPortfolios = useMemo(() => {
    if (activeFilters.length === 0) {
      return allPortfolios;
    }
    return allPortfolios.filter((portfolio) =>
      portfolio.categories?.some((cat) => activeFilters.includes(cat))
    );
  }, [allPortfolios, activeFilters]);

  const fetchAllPortfolios = useCallback(async () => {
    if (allPortfolios.length > 0) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/portfolios");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors du chargement des portfolios"
        );
      }

      setAllPortfolios(data.portfolios);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur fetch portfolios:", err);
    } finally {
      setIsLoading(false);
    }
  }, [allPortfolios.length]);

  const fetchPortfolioBySlug = useCallback(
    async (slug: string) => {
      // Utiliser le cache si disponible pour un affichage instantané
      const cached = portfolioCache.get(slug);
      if (cached) {
        setPortfolio(cached);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/portfolios/slug/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Erreur lors du chargement du portfolio"
          );
        }

        setPortfolioCache((prev) => new Map(prev).set(slug, data.portfolio));
        setPortfolio(data.portfolio);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        console.error("Erreur fetch portfolio:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [portfolioCache]
  );

  const value = useMemo(
    () => ({
      portfolio,
      allPortfolios,
      filteredPortfolios,
      activeFilters,
      setActiveFilters,
      isLoading,
      error,
      fetchAllPortfolios,
      fetchPortfolioBySlug,
    }),
    [
      portfolio,
      allPortfolios,
      filteredPortfolios,
      activeFilters,
      isLoading,
      error,
      fetchAllPortfolios,
      fetchPortfolioBySlug,
      portfolioCache,
    ]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
