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

    let buttonColorClass;
    switch (type) {
        case "primary":
            buttonColorClass =
                "bg-primary-400 hover:bg-primary-300 active:bg-primary-300";
            break;
        case "secondary":
            buttonColorClass =
                "bg-secondary-400 hover:bg-secondary-300 active:bg-secondary-300";
            break;
        case "success":
            buttonColorClass =
                "bg-success-400 hover:bg-success-300 active:bg-success-300";
            break;
        case "warning":
            buttonColorClass =
                "bg-warning-400 hover:bg-warning-300 active:bg-warning-300 ";
            break;
        case "danger":
            buttonColorClass =
                "bg-danger-400 hover:bg-danger-300 active:bg-danger-300";
            break;
    }

    const buttonClassName =
        baseClassName + " " + buttonColorClass + " " + className;
    return (
        <>
            <button
                type="submit"
                className={buttonClassName}
                onClick={onClick}
                id={id}
            >
                <div
                    className={type === "warning" ? "text-black" : "text-white"}
                >
                    {text}
                </div>
            </button>
        </>
    );
};

export default Button;
