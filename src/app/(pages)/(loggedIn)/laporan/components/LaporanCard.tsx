import { Pakaian } from "@prisma/client";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { FaShirt } from "react-icons/fa6";

interface LaporanCardProps {
    type: "totalPendapatan" | "jumlahTransaksi" | "jenisPakaian";
    width?: string;
    height?: string;
    data?: string | Pakaian[];
    children?: React.ReactNode;
}

const LaporanCard = ({ type, data, children }: LaporanCardProps) => {
    let iconBG;
    switch (type) {
        case "totalPendapatan":
            iconBG = "bg-[#BBFF9B]";
            break;
        case "jumlahTransaksi":
            iconBG = "bg-[#D0BAFF]";
            break;
        case "jenisPakaian":
            iconBG = "bg-[#E0E0E0]";
            break;
    }

    const iconClassName =
        iconBG +
        " w-[64px] h-[64px] rounded-full flex items-center justify-center";

    return (
        <div className={` rounded-md min-w-[250px] grow `}>
            <div className={`flex flex-col p-5 font-raleway`}>
                <div className={iconClassName}>
                    {type === "totalPendapatan" && (
                        <FaMoneyBillWave size={32} color="#2EB200" />
                    )}
                    {type === "jumlahTransaksi" && (
                        <FaShoppingCart size={32} color="#854FF9" />
                    )}
                    {type === "jenisPakaian" && (
                        <FaShirt size={32} color="#000000" />
                    )}
                </div>
                <div className="mt-3 text-h6 font-semibold">
                    {type === "totalPendapatan" && "Total Pendapatan"}
                    {type === "jumlahTransaksi" && "Jumlah Transaksi"}
                    {type === "jenisPakaian" && "Jumlah Jenis Pakaian"}
                </div>
                <div className="mt-3 text-body">
                    {type === "totalPendapatan" && `Rp ${data}`}
                    {type === "jumlahTransaksi" && `${data}`}
                    {type === "jenisPakaian" && children}
                </div>
            </div>
        </div>
    );
};

export default LaporanCard;
