"use client";

import { useEffect, useState } from "react";
import SingleRow from "./SingleRow";
import TableHeader from "./TableHeader";

export interface ReportClothesData {
    name: string;
    price: number;
    quantity: number;
}

const JenisPakaianTable = ({
    clothesData,
}: {
    clothesData: ReportClothesData[];
}) => {
    return (
        <div>
            <div className="flex flex-col">
                <TableHeader />
                {clothesData.length === 0 && (
                    <div className="self-center mt-6 font-raleway font-bold">
                        No Data for Today
                    </div>
                )}
            </div>
            {clothesData.map((item) => {
                return (
                    <SingleRow
                        key={item.name}
                        nama={item.name}
                        harga={item.price}
                        jumlah={item.quantity}
                    />
                );
            })}
        </div>
    );
};

export default JenisPakaianTable;
