import type { BlocTestimonial } from "~/types/landing-page";
import { ADMIN_INPUT_CLASS } from "~/utils/admin/landing-page-constants";

interface BlocTestimonialEditorProps {
  bloc: BlocTestimonial;
  onUpdate: (bloc: BlocTestimonial) => void;
}

export default function BlocTestimonialEditor({
  bloc,
  onUpdate,
}: BlocTestimonialEditorProps) {
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
          className={ADMIN_INPUT_CLASS}
        />
      </div>

      {/* Conclusion */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Conclusion
        </label>
        <textarea
          value={bloc.conclusion}
          onChange={(e) => onUpdate({ ...bloc, conclusion: e.target.value })}
          rows={3}
          className={ADMIN_INPUT_CLASS}
          placeholder="Texte de conclusion des témoignages..."
        />
      </div>
    </div>
  );
}
