import { useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import ContentPortfolio from "~/components/Card/components/ContentPortfolio";
import Star from "~/assets/icons/Star";
import { loader } from "~/routes/portfolio+/$slug";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";

interface ProjectCarouselProps {
  portfolios: PortfolioData[];
  className?: string;
}

export default function ProjectCarouselMobile({
  portfolios,
  className = "",
}: ProjectCarouselProps) {
  const { portfolio } = useLoaderData<typeof loader>();

  // If no portfolios, don't render anything
  if (!portfolios || portfolios.length === 0) {
    return null;
  }

  // Filter out current portfolio
  const filteredPortfolios = portfolios.filter(
    (project) => project.id !== portfolio.id
  );

  return (
    <div className={`relative w-full pt-16 z-10 ${className}`}>
      {/* Title Section */}
      <div className="px-4 mb-6">
        <h2 className="flex flex-row items-center gap-4 text-3xl font-bold text-white font-jakarta">
          <Star className="w-8 h-8 text-white" /> Nos Love Stories
        </h2>
      </div>

      {/* Scrollable Container */}
      <div className="relative w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-4 pb-4">
          {filteredPortfolios.map((project) => (
            <div key={project.id} className="w-[280px] flex-shrink-0">
              <Card
                height="210px"
                content={
                  <ContentPortfolio
                    imageUrl={project.photoCouverture}
                    titre={project.titre}
                    topTitle={portfolio.topTitle}
                    slug={project.slug}
                  />
                }
                borderClass="card-hover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
