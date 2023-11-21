import Image from "next/image"
import { Pakaian } from "@prisma/client";
import AddButton from "./AddButton";

const PakaianComponent = ({ pakaian }: { pakaian: Pakaian }) => {
    return (
        <div className="border flex flex-col justify-between my-5 items-start gap-4 shadow-md">
            <div className="">
                <Image
                    src={`/assets/${pakaian.name}.jpg`}
                    alt={pakaian.name}
                    width={144}
                    height={144}
                    className="w-[300px] h-[144px]"
                />
            </div>
            <div className="p-4 w-full">
                <h2 className="font-bold text-2xl">{pakaian.name}</h2>
                <p>Rp{pakaian.price}/{pakaian.unit}</p>
            </div>
            <div className="p-4 w-full flex">
                <AddButton />    
            </div>
        </div>
    )
}

export default PakaianComponent