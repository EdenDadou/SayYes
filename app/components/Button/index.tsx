interface IButtonProps {
  leftIcon?: React.ReactNode;
  label?: string;
  type?: "plain" | "transparent" | "mobile" | "border";
  onClick?: () => void;
  textSize?: "S" | "M" | "L";
}

const Button = ({
  leftIcon,
  label,
  type = "transparent",
  onClick,
  textSize = "M",
}: IButtonProps) => {
  return (
    <button
      className={`w-fit cursor-pointer bg-transparent rounded-full ${
        type === "plain"
          ? "border-custom h-[74px] p-2 "
          : type === "border"
            ? "border-grey-animed  hover:scale-105 transition-all backdrop-blur-xl"
            : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`flex flex-row items-center cursor-pointer justify-center gap-2 ${
          type === "transparent"
            ? "bg-transparent"
            : type === "mobile"
              ? "bg-white rounded-full p-3"
              : type === "border"
                ? "font-jakarta flex items-center gap-2 rounded-full transition-all relative pl-3 pr-5 py-3"
                : "bg-white rounded-full px-3 holographic-bg-hover"
        }`}
      >
        {leftIcon ? leftIcon : null}
        {label ? (
          <span
            className={`${
              type === "transparent" || type === "border"
                ? "text-white text-shadow-base shadow-black font-jakarta-semi-bold"
                : "text-black font-jakarta-bold py-4 text-md"
            } ${textSize === "L" ? "text-[20px]" : "text-[14px]"} `}
          >
            {label}
          </span>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
