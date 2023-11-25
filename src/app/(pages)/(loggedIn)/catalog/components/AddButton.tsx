import Button from "@/components/Button";
import { useState } from "react";

const AddButton = () => {
    const [count, setCount] = useState(0);
    const [showTambahButton, setShowTambahButton] = useState(true);

    const handleAdd = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const handleSubstract = () => {
        if (count > 0) {
            setCount((prevCount) => {
                if (prevCount === 1) {
                    setShowTambahButton(true);
                }
                return prevCount - 1;
            });
        }
    };

    const handleTambah = () => {
        setShowTambahButton(false);
        setCount((prevCount) => prevCount + 1);
    };

    return (
        <div className="w-full">
            {showTambahButton ? (
                <Button
                    onClick={handleTambah}
                    text="+Tambah"
                    className="p-2 w-full"
                />
            ) : (
                <div className="flex items-center justify-center gap-x-5">
                    <button
                        onClick={handleAdd}
                        className="rounded-full flex relative px-[10px] font-poppins text-h5 bg-primary-200"
                    >
                        +
                    </button>
                    <h1 className="font-poppins text-body">{count}</h1>
                    <button
                        onClick={handleSubstract}
                        className="rounded-full flex relative px-[12px] font-poppins text-h5 bg-primary-200"
                    >
                        -
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddButton;
