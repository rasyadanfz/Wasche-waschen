import Button from "@/components/Button";
import { useRouter } from "next/navigation";

interface CardKeranjangProps{
  namaPakaian:String;
  kuantitas:number;
  total_harga:number;
}

export default function CardKeranjang(props: CardKeranjangProps) {
  const router = useRouter();

  return (
    <>
      <div className="border border-black rounded-md p-4 relative duration-100 bg-[#EDEDED]">
        <h1 className="font-semibold text-h6 mb-2">{props.namaPakaian}</h1>
        <div className="flex flex-row gap-5">
          <div className="">
            <p>Kuantitas</p>
            <p>Total Harga</p>
          </div>
          <div className="ml-4">
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="">
            <p>{props.kuantitas}</p>
            <p>{props.total_harga}</p>
          </div>
        </div>
      </div>
    </>
  );
}
