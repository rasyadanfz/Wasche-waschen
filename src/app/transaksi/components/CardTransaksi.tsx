import Button from "@/components/Button";
import { useRouter } from "next/navigation";

interface CardTransaksiProps {
  id: string;
  nama: string;
  tanggal: string;
  status: string;
  total_harga: Number;
  nama_customer: string;
}

export default function CardTransaksi(props: CardTransaksiProps) {
  const router = useRouter();

  return (
    <>
      <div className="border border-black rounded-md p-4 relative duration-100 bg-[#D9E0E8]">
        <h1 className="font-semibold text-h6 mb-2">{props.nama}</h1>
        {/* add pad colon */}
        {/* <p className="">ID Transaksi: {props.id}</p>
        <p className="">Nama Pelanggan: {props.nama_customer}</p>
        <p className="">Tanggal Transaksi: {props.tanggal}</p>
        <p className="">Status: {props.status}</p> */}
        <div className="flex flex-row gap-5">
          <div className="">
            <p>ID Transaksi</p>
            <p>Nama Pelanggan</p>
            <p>Tanggal Transaksi</p>
            <p>Status</p>
          </div>
          <div className="ml-4">
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="">
            <p>{props.id}</p>
            <p>{props.nama_customer}</p>
            <p>{props.tanggal}</p>
            <p>{props.status}</p>
          </div>
        </div>
        <Button
          type="primary"
          text="Detail"
          className="absolute right-4 bottom-4"
          onClick={() => router.push(`/transaksi/${props.id}`)}
        />
      </div>
    </>
  );
}
