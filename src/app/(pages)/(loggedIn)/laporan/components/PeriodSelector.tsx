import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useState } from "react";

const PeriodSelector = ({ onChange }: { onChange: (type: string) => void }) => {
    const [choice, setChoice] = useState("Harian");
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div>
            <div
                className="relative flex justify-between px-4 py-1 border border-black rounded-md hover:bg-gray-200 hover:cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <p id="choice">{choice}</p>
                <div className="flex items-center" id="arrow">
                    {showDropdown ? <IoChevronUp /> : <IoChevronDown />}
                </div>
                {showDropdown && (
                    <div className="absolute left-0 right-0 top-9 flex flex-col gap-y-1 bg-white border border-black rounded-md mt-1">
                        <p
                            id="harian"
                            className="py-1 px-4 hover:rounded-t-md hover:bg-gray-300 hover:cursor-pointer transition duration-100 ease-in-out"
                            onClick={() => {
                                setChoice("Harian");
                                setShowDropdown(!showDropdown);
                                onChange("harian");
                            }}
                        >
                            Harian
                        </p>
                        <p
                            id="mingguan"
                            className="py-1 px-4 hover:bg-gray-300 hover:cursor-pointer transition duration-100 ease-in-out"
                            onClick={() => {
                                setChoice("Mingguan");
                                setShowDropdown(!showDropdown);
                                onChange("mingguan");
                            }}
                        >
                            Mingguan
                        </p>
                        <p
                            id="bulanan"
                            className="py-1 px-4 hover:rounded-b-md hover:bg-gray-300 hover:cursor-pointer transition duration-100 ease-in-out"
                            onClick={() => {
                                setChoice("Bulanan");
                                setShowDropdown(!showDropdown);
                                onChange("bulanan");
                            }}
                        >
                            Bulanan
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeriodSelector;
