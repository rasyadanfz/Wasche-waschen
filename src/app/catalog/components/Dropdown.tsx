import { useState } from "react"
import Button from "../../../components/Button";

interface Option {
    value: string,
    label: string,
    isChecked: boolean,
}

const Dropdown = ({ updateFilteredData, updateDataToOriginal }: { updateFilteredData: (startPrice: number[], endPrice: number[]) => void, updateDataToOriginal: () => void }) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [options, setOptions] = useState([
        { value: "harga1", label: "Kurang dari Rp4.000", isChecked: false, startPrice: 0, endPrice: 3999 },
        { value: "harga2", label: "Rp4.000 - Rp6.500", isChecked: false, startPrice: 4000, endPrice: 6500 },
        { value: "harga3", label: "Rp6.500 - Rp10.000", isChecked: false, startPrice: 6500, endPrice: 10000 },
        { value: "harga4", label: "Lebih dari Rp10.000", isChecked: false, startPrice: 10001, endPrice: 99999 },
    ]);

    const updateOptionIsChecked = (valueToggle: string) => {
        setOptions((prevOptions) => {
            return prevOptions.map((option) => {
                if (option.value === valueToggle) {
                    return { ...option, isChecked: !option.isChecked };
                }
                return option;
            })
        })
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleApplyFilter = () => {
        let start = [];
        let end = [];
        for (const option of options) {
            if (option.isChecked) {
                start.push(option.startPrice);
                end.push(option.endPrice);
            }
        }

        if (start.length === 0 && end.length === 0) {
            updateDataToOriginal();
        }
        else {
            updateFilteredData(start, end);
        }
    }

    const handleClearFilter = () => {
        for (const option of options) {
            if (option.isChecked) {
                updateOptionIsChecked(option.value);
            }
        }
        updateDataToOriginal();
    }

    return (
        <div className="relative">
            <div onClick={toggleDropdown} className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center h-14 border border-black hover:bg-gray-100">
                Filter
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2} 
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
                                checked={option.isChecked}
                                onChange={() => updateOptionIsChecked(option.value)}
                            />
                            <label htmlFor={option.value}>{option.label}</label>
                        </div>
                    ))}
                    <div className="py-2">
                        <Button onClick={handleApplyFilter} text="Apply Filter(s)" className="p-2 flex" />
                    </div>
                    <div className="py-2">
                        <Button onClick={handleClearFilter} text="Clear Filter(s)" className="p-2 flex" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown