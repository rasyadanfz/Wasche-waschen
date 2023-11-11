
interface Transaksi {
  id: string
  nama: string
  tanggal: string
  status: string
  total_harga: Number
  userId: string
}

export default function Transaksi() {
  return (
    <div>
      <h1>Transaksi</h1>
    </div>
  );
}