import type { BlocCommentaireClient } from "~/types/landing-page";
import { ADMIN_INPUT_CLASS } from "~/utils/admin/landing-page-constants";

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
          className={ADMIN_INPUT_CLASS}
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
          className={ADMIN_INPUT_CLASS}
          placeholder="Nom de l'auteur"
        />
      </div>
    </div>
  );
}
