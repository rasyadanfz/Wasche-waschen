import MinusButton from "./MinusButton";
import { ClothesCartData } from "@/app/api/keranjang/[id]/route";
export default function CartCard({
    pakaianNama,
    kuantitas,
    total_harga,
    subtract,
}: ClothesCartData) {
    return (
        <>
            <div className="border border-black rounded-md p-4 relative duration-100 bg-[#EDEDED] mx-[100px] my-[20px]">
                <div className="flex flex-row justify-between items-center">
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
                                <p>{kuantitas}</p>
                                <p>{total_harga}</p>
                            </div>
                        </div>
                    </div>
                    <div className="justify-self-end items-end">
                        <MinusButton onClick={subtract} />
                    </div>
                </div>
            </div>
        </>
    );
}
