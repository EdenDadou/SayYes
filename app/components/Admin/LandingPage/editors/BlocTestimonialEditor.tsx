import type { BlocTestimonial } from "~/types/landing-page";

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
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Texte de conclusion des témoignages..."
        />
      </div>
    </div>
  );
}
