interface TextFieldProps {
    type?: string;
    placeholder?: string;
    width?: string;
    height?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    id?: string;
}

const TextField = ({
    type = "text",
    placeholder,
    width = "full",
    height = "full",
    onChange,
    value,
    id,
}: TextFieldProps) => {
    return (
        <div className="w-full">
            <input
                type={type}
                id={id}
                className={`border border-black focus:border-secondary-400 rounded w-${width} h-${height} outline-none p-2 transition duration-150 ease-in-out font-raleway`}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextField;
