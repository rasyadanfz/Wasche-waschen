import Button from "@/components/Button";
import { useRouter } from "next/navigation";

interface CardTransaksiProps {
  id: string;
  nama: string;
  tanggal: string;
  status: string;
  total_harga: Number;
}

export default function CardRiwayat(props: CardTransaksiProps) {
  const router = useRouter();

  return (
    <>
      <div className="border border-black rounded-md p-4 relative duration-100 bg-[#EDEDED]">
        <h1 className="font-semibold text-h6 mb-2">{props.nama}</h1>
        <div className="flex flex-row gap-5">
          <div className="">
            <p>ID Transaksi</p>
            <p>Tanggal Transaksi</p>
            <p>Status</p>
          </div>
          <div className="ml-4">
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="">
            <p>{props.id}</p>
            <p>{props.tanggal}</p>
            <p>{props.status}</p>
          </div>
        </div>
        <Button
          type="primary"
          text="Detail"
          className="md:absolute mt-6 w-full md:w-fit md:mt-0 right-4 bottom-4"
          onClick={() => router.push(`/riwayat-transaksi/${props.id}`)}
        />
      </div>
    </>
  );
}
