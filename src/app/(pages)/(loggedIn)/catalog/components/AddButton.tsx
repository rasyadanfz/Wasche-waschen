import Button from "@/components/Button";
import { ExistingPakaian } from "@prisma/client";
import { useState } from "react";

const AddButton = ({
    pakaian,
    updateCartCount,
    updatePakaianInCart,
    disabledButton,
}: {
    pakaian: ExistingPakaian;
    updateCartCount: (count: number) => void;
    updatePakaianInCart: (pakaianName: string, pakaianCount: number) => void;
    disabledButton: boolean;
}) => {
    const [count, setCount] = useState(0);
    const [showTambahButton, setShowTambahButton] = useState(true);

    const handleAdd = () => {
        setCount((prevCount) => prevCount + 1);
        updateCartCount(1);
        updatePakaianInCart(pakaian.id, 1);
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
        updateCartCount(-1);
        updatePakaianInCart(pakaian.id, -1);
    };

    const handleTambah = () => {
        setShowTambahButton(false);
        handleAdd();
    };

    return (
        <div className="w-full">
            {showTambahButton ? (
                <Button
                    id="tambah_button"
                    onClick={handleTambah}
                    text="+Tambah"
                    className="p-2 w-full"
                    disabled={disabledButton}
                />
            ) : (
                <div className="flex items-center justify-center gap-x-5">
                    <button
                        id="add_button"
                        onClick={handleAdd}
                        className="rounded-full flex relative px-[10px] font-poppins text-h5 bg-primary-200"
                    >
                        +
                    </button>
                    <h1 id="item_count" className="font-poppins text-body">
                        {count}
                    </h1>
                    <button
                        id="substract_button"
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
