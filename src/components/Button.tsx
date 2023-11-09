const Button = ({
    text,
    className,
    onClick,
    id,
}: {
    text?: string;
    className?: string;
    onClick?: () => void;
    id?: string;
}) => {
    return (
        <>
            <button
                type="submit"
                className={`border border-black justify-center rounded-md bg-blue1 hover:bg-[#69ccf5] duration-300 ${className}`}
                onClick={onClick}
                id={id}
            >
                <div className="text-white">{text}</div>
            </button>
        </>
    );
};

export default Button;
