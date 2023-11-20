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
} from "chart.js";
import { Line } from "react-chartjs-2";
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
    BarElement
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
}: LineDataset) => {
    const datasets = [
        {
            label: label,
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderColor: "rgba(133, 79, 249, 1)",
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
            pointColors.unshift("blue");
        });
        labelsData.push(
            new Date(current.startDate).toISOString().split("T")[0]
        );
        pointColors.push("red");

        switch (title) {
            case "Total Pendapatan":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalPendapatan);
                });
                dataToShow.push(current?.totalPendapatan);
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                });
                break;
            case "Total Transaksi":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalTransactions);
                });
                dataToShow.push(current?.totalTransactions);
                getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
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
            pointColors.push("blue");
        });
        labelsData.push(
            `${new Date(current.startDate).getDate()}/${
                new Date(current.startDate).getMonth() + 1
            } - ${new Date(current.endDate).getDate()}/${
                new Date(current.endDate).getMonth() + 1
            }`
        );
        pointColors.push("red");

        switch (title) {
            case "Total Pendapatan":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalPendapatan);
                });
                dataToShow.push(current?.totalPendapatan);
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                });
                break;
            case "Total Transaksi":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalTransactions);
                });
                dataToShow.push(current?.totalTransactions);
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
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
            pointColors.push("blue");
        });
        labelsData.push(
            `${new Date(current.startDate).toLocaleDateString("en-US", {
                month: "long",
            })} ${new Date(current.startDate).getFullYear()}`
        );
        pointColors.push("red");

        switch (title) {
            case "Total Pendapatan":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalPendapatan);
                });
                dataToShow.push(current?.totalPendapatan);
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
                });
                break;
            case "Total Transaksi":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalTransactions);
                });
                dataToShow.push(current?.totalTransactions);
                datasets = getLineDatasets({
                    label: title,
                    data: dataToShow,
                    pointBackgroundColor: pointColors,
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
