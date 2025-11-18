import { cn } from "~/utils/ui/ui";
import "~/styles/tailwind.css";

interface CardProps {
  height: string;
  content?: React.ReactNode;
  borderClass?: string;
  children?: React.ReactNode;
  borderRadius?: string;
}

export default function Card({
  content,
  height,
  borderClass,
  children,
  borderRadius = "24px",
}: CardProps) {
  const containerClasses = cn(
    `md:border-custom-thin border-custom-mobile w-full md:rounded-[${borderRadius}] rounded-[16px]`,
    borderClass
  );

  return (
    <div className={containerClasses} style={{ height }}>
      {content || children}
    </div>
  );
}
