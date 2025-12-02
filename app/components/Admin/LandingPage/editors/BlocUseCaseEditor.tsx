import { useState, useEffect } from "react";
import type { BlocUseCase } from "~/types/landing-page";

interface BlocUseCaseEditorProps {
  bloc: BlocUseCase;
  onUpdate: (bloc: BlocUseCase) => void;
}

interface PortfolioOption {
  id: string;
  titre: string;
  slug: string;
}

export default function BlocUseCaseEditor({
  bloc,
  onUpdate,
}: BlocUseCaseEditorProps) {
  const [portfolios, setPortfolios] = useState<PortfolioOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les portfolios disponibles
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch("/api/portfolios");
        if (response.ok) {
          const data = await response.json();
          setPortfolios(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des portfolios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const togglePortfolio = (portfolioId: string) => {
    const isSelected = bloc.portfolioIds.includes(portfolioId);
    if (isSelected) {
      onUpdate({
        ...bloc,
        portfolioIds: bloc.portfolioIds.filter((id) => id !== portfolioId),
      });
    } else {
      onUpdate({
        ...bloc,
        portfolioIds: [...bloc.portfolioIds, portfolioId],
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Titre */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Titre
        </label>
        <input
          type="text"
          value={bloc.title}
          onChange={(e) => onUpdate({ ...bloc, title: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Sélection des portfolios */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Portfolios sélectionnés ({bloc.portfolioIds.length})
        </label>

        {loading ? (
          <p className="text-white/70 text-sm">Chargement des portfolios...</p>
        ) : portfolios.length === 0 ? (
          <p className="text-white/70 text-sm">
            Aucun portfolio disponible. Créez d'abord des portfolios.
          </p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {portfolios.map((portfolio) => (
              <label
                key={portfolio.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  bloc.portfolioIds.includes(portfolio.id)
                    ? "bg-blue-600/30 border border-blue-500"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={bloc.portfolioIds.includes(portfolio.id)}
                  onChange={() => togglePortfolio(portfolio.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="text-white">{portfolio.titre}</span>
                  <span className="text-white/60 text-sm ml-2">
                    /{portfolio.slug}
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Afficher les IDs sélectionnés (pour debug) */}
        {bloc.portfolioIds.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {bloc.portfolioIds.map((id) => {
              const portfolio = portfolios.find((p) => p.id === id);
              return (
                <span
                  key={id}
                  className="px-2 py-1 bg-blue-600/30 text-blue-300 text-xs rounded flex items-center gap-1"
                >
                  {portfolio?.titre || id}
                  <button
                    type="button"
                    onClick={() => togglePortfolio(id)}
                    className="hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
