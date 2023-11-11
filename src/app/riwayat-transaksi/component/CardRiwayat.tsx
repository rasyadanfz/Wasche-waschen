import Status from "./Status";

interface CardRiwayatProps {
  id: string;
  nama: string;
  tanggal: string;
  status: string;
  total_harga: Number;
}

export default function CardRiwayat(props: CardRiwayatProps) {
  return (
    <>
      <div className="border border-black rounded-md py-2 px-2 relative">
        <h1 className="font-semibold text-lg">{props.nama}</h1>
        {/* show kode transaksi, tanggal transaksi */}
        <p className="text-sm text-neutral-500">Kode Transaksi: {props.id}</p>
        <p className="text-sm text-neutral-500">
          Tanggal Transaksi: {props.tanggal}
        </p>
        <p className="text-sm text-neutral-500 text-right">
          {props.total_harga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        {/* show status */}
        <Status status={props.status} />
      </div>
    </>
  );
}
