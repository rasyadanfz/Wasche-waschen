"use client";

import { useEffect, useState } from "react";
import JenisPakaianTable, {
    ReportClothesData,
} from "./components/JenisPakaianTable";
import LaporanCard from "./components/LaporanCard";
import { ReportData } from "@/app/api/laporan/route";
import ReportChart from "./components/ReportChart";
import PeriodSelector from "./components/PeriodSelector";

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
    const [chartType, setChartType] = useState("totalPendapatan");
    const [isLoading, setIsLoading] = useState(true);

    const handleCardClick = (
        type: "totalPendapatan" | "jumlahTransaksi" | "jenisPakaian"
    ) => {
        setChartType(type);
    };

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
            <div className="mx-5 my-1">
                <div className="max-w-[300px]">
                    <PeriodSelector onChange={() => {}} />
                </div>
                <div className="grid grid-cols-6 mt-2 gap-x-5">
                    <div className="col-span-3 flex flex-col">
                        <div className="flex justify-between gap-x-5 pb-2">
                            <LaporanCard
                                type="totalPendapatan"
                                data={totalBiaya.toLocaleString("en-US")}
                                onClick={handleCardClick}
                            />
                            <LaporanCard
                                type="jumlahTransaksi"
                                data={jumlahTransaksi.toLocaleString("en-US")}
                                onClick={handleCardClick}
                            />
                        </div>
                        {originalData && (
                            <div className="min-w-full min-h-[300px] border border-black">
                                {chartType === "totalPendapatan" && (
                                    <ReportChart
                                        data={originalData}
                                        periodType={reportType}
                                        type="totalPendapatan"
                                    />
                                )}
                                {chartType === "jumlahTransaksi" && (
                                    <ReportChart
                                        data={originalData}
                                        periodType={reportType}
                                        type="jumlahTransaksi"
                                    />
                                )}
                                {chartType === "jenisPakaian" && (
                                    <ReportChart
                                        data={originalData}
                                        periodType={reportType}
                                        type="jenisPakaian"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-span-3">
                        <LaporanCard
                            type="jenisPakaian"
                            onClick={handleCardClick}
                        >
                            {reportClothesData && (
                                <JenisPakaianTable
                                    clothesData={reportClothesData}
                                />
                            )}
                        </LaporanCard>
                    </div>
                </div>
                <div className="ml-10">
                    <div className="m-10 flex gap-x-4"></div>
                </div>
            </div>
        );
    }
};

export default LaporanPage;
