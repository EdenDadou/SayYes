interface IButtonProps {
  leftIcon?: React.ReactNode;
  label: string;
  type?: "plain" | "transparent";
}

const Button = ({ leftIcon, label, type = "transparent" }: IButtonProps) => {
  return (
    <button
      className={`w-fit cursor-pointer p-2 bg-transparent rounded-full ${
        type === "plain" ? "border-2 border-grey h-[74px]" : ""
      }`}
    >
      <div
        className={`flex flex-row  items-top cursor-pointer justify-center items-center ${
          type === "transparent" ? "bg-transparent" : "bg-white rounded-full"
        }`}
      >
        {leftIcon ? leftIcon : null}
        <span
          className={`${
            type === "transparent"
              ? "text-white text-shadow-base shadow-black font-jakarta"
              : "text-black font-jakarta-bold px-3 py-4"
          }`}
        >
          {label}
        </span>
      </div>
    </button>
  );
};

export default Button;
