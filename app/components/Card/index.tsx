import { cn } from "~/utils/ui/ui";
import "~/styles/tailwind.css";

interface CardProps {
  height: string;
  content?: React.ReactNode;
  borderClass?: string;
  children?: React.ReactNode;
}

export default function Card({
  content,
  height,
  borderClass,
  children,
}: CardProps) {
  const containerClasses = cn(
    "md:border-custom border-custom-mobile w-full rounded-[25px]",
    borderClass
  );

  return (
    <div className={containerClasses} style={{ height }}>
      {content || children}
    </div>
  );
}
