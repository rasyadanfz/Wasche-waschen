interface ButtonProps {
    text?: string;
    className?: string;
    onClick?: () => void;
    id?: string;
    type?: string;
    children?: React.ReactNode;
}

const Button = ({
    text = "Button",
    className,
    onClick,
    id,
    type = "primary",
}: ButtonProps) => {
    const baseClassName =
        "text-button px-4 py-2 rounded-md w-full h-full font-raleway";

    const buttonClassName = baseClassName + " " + className;
    return (
        <div className="">
            <button
                type="submit"
                className={`${
                    type === "primary"
                        ? "bg-primary-400 hover:bg-primary-300 active:bg-primary-300"
                        : "bg-secondary-400 hover:bg-secondary-300 active:bg-secondary-300"
                } ${buttonClassName}`}
                onClick={onClick}
                id={id}
            >
                <div className="text-white">{text}</div>
            </button>
        </div>
    );
};

export default Button;
