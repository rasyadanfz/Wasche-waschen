const Button = ({
    text,
    className,
    onClick,
}: {
    text: string;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <div className="">
            <button
                type="submit"
                className={`w-full border border-black justify-center rounded-md bg-blue1 hover:bg-[#69ccf5] duration-300 ${className}`}
                onClick={onClick}
            >
                <div>{text}</div>
            </button>
        </div>
    );
};

export default Button;
