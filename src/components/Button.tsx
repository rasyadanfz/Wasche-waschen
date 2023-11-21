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
                className={`w-full border bg-primary-200 border-black justify-center rounded-md hover:bg-primary-500 duration-300 ${className}`}
                onClick={onClick}
            >
                <div>{text}</div>
            </button>
        </div>
    );
};

export default Button;
