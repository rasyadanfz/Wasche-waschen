import { Line } from "react-chartjs-2";

export interface LineDataset {
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    tension?: number;
    pointBackgroundColor: string[];
    pointBorderColor?: string;
    color?: string;
    fillColor?: string;
}

const LineChart = ({
    title,
    datasets,
    labelsData,
}: {
    title: string;
    datasets: LineDataset[];
    labelsData: string[];
}) => {
    const data = () => {
        return {
            labels: labelsData,
            datasets: datasets,
        };
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        minWidth: 400,
        minHeight: 300,
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

    return <Line data={data()} options={options} width={400} height={300} />;
};

export default LineChart;
