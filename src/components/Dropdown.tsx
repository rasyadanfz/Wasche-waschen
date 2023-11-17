import { useState } from "react"

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

    const onHanleSelectChange = (option: Option) => {
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
            <div className="absolute bg-white border rounded-md shadow-sm mt-3 -translate-x-32">
                {options.map((option) => (
                    <div key={option.value} className="flex w-56 gap-x-2 px-4 py-2 leading-5">
                        <input
                            type="checkbox"
                            id={option.value}
                            value={option.value}
                            checked={selectedOptions.some((selected) => selected.value === option.value)}
                            onChange={() => onHanleSelectChange(option)}
                        />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Dropdown