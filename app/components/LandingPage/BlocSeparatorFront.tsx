import type { BlocSeparator } from "~/types/landing-page";

interface BlocSeparatorFrontProps {
  bloc: BlocSeparator;
}

export default function BlocSeparatorFront({ bloc }: BlocSeparatorFrontProps) {
  const isHorizontal = bloc.direction === "horizontal";

  return (
    <div
      className={`flex justify-center items-center ${isHorizontal ? "py-8" : "px-8"}`}
    >
      <div
        className={`rounded-full ${
          isHorizontal
            ? "w-20 h-1 holographic-bg"
            : "w-1 h-20 holographic-bg-vertical"
        }`}
      />
    </div>
  );
}
