import { Bar } from "react-chartjs-2";
import { ReportClothesData } from "./JenisPakaianTable";
import seedrandom from "seedrandom";

export interface BarChartProps {
    data: ReportClothesData[][];
    labelsData: string[];
    title: string;
}

const BarChart = ({ data, labelsData, title }: BarChartProps) => {
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

    let clothesNameList = new Set<string>();
    for (const dayData of data) {
        for (const pakaianData of dayData) {
            clothesNameList.add(pakaianData.name);
        }
    }

    let clothesMap = new Map<string, number[]>();
    for (const clothesName of clothesNameList) {
        clothesMap.set(clothesName, []);
    }

    let currLength = 1;
    for (const dayData of data) {
        // Push existing items & add 0 for each item that doesnt exist
        for (const individualItem of dayData) {
            clothesMap.get(individualItem.name)?.push(individualItem.quantity);
        }

        for (const clothesName of clothesNameList) {
            const qtyArray = clothesMap.get(clothesName);
            if (qtyArray?.length !== currLength) {
                qtyArray?.push(0);
            }
        }

        currLength++;
    }

    let datasets: { label: string; data: number[]; backgroundColor: string }[] =
        [];
    const random = seedrandom("42");
    for (const clothes of clothesMap) {
        const firstNum = Math.floor(random() * 255);
        const secondNum = Math.floor(random() * 255);
        const LastNum = Math.floor(random() * 255);
        const color = `rgba(${firstNum}, ${secondNum}, ${LastNum}, 0.7)`;
        let data = {
            label: clothes[0],
            data: clothes[1],
            backgroundColor: color,
        };
        datasets.unshift(data);
    }

    const finalData = {
        labels: labelsData,
        datasets: datasets,
    };

    return (
        <div>
            <Bar data={finalData} options={options} width={400} height={300} />
        </div>
    );
};

export default BarChart;
