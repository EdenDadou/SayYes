import type { Bloc } from "~/types/landing-page";
import BlocIntroFront from "./BlocIntroFront";
import BlocCardsFront from "./BlocCardsFront";
import BlocMethodsFront from "./BlocMethodsFront";
import BlocChiffresClesFront from "./BlocChiffresClesFront";
import BlocFAQFront from "./BlocFAQFront";
import BlocEtapeFront from "./BlocEtapeFront";
import BlocTestimonialFront from "./BlocTestimonialFront";
import BlocFooterFront from "./BlocFooterFront";
import BlocUseCaseFront from "./BlocUseCaseFront";
import BlocCommentaireClientFront from "./BlocCommentaireClientFront";
import BlocOffresFront from "./BlocOffresFront";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";

interface BlocRendererProps {
  bloc: Bloc;
  color: string;
  portfolios?: PortfolioData[];
}

export default function BlocRenderer({
  bloc,
  color,
  portfolios,
}: BlocRendererProps) {
  switch (bloc.type) {
    case "blocIntro":
      return <BlocIntroFront bloc={bloc} color={color} />;

    case "cards":
      // Check if cards are "offre" type (pricing cards) or "concurrence" type (problem cards)
      const hasOffreCards = bloc.cards.some((c) => c.type === "offre");
      if (hasOffreCards) {
        return <BlocOffresFront bloc={bloc} color={color} />;
      }
      return <BlocCardsFront bloc={bloc} color={color} />;

    case "methods":
      return <BlocMethodsFront bloc={bloc} color={color} />;

    case "chiffresCles":
      return <BlocChiffresClesFront bloc={bloc} color={color} />;

    case "faq":
      return <BlocFAQFront bloc={bloc} color={color} />;

    case "etape":
      return <BlocEtapeFront bloc={bloc} color={color} />;

    case "testimonial":
      return <BlocTestimonialFront bloc={bloc} color={color} />;

    case "footer":
      return <BlocFooterFront bloc={bloc} color={color} />;

    case "useCase":
      return (
        <BlocUseCaseFront bloc={bloc} color={color} portfolios={portfolios} />
      );

    case "commentaireClient":
      return <BlocCommentaireClientFront bloc={bloc} color={color} />;

    default:
      return (
        <div className="py-12 text-center text-white/50">
          Bloc type "{(bloc as Bloc).type}" non supporté
        </div>
      );
  }
}
