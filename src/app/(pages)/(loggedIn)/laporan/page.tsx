"use client";

import { useEffect, useState } from "react";
import JenisPakaianTable, {
    ReportClothesData,
} from "./components/JenisPakaianTable";
import LaporanCard from "./components/LaporanCard";
import { ReportData } from "@/app/api/laporan/route";
import ReportChart from "./components/ReportChart";

export interface LaporanDataProps {
    current: ReportData;
    past: ReportData[];
}

const LaporanPage = () => {
    const [originalData, setOriginalData] = useState<LaporanDataProps>(
        {} as LaporanDataProps
    );
    const [reportClothesData, setReportClothesData] = useState(
        [] as ReportClothesData[]
    );
    const [totalBiaya, setTotalBiaya] = useState(0);
    const [jumlahTransaksi, setJumlahTransaksi] = useState(0);
    const [reportType, setReportType] = useState("harian");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const queryParams = { type: reportType };
        const queryString = new URLSearchParams(queryParams).toString();
        const fetchData = async () => {
            const response = await fetch(`/api/laporan?${queryString}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setOriginalData(data["data"]);
            setReportClothesData(data["data"]["current"]["clothesReport"]);
            setJumlahTransaksi(data["data"]["current"]["totalTransactions"]);
            setTotalBiaya(data["data"]["current"]["totalPendapatan"]);
            setIsLoading(false);
        };

        fetchData();
    }, [reportType]);

    if (isLoading) {
        return <div className="">Loading...</div>;
    } else {
        return (
            <div className="ml-10">
                <div className="m-10 flex gap-x-4">
                    <LaporanCard
                        type="totalBiaya"
                        data={totalBiaya.toLocaleString("en-US")}
                    />
                    <LaporanCard
                        type="jumlahTransaksi"
                        data={jumlahTransaksi.toLocaleString("en-US")}
                    />
                    <LaporanCard type="jenisPakaian">
                        {reportClothesData && (
                            <JenisPakaianTable
                                clothesData={reportClothesData}
                            />
                        )}
                    </LaporanCard>
                </div>
                {originalData && (
                    <div className="max-w-[1000px]">
                        <ReportChart
                            data={originalData}
                            periodType={reportType}
                            type="totalPendapatan"
                        />
                    </div>
                )}
            </div>
        );
    }
};

export default LaporanPage;
