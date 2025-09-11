interface IButtonProps {
  leftIcon?: React.ReactNode;
  label?: string;
  type?: "plain" | "transparent" | "mobile";
  onClick?: () => void;
}

const Button = ({
  leftIcon,
  label,
  type = "transparent",
  onClick,
}: IButtonProps) => {
  return (
    <button
      className={`w-fit cursor-pointerbg-transparent rounded-full ${
        type === "plain" ? "border-custom h-[74px] p-2 " : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`flex flex-row items-center cursor-pointer justify-center gap-2 ${
          type === "transparent"
            ? "bg-transparent"
            : type === "mobile"
              ? "bg-white rounded-full p-3"
              : "bg-white rounded-full px-3 holographic-bg-hover"
        }`}
      >
        {leftIcon ? leftIcon : null}
        {label ? (
          <span
            className={`${
              type === "transparent"
                ? "text-white text-shadow-base shadow-black font-jakarta"
                : "text-black font-jakarta-bold py-4 text-md"
            }`}
          >
            {label}
          </span>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
