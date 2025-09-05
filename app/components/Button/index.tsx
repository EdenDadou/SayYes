interface IButtonProps {
  leftIcon?: React.ReactNode;
  label: string;
  type?: "plain" | "transparent";
}

const Button = ({ leftIcon, label, type = "transparent" }: IButtonProps) => {
  return (
    <button
      className={`w-fit cursor-pointer p-2 bg-transparent rounded-full ${
        type === "plain" ? "border-custom h-[74px]" : ""
      }`}
    >
      <div
        className={`flex flex-row items-center cursor-pointer justify-center gap-2 ${
          type === "transparent"
            ? "bg-transparent"
            : "bg-white rounded-full px-3"
        }`}
      >
        {leftIcon ? leftIcon : null}
        <span
          className={`${
            type === "transparent"
              ? "text-white text-shadow-base shadow-black font-jakarta"
              : "text-black font-jakarta-bold py-4 text-md"
          }`}
        >
          {label}
        </span>
      </div>
    </button>
  );
};

export default Button;
