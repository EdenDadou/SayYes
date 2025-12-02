import type { BlocCommentaireClient } from "~/types/landing-page";

interface BlocCommentaireClientEditorProps {
  bloc: BlocCommentaireClient;
  onUpdate: (bloc: BlocCommentaireClient) => void;
}

export default function BlocCommentaireClientEditor({
  bloc,
  onUpdate,
}: BlocCommentaireClientEditorProps) {
  return (
    <div className="space-y-4">
      {/* Texte */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Commentaire
        </label>
        <textarea
          value={bloc.text}
          onChange={(e) => onUpdate({ ...bloc, text: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Le commentaire du client..."
        />
      </div>

      {/* Auteur */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Auteur
        </label>
        <input
          type="text"
          value={bloc.author}
          onChange={(e) => onUpdate({ ...bloc, author: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nom de l'auteur"
        />
      </div>
    </div>
  );
}
