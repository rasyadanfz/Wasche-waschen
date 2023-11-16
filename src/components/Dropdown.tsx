import { useState } from "react"

interface Option {
    value: string,
    label: string,
}

interface DropdownProps {
    options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>();

    const onHanleSelectChange = (option: Option | null) => {
        setSelectedOption(option);
    }

  return (
    <div>
        <select
            value={selectedOption ? selectedOption.value : "Harga"}
            onChange={(e) => {
                const selectedValue = e.target.value;
                const selected = options.find((option) => option.value === selectedValue);
                onHanleSelectChange(selected || null);
            }}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
  )
}

export default Dropdown