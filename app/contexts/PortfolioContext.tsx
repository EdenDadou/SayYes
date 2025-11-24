import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";

interface PortfolioContextType {
  portfolio: PortfolioData | null;
  allPortfolios: PortfolioData[];
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPortfolios = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/portfolios");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement des portfolios");
      }

      setAllPortfolios(data.portfolios);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur fetch portfolios:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPortfolioBySlug = useCallback(async (slug: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolios/slug/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement du portfolio");
      }

      setPortfolio(data.portfolio);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur fetch portfolio:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        allPortfolios,
        isLoading,
        error,
        fetchAllPortfolios,
        fetchPortfolioBySlug,
      }}
    >
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
