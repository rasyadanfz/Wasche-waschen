import Status from "./Status";

interface CardTransaksiProps {
  id: string;
  nama: string;
  tanggal: string;
  status: string;
  total_harga: Number;
  nama_customer: string;
}

export default function CardTransaksi(props: CardTransaksiProps) {
  return (
    <>
      <div className="border border-black rounded-md py-2 px-2 relative">
        <h1 className="font-semibold text-lg">{props.nama}</h1>
        {/* show kode transaksi, tanggal transaksi, nama customer */}
        <p className="text-sm text-neutral-500">Kode Transaksi: {props.id}</p>
        <p className="text-sm text-neutral-500">
          Tanggal Transaksi: {props.tanggal}
        </p>
        <p className="text-sm text-neutral-500">
          Nama Customer: {props.nama_customer}
        </p>

        {/* show status */}
        <Status status={props.status} />
      </div>
    </>
  );
}
