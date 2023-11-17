import { IconContext } from "react-icons";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const FormInput = ({
    type,
    id,
    text,
    onChange,
    placeholder,
    setShowPassword,
    isShowPassword,
}: {
    type: string;
    id: string;
    text: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    setShowPassword?: () => void;
    isShowPassword?: boolean;
}) => {
    return (
        <div className="flex flex-col gap-y-1 font-raleway">
            <label htmlFor={id} className="font-semibold text-body">
                {text}
            </label>
            <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md">
                <input
                    type={type}
                    id={id}
                    className="rounded-md grow text-body bg-[#EDEDED] focus:outline-none"
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {id === "password" && (
                    <IconContext.Provider value={{ size: "1.5em" }}>
                        <button
                            id="showPassword"
                            className="ml-5 text-body"
                            onClick={setShowPassword}
                            type="button"
                        >
                            {isShowPassword ? (
                                <AiOutlineEye />
                            ) : (
                                <AiOutlineEyeInvisible />
                            )}
                        </button>
                    </IconContext.Provider>
                )}
                {id === "confirmpassword" && (
                    <IconContext.Provider value={{ size: "1.5em" }}>
                        <button
                            id="showConfirmPassword"
                            className="ml-5 text-body"
                            onClick={setShowPassword}
                            type="button"
                        >
                            {isShowPassword ? (
                                <AiOutlineEye />
                            ) : (
                                <AiOutlineEyeInvisible />
                            )}
                        </button>
                    </IconContext.Provider>
                )}
            </div>
        </div>
    );
};

export default FormInput;
