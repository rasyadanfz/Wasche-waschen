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
        return (
            <div className="absolute translate-x-[-50%] translate-y-[-50%] animate-pulse top-[50%] left-[50%] text-h2  font-raleway font-bold">
                <div>Loading...</div>
            </div>
        );
    } else {
        return (
            <div className="mx-16 mb-2 mt-[100px]">
                <div className="text-h2 font-raleway font-bold mt-2 mb-5">
                    Laporan
                </div>
                <div className="max-w-[300px]">
                    <PeriodSelector onChange={setReportType} />
                </div>
                <div className="md:grid md:grid-cols-6 mt-2 md:gap-x-5 flex flex-col gap-y-5">
                    <div className="md:col-span-3">
                        <div className="flex flex-col border border-black rounded-md p-3 shadow-md">
                            <LaporanCard
                                type="totalPendapatan"
                                data={totalBiaya.toLocaleString("id-ID")}
                            />
                            <ReportChart
                                data={originalData}
                                periodType={reportType}
                                type="totalPendapatan"
                            />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col border border-black rounded-md p-3 shadow-md">
                            <LaporanCard
                                type="jumlahTransaksi"
                                data={jumlahTransaksi.toLocaleString("id-ID")}
                            />
                            <ReportChart
                                data={originalData}
                                periodType={reportType}
                                type="jumlahTransaksi"
                            />
                        </div>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 border border-black rounded-md p-3 my-3 shadow-md gap-x-5 items-center">
                    <div className="md:col-span-1 md:self-start">
                        <LaporanCard type="jenisPakaian">
                            <div className="mt-3">
                                {reportClothesData && (
                                    <JenisPakaianTable
                                        clothesData={reportClothesData}
                                    />
                                )}
                            </div>
                        </LaporanCard>
                    </div>
                    <div>
                        <div className="md:col-span-1 self-center">
                            <ReportChart
                                data={originalData}
                                periodType={reportType}
                                type="jenisPakaian"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default LaporanPage;
