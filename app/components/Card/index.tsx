import { cn } from "~/utils/ui/ui";
import "~/styles/tailwind.css";

interface CardProps {
  height: string;
  content?: React.ReactNode;
  borderClass?: string;
}

export default function Card({ content, height, borderClass }: CardProps) {
  const containerClasses = cn(
    "border-custom w-full rounded-[25px]",
    borderClass
  );

  return (
    <div className={containerClasses} style={{ height }}>
      {content}
    </div>
  );
}
