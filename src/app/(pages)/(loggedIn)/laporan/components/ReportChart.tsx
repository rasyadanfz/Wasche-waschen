import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartArea,
    ScriptableContext,
} from "chart.js";
import { LaporanDataProps } from "../page";
import LineChart, { LineDataset } from "./LineChart";
import BarChart from "./BarChart";
import { ReportClothesData } from "./JenisPakaianTable";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Filler
);

interface ChartProps {
    data: LaporanDataProps;
    periodType: string;
    type: "totalPendapatan" | "jumlahTransaksi" | "jenisPakaian";
}

const getLineDatasets = ({
    label,
    data,
    pointBackgroundColor,
    fillColor,
    color,
}: LineDataset) => {
    const datasets = [
        {
            label: label,
            data: data,
            fill: true,
            borderColor: color,
            tension: 0.1,
            pointBackgroundColor: pointBackgroundColor,
            pointRadius: 5,
            pointHoverRadius: 7,
            backgroundColor: fillColor,
            pointBorderWidth: 0,
        },
    ];

    return datasets;
};

const getChart = ({
    title,
    datasets,
    barData,
    labelsData,
}: {
    title: string;
    datasets: LineDataset[];
    barData: ReportClothesData[][];
    labelsData: string[];
}) => {
    if (title === "Total Pendapatan" || title === "Total Transaksi") {
        return (
            <div>
                <LineChart
                    title={title}
                    datasets={datasets as LineDataset[]}
                    labelsData={labelsData}
                />
            </div>
        );
    } else {
        return (
            <div>
                <BarChart
                    data={barData as ReportClothesData[][]}
                    labelsData={labelsData}
                    title="Total Jenis Pakaian"
                />
            </div>
        );
    }
};

const ReportChart = ({ data, periodType, type }: ChartProps) => {
    const { current, past } = data;

    let title: string;
    let dataToShow = [];
    let labelsData: string[] = [];
    let pointColors = [];
    let datasets: LineDataset[] = [];
    title =
        type === "totalPendapatan"
            ? "Total Pendapatan"
            : type === "jumlahTransaksi"
            ? "Total Transaksi"
            : "Jenis Pakaian";

    if (periodType === "harian") {
        past.forEach((item) => {
            labelsData.unshift(
                new Date(item.startDate).toISOString().split("T")[0]
            );
        });
        labelsData.push(
            new Date(current.startDate).toISOString().split("T")[0]
        );

        switch (title) {
            case "Total Pendapatan":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalPendapatan);
                    pointColors.unshift("#35b608");
                });
                dataToShow.push(current?.totalPendapatan);
                pointColors.push("#35b608");
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                    color: "#35b608",
                    fillColor: "rgba(187,255,155, 0.3)",
                });
                break;
            case "Total Transaksi":
                past.forEach((item) => {
                    dataToShow.unshift(item.totalTransactions);
                    pointColors.unshift("#854ff9");
                });
                dataToShow.push(current?.totalTransactions);
                pointColors.push("#854ff9");
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                    color: "#854ff9",
                    fillColor: "rgba(208,186,255, 0.3)",
                });
                break;
            case "Jenis Pakaian":
                past?.forEach((item) => {
                    dataToShow.unshift(item.clothesReport);
                });
                dataToShow.push(current?.clothesReport);
                break;
        }

        return getChart({
            title: title,
            datasets: datasets,
            barData: dataToShow as ReportClothesData[][],
            labelsData: labelsData,
        });
    } else if (periodType === "mingguan") {
        past.forEach((item) => {
            const dayLabel = `${new Date(item.startDate).getDate()}/${
                new Date(item.startDate).getMonth() + 1
            } - ${new Date(item.endDate).getDate()}/${
                new Date(item.endDate).getMonth() + 1
            }`;
            labelsData.unshift(dayLabel);
        });
        labelsData.push(
            `${new Date(current.startDate).getDate()}/${
                new Date(current.startDate).getMonth() + 1
            } - ${new Date(current.endDate).getDate()}/${
                new Date(current.endDate).getMonth() + 1
            }`
        );

        switch (title) {
            case "Total Pendapatan":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalPendapatan);
                    pointColors.unshift("#35b608");
                });
                dataToShow.push(current?.totalPendapatan);
                pointColors.push("#35b608");
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                    color: "#35b608",
                    fillColor: "rgba(187,255,155, 0.3)",
                });
                break;
            case "Total Transaksi":
                past.forEach((item) => {
                    dataToShow.unshift(item.totalTransactions);
                    pointColors.unshift("#854ff9");
                });
                dataToShow.push(current?.totalTransactions);
                pointColors.push("#854ff9");
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                    color: "#854ff9",
                    fillColor: "rgba(208,186,255, 0.3)",
                });
                break;
            case "Jenis Pakaian":
                past?.forEach((item) => {
                    dataToShow.unshift(item.clothesReport);
                });
                dataToShow.push(current?.clothesReport);
                break;
        }

        return getChart({
            title: title,
            datasets: datasets,
            barData: dataToShow as ReportClothesData[][],
            labelsData: labelsData,
        });
    } else {
        //Period type === "Bulanan"
        past.forEach((item) => {
            const monthLabel = `${new Date(item.startDate).toLocaleDateString(
                "en-US",
                { month: "long" }
            )} ${new Date(item.startDate).getFullYear()}`;
            labelsData.unshift(monthLabel);
        });
        labelsData.push(
            `${new Date(current.startDate).toLocaleDateString("en-US", {
                month: "long",
            })} ${new Date(current.startDate).getFullYear()}`
        );

        switch (title) {
            case "Total Pendapatan":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalPendapatan);
                    pointColors.unshift("#35b608");
                });
                dataToShow.push(current?.totalPendapatan);
                pointColors.push("#35b608");
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                    color: "#35b608",
                    fillColor: "rgba(187,255,155, 0.3)",
                });
                break;
            case "Total Transaksi":
                past.forEach((item) => {
                    dataToShow.unshift(item.totalTransactions);
                    pointColors.unshift("#854ff9");
                });
                dataToShow.push(current?.totalTransactions);
                pointColors.push("#854ff9");
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                    color: "#854ff9",
                    fillColor: "rgba(208,186,255, 0.3)",
                });
                break;
            case "Jenis Pakaian":
                past?.forEach((item) => {
                    dataToShow.unshift(item.clothesReport);
                });
                dataToShow.push(current?.clothesReport);
                break;
        }

        return getChart({
            title: title,
            datasets: datasets,
            barData: dataToShow as ReportClothesData[][],
            labelsData: labelsData,
        });
    }
};

export default ReportChart;
