import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const FormInputProfile = ({
    type,
    id,
    text,
    onChange,
    placeholder,
    value,
    setShowPassword,
    isShowPassword,
}: {
    type: string;
    id: string;
    text: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value?: string;
    setShowPassword?: () => void;
    isShowPassword?: boolean;
}) => {
    return (
        <div className="flex flex-col gap-y-1">
            <label
                htmlFor={id}
                className="font-bold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]"
            >
                {text}
            </label>
            <div className="flex border border-black justify-between p-1 px-2 rounded-md">
                <input
                    type={type}
                    id={id}
                    className="rounded-md grow text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] focus:outline-none w-[500px]"
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                />
                {id === "password" && (
                    <button
                        id="showPassword"
                        className="ml-5"
                        onClick={setShowPassword}
                        type="button"
                    >
                        {isShowPassword ? (
                            <AiOutlineEye />
                        ) : (
                            <AiOutlineEyeInvisible />
                        )}
                    </button>
                )}
                {id === "confirmpassword" && (
                    <button
                        id="showConfirmPassword"
                        className="ml-5"
                        onClick={setShowPassword}
                        type="button"
                    >
                        {isShowPassword ? (
                            <AiOutlineEye />
                        ) : (
                            <AiOutlineEyeInvisible />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormInputProfile;
