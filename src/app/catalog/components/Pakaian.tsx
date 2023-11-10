import Button from "@/components/Button"

const Pakaian = ({ pakaian }) => {
    return (
        <div className="p-4 gap-x-[80px] border border-slate-300 flex justify-between my-3 items-start">
            <div className="flex gap-2">
            <Button text="G" className="p-2" />
            <div>
                <h2 className="font-bold text-2xl">{pakaian.name}</h2>
                <div>{pakaian.price}</div>
            </div>
            </div>

            <div>
            <Button text="+Tambah" className="p-2" />
            </div>
        </div>
    )
}

export default Pakaian