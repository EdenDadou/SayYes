import type { ReactNode } from "react";
import Star from "~/assets/icons/Star";
import NoteStar from "~/assets/icons/NoteStar";
import TwoDiamonds from "~/assets/icons/TwoDiamonds";
import ArrowLight from "~/assets/icons/ArrowLight";
import ArrowFull from "~/assets/icons/ArrowFull";
import Arrow from "~/assets/icons/Arrow";
import ArrowBig from "~/assets/icons/ArrowBig";
import Close from "~/assets/icons/Close";
import Coche from "~/assets/icons/Coche";
import Pause from "~/assets/icons/Pause";
import Play from "~/assets/icons/Play";
import Coeur from "~/components/Header/assets/Coeur";
import Flamme from "~/components/Header/assets/Flamme";
import Idea from "~/components/Header/assets/Idea";
import Smile from "~/components/Header/assets/Smile";
import ChatBuble from "~/components/Header/assets/ChatBuble";
import { createElement } from "react";

export const ICON_OPTIONS = [
  { value: "heart", label: "❤️ Coeur" },
  { value: "star", label: "⭐ Étoile" },
  { value: "2 stars", label: "✨ 2 Étoiles" },
  { value: "2 diamonds", label: "💎 2 Diamants" },
  { value: "arrowLight", label: "→ Flèche légère" },
  { value: "arrowWhite", label: "➜ Flèche pleine" },
  { value: "arrow", label: "↗ Flèche simple" },
  { value: "arrowBig", label: "⇒ Grande flèche" },
  { value: "coche", label: "✓ Coche" },
  { value: "close", label: "✕ Fermer" },
  { value: "pause", label: "⏸ Pause" },
  { value: "play", label: "▶ Play" },
  { value: "flamme", label: "🔥 Flamme" },
  { value: "idea", label: "💡 Idée" },
  { value: "smile", label: "😊 Smile" },
  { value: "chat", label: "💬 Chat" },
] as const;

type IconSize = "sm" | "md" | "lg";

const ICON_SIZE_CLASSES: Record<IconSize, string> = {
  sm: "w-5",
  md: "w-8",
  lg: "w-12",
};

export function getIconMap(size: IconSize = "md"): Record<string, ReactNode> {
  const cls = ICON_SIZE_CLASSES[size];
  const inlineCls = `${cls} inline-block`;
  return {
    heart: createElement(Coeur),
    star: createElement(Star),
    "2 stars": createElement(NoteStar),
    "2 diamonds": createElement(TwoDiamonds, { className: size === "sm" ? inlineCls : cls }),
    arrowLight: createElement(ArrowLight, { className: size === "sm" ? inlineCls : cls }),
    arrowWhite: createElement(ArrowFull),
    arrow: createElement(Arrow, { className: size === "sm" ? inlineCls : cls }),
    arrowBig: createElement(ArrowBig, { className: size === "sm" ? inlineCls : cls }),
    coche: createElement(Coche, size === "sm" ? { className: "w-5" } : undefined),
    close: createElement(Close, { className: size === "sm" ? `${ICON_SIZE_CLASSES.sm} inline-block` : size === "md" ? "w-6" : "w-8" }),
    pause: createElement(Pause, { className: size === "sm" ? `${ICON_SIZE_CLASSES.sm} inline-block` : size === "md" ? "w-6" : "w-8" }),
    play: createElement(Play, { className: size === "sm" ? `${ICON_SIZE_CLASSES.sm} inline-block` : size === "md" ? "w-6" : "w-8" }),
    flamme: createElement(Flamme),
    idea: createElement(Idea),
    smile: createElement(Smile),
    chat: createElement(ChatBuble),
  };
}

export const ADMIN_INPUT_CLASS =
  "w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export function swapItems<T>(items: T[], index: number, direction: "up" | "down"): T[] {
  const newItems = [...items];
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= newItems.length) return items;
  [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
  return newItems;
}
