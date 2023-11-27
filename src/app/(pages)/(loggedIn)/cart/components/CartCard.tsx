import MinusButton from "./MinusButton";
import { ClothesCartData } from "@/app/api/keranjang/[id]/route";
export default function CartCard({
    pakaianNama,
    kuantitas,
    total_harga,
    subtract,
}: ClothesCartData) {
    return (
        <div id="CartCard">
            <div className="border border-black rounded-md p-4 relative duration-100 bg-[#EDEDED] my-[20px]">
                <div className="flex flex-col md:flex-row justify-center items-between md:justify-between md:items-center gap-y-4">
                    <div>
                        <h1 className="font-semibold text-h6 mb-2">
                            {pakaianNama}
                        </h1>
                        <div className="flex flex-row gap-5">
                            <div className="">
                                <p>Kuantitas</p>
                                <p>Total Harga</p>
                            </div>
                            <div className="ml-4">
                                <p>:</p>
                                <p>:</p>
                            </div>
                            <div className="">
                                <p id="kuantitas">{kuantitas}</p>
                                <p>{total_harga}</p>
                            </div>
                        </div>
                    </div>
                    <div className="justify-self-end items-end">
                        <MinusButton onClick={subtract} id="substract_button"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
