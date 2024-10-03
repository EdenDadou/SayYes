interface IButtonProps {
  leftIcon?: React.ReactNode;
  label: string;
}

const Button = ({ leftIcon, label }: IButtonProps) => {
  return (
    <button className="flex flex-row w-fit h-fit items-top cursor-pointer">
      {leftIcon ? leftIcon : null}
      <span className="text-gray text-shadow-base shadow-black cursor-pointer">
        {label}
      </span>
    </button>
  );
};

export default Button;
