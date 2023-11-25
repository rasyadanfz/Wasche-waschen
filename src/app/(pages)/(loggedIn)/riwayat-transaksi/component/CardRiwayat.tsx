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
        <table>
          <tbody>
            <tr>
              <td>ID Transaksi</td>
              <td className="px-5">:</td>
              <td>{props.id}</td>
            </tr>
            <tr>
              <td>Tanggal Transaksi</td>
              <td className="px-5">:</td>
              <td>{props.tanggal}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td className="px-5">:</td>
              <td>{props.status}</td>
            </tr>
          </tbody>
        </table>

        <Button
          id="detailTransaksiBtn"
          type="primary"
          text="Detail"
          className="md:absolute mt-6 w-full md:w-fit md:mt-0 right-4 bottom-4"
          onClick={() => router.push(`/riwayat-transaksi/${props.id}`)}
        />
      </div>
    </>
  );
}
