const FormInput = ({
    type,
    id,
    text,
    onChange,
    placeholder,
    setShowPassword,
}: {
    type: string;
    id: string;
    text: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    setShowPassword?: () => void;
}) => {
    return (
        <div className="flex flex-col gap-y-1">
            <label
                htmlFor={id}
                className="font-semibold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]"
            >
                {text}
            </label>
            <div className="flex border border-black justify-between p-1 px-2 rounded-md">
                <input
                    type={type}
                    id={id}
                    className="rounded-md grow text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] focus:outline-none"
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {(id === "password" || id === "confirmpassword") && (
                    <button
                        className="ml-5"
                        onClick={setShowPassword}
                        type="button"
                    >
                        Show
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormInput;
