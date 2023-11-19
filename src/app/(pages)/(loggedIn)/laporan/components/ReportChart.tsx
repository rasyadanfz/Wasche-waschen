import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { LaporanDataProps } from "../page";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    data: LaporanDataProps;
    periodType: string;
    type: "totalPendapatan" | "totalTransaksi" | "jenisPakaian";
}

const ReportChart = ({ data, periodType, type }: ChartProps) => {
    const { current, past } = data;
    console.log(current);
    console.log(past);
    if (periodType === "harian") {
        let dataToShow = [];
        let labelsData = [];
        let pointColors = [];
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
        let title: string;
        title =
            type === "totalPendapatan"
                ? "Total Pendapatan"
                : type === "totalTransaksi"
                ? "Total Transaksi"
                : "Jenis Pakaian";

        switch (title) {
            case "Total Pendapatan":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalPendapatan);
                });
                dataToShow.push(current?.totalPendapatan);
                break;
            case "Total Transaksi":
                past?.forEach((item) => {
                    dataToShow.unshift(item.totalTransactions);
                });
                dataToShow.push(current?.totalTransactions);
                break;
            case "Jenis Pakaian":
                past?.forEach((item) => {
                    dataToShow.unshift(item.clothesReport);
                });
                dataToShow.push(current?.clothesReport);
                break;
        }

        const data = {
            labels: labelsData,
            datasets: [
                {
                    label: title,
                    data: dataToShow,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                    pointBackgroundColor: pointColors,
                    pointBorderColor: "rgba(133, 79, 249, 1)",
                },
            ],
        };

        const options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    position: "top" as const,
                },
                title: {
                    display: true,
                    text: title,
                },
            },
        };

        return (
            <div>
                <Line data={data} options={options} />
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default ReportChart;
