import { DeleteIcon } from "~/components/icons";

interface LivrablesSectionProps {
  livrables: string[];
  currentLivrable: string;
  setCurrentLivrable: (value: string) => void;
  addLivrable: () => void;
  removeLivrable: (index: number) => void;
}

export default function LivrablesSection({
  livrables,
  currentLivrable,
  setCurrentLivrable,
  addLivrable,
  removeLivrable,
}: LivrablesSectionProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
      <h2
        className="text-2xl font-bold text-white mb-6"
        style={{ fontFamily: "Jakarta Bold" }}
      >
        Livrables
      </h2>

      <div className="space-y-4">
        {/* Ajouter un livrable */}
        <div className="flex gap-3">
          <input
            type="text"
            value={currentLivrable}
            onChange={(e) => setCurrentLivrable(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            style={{ fontFamily: "Jakarta" }}
            placeholder="Nom du livrable"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addLivrable())
            }
          />
          <button
            type="button"
            onClick={addLivrable}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            style={{ fontFamily: "Jakarta Semi Bold" }}
          >
            Ajouter
          </button>
        </div>

        {/* Liste des livrables */}
        {livrables.length > 0 && (
          <div className="space-y-3">
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Livrables ajoutés :
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {livrables.map((livrable, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-800/30 p-3 rounded-lg"
                >
                  <span
                    className="text-white truncate mr-2"
                    style={{ fontFamily: "Jakarta" }}
                    title={livrable}
                  >
                    {livrable}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLivrable(index)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200 flex-shrink-0"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>
            {/* Inputs cachés pour les livrables */}
            {livrables.map((livrable, index) => (
              <input
                key={index}
                type="hidden"
                name="livrable"
                value={livrable}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
