import { memo, useMemo } from "react";
import { cn } from "~/utils/ui/ui";
import "~/styles/tailwind.css";

interface CardProps {
  height: string;
  content?: React.ReactNode;
  borderClass?: string;
  children?: React.ReactNode;
  borderRadius?: string;
}

const Card = memo(function Card({
  content,
  height,
  borderClass,
  children,
  borderRadius = "28px",
}: CardProps) {
  const containerClasses = useMemo(
    () =>
      cn(
        `md:border-custom-thin border-custom-mobile w-full md:rounded-[${borderRadius}] rounded-[16px]`,
        borderClass
      ),
    [borderRadius, borderClass]
  );

  return (
    <div className={containerClasses} style={{ height }}>
      {content || children}
    </div>
  );
});

export default Card;
