import Button from "@/components/Button"
import Image from "next/image"
import { Pakaian } from "@prisma/client";
import AddButton from "./AddButton";

const PakaianComponent = ({ pakaian }: { pakaian: Pakaian }) => {
    return (
        <div className="p-4 gap-x-[800px] border border-slate-300 flex justify-between my-5 items-start">
            <div className="flex gap-4">
                <Image
                    src={`/assets/${pakaian.name}.jpg`}
                    width={144}
                    height={144}
                    alt={pakaian.name}
                />
            <div>
                <h2 className="font-bold text-2xl">{pakaian.name}</h2>
                <div>Rp{pakaian.price}/{pakaian.unit}</div>
            </div>
            </div>

            <div>
            {/* <Button text="+Tambah" className="p-2" /> */}
            <AddButton />
            </div>
        </div>
    )
}

export default PakaianComponent