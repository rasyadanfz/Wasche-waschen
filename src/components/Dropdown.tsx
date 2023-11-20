import { useState } from "react"
import Button from "./Button";

interface Option {
    value: string,
    label: string,
}

interface DropdownProps {
    options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const onHandleSelectChange = (option: Option) => {
        const isOptionSelected = selectedOptions.some((selected) => selected.value === option.value);
        if (isOptionSelected) {
            setSelectedOptions((prevSelectedOptions) => 
                prevSelectedOptions.filter((selected) => selected.value !== option.value)
            );
        }
        else {
            setSelectedOptions((prevSelectedOptions) =>
                [...prevSelectedOptions, option]
            );
        }
    }

    const handleApplyFilter = () => {
        const { start, end } = selectedOptions.reduce((res, option) => {
            switch (option.value) {
                case "harga1":
                    res.end = 3999;
                    break;
                case "harga2":
                    res.start = res.start === null ? 4000 : Math.min(res.start, 4000);
                    res.end = res.end === null ? 6500 : Math.max(res.end, 6500);
                    break;
                case "harga3":
                    res.start = res.start === null ? 6500 : Math.min(res.start, 6500);
                    res.end = res.end === null ? 10000 : Math.max(res.end, 10000);
                    break;
                case "harga4":
                    res.start = res.start === null ? 10001 : Math.min(res.start, 10001);
                    break;
            }
            return res;
        }, { start: null as number | null, end: null as number | null });
        console.log(start, end);
        return { start, end };
    }

    const { start, end } = handleApplyFilter();
    
    // export { start, end };

    return (
        <div className="relative">
            <div onClick={toggleDropdown} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-14">
                Harga
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2" 
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </div>
            {isDropdownOpen && (
                <div className="absolute bg-white border rounded-md shadow-sm mt-3 -translate-x-32 flex flex-col items-center">
                    {options.map((option) => (
                        <div key={option.value} className="flex w-56 gap-x-2 px-4 py-2 leading-5">
                            <input
                                type="checkbox"
                                id={option.value}
                                value={option.value}
                                checked={selectedOptions.some((selected) => selected.value === option.value)}
                                onChange={() => onHandleSelectChange(option)}
                            />
                            <label htmlFor={option.value}>{option.label}</label>
                        </div>
                    ))}
                    <div className="py-2">
                        <Button onClick={handleApplyFilter} text="Apply Filter(s)" className="p-2 flex" />
                    </div>
                    <div className="py-2">
                        <Button text="Clear Filter(s)" className="p-2 flex" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown