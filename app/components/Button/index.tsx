interface IButtonProps {
  leftIcon?: React.ReactNode;
  label?: string;
  type?: "plain" | "transparent" | "mobile" | "border";
  onClick?: () => void;
  textSize?: "S" | "M" | "L";
  htmlType?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  leftIcon,
  label,
  type = "transparent",
  onClick,
  textSize = "M",
  htmlType = "button",
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      className={`w-fit cursor-pointer bg-transparent rounded-full ${
        type === "plain"
          ? "border-custom h-[74px] p-2 "
          : type === "border"
            ? "border-grey-animed  hover:scale-105 transition-all backdrop-blur-xl bg-white/5"
            : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
    >
      <div
        className={`flex flex-row items-center cursor-pointer justify-center gap-2 ${
          type === "transparent"
            ? "bg-transparent"
            : type === "mobile"
              ? "bg-white rounded-full p-3"
              : type === "border"
                ? `font-jakarta flex items-center gap-2 rounded-full transition-all relative ${textSize === "S" ? "pl-2 pr-4 py-2" : "pl-3 pr-5 py-3"}`
                : "bg-white rounded-full px-3 holographic-bg-hover"
        }`}
      >
        {leftIcon ? leftIcon : null}
        {label ? (
          <span
            className={`${
              type === "transparent" || type === "border"
                ? "text-white text-shadow-base shadow-black font-jakarta"
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
