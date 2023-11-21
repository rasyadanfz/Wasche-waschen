interface OrderlineCardDetailTransaksiProps {
  nama_pakaian : string;
  kuantitas : number;
}

export default function OrderlineCardDetailTransaksi(props: OrderlineCardDetailTransaksiProps) {
  return (
    <>
      <div className="border border-black flex flex-row">
        <p className="">{props.nama_pakaian}</p>
        <p className="">{props.kuantitas}</p>
      </div>
    </>
  )
}