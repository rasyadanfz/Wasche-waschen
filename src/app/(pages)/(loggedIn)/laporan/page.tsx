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
        return <div className="">Loading...</div>;
    } else {
        return (
            <div className="mx-5 my-1">
                <div className="text-h2 font-raleway font-bold mt-2 mb-5">
                    Laporan
                </div>
                <div className="max-w-[300px]">
                    <PeriodSelector onChange={setReportType} />
                </div>
                <div className="grid grid-cols-6 mt-2 gap-x-5">
                    <div className="col-span-3 flex flex-col">
                        <div className="flex flex-col border border-black rounded-md p-3 shadow-md">
                            <LaporanCard
                                type="totalPendapatan"
                                data={totalBiaya.toLocaleString("en-US")}
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
                                data={jumlahTransaksi.toLocaleString("en-US")}
                            />
                            <ReportChart
                                data={originalData}
                                periodType={reportType}
                                type="jumlahTransaksi"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 border border-black rounded-md p-3 mt-3 shadow-md gap-x-5">
                    <div className="col-span-1 self-center">
                        <ReportChart
                            data={originalData}
                            periodType={reportType}
                            type="jenisPakaian"
                        />
                    </div>
                    <div className="col-span-1 ">
                        <LaporanCard type="jenisPakaian">
                            {reportClothesData && (
                                <JenisPakaianTable
                                    clothesData={reportClothesData}
                                />
                            )}
                        </LaporanCard>
                    </div>
                </div>
            </div>
        );
    }
};

export default LaporanPage;
