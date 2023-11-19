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
            <TableHeader />
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
