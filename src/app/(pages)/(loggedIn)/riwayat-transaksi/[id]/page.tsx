"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { errorToastOptions } from "@/toastConfig";

import StatusDetailTransaksi from "./components/StatusDetailTransaksi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type DetailTransaksiPageProps = {
    params: {
        id: string;
    };
};

interface Transaksi {
    id: string;
    nama: string;
    tanggal: string;
    status: string;
    total_harga: Number;
    userId: string;
    nama_customer: string;
    orderlines: Orderline[];
}

interface Orderline {
    id: string;
    kuantitas: number;
    total_harga: number;
    pakaianId: string;
    nama_pakaian: string;
    harga_pakaian: number;
    unit_pakaian: string;
}

export default function DetailTransaksiPage(props: DetailTransaksiPageProps) {
    const { id } = props.params;
    const [data, setData] = useState<Transaksi>();
    const [initialStatus, setInitialStatus] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modified, setModified] = useState(false); // New state for tracking status modification

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/transaksi?id=${id}`, {
                    method: "GET",
                });

                if (response.status === 404) {
                    setError("Transaksi tidak ditemukan");
                } else {
                    const result = await response.json();
                    setData(result);
                    setInitialStatus(result.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleStatusChange = (newStatus: string) => {
        setData((prevData: Transaksi | undefined) => ({
            ...prevData!,
            status: newStatus,
        }));
        setModified(newStatus !== initialStatus);
    };

    const handleSave = async () => {
        // Only perform save if the status has been modified
        if (modified) {
            try {
                // Perform the PUT request to update the status in the database
                await fetch(`/api/transaksi?id=${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: data?.status }),
                });

                setModified(false);

                toast.success("Status berhasil diubah");
            } catch (error) {
                console.error("Error updating status:", error);
                toast.error("Gagal mengubah status");
            }
        }
    };

    return (
        <div id="detail-transaksi">
            <div className="error_toast">
                <Toaster
                    position="top-right"
                    toastOptions={errorToastOptions}
                />
            </div>
            <div>
                <div className="w-full">
                    <div className="container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
                        <h1 className="font-bold text-h3 mt-[100px] mb-10">
                            Detail Transaksi
                        </h1>
                        {loading ? (
                            <p className="animate-pulse font-semibold">
                                Loading...
                            </p>
                        ) : error ? (
                            <p className="text-danger-400">{error}</p>
                        ) : (
                            <>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        {data?.orderlines &&
                                        data.orderlines.length > 0 ? (
                                            <>
                                                {/* Display the list of items here */}
                                                <div className="flex flex-col gap-2 lg:flex-row justify-between">
                                                    <div className="flex flex-row gap-4">
                                                        <div className="flex flex-col font-semibold gap-2">
                                                            <p>ID Transasksi</p>
                                                            <p>
                                                                Nama Transaksi
                                                            </p>
                                                            <p>Tanggal</p>
                                                        </div>
                                                        <div className="flex flex-col font-semibold ml-4 gap-2">
                                                            <p>:</p>
                                                            <p>:</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <p>{data?.id}</p>
                                                            <p>{data?.nama}</p>
                                                            <p>
                                                                {data?.tanggal}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <StatusDetailTransaksi
                                                        status={data?.status}
                                                        onChange={
                                                            handleStatusChange
                                                        } // Pass the status change handler
                                                    />
                                                </div>

                                                <div className="my-10">
                                                    {/* Buat tabel yang memiliki header Item, harga/unit, kuantitas, subtotal*/}
                                                    <table className="min-w-full bg-[#EDEDED] rounded-md">
                                                        <thead>
                                                            <tr>
                                                                <th className="border border-black text-center py-2 text-h6">
                                                                    No.
                                                                </th>
                                                                <th className="border border-black text-center py-2 text-h6">
                                                                    Item
                                                                </th>
                                                                <th className="border border-black text-center py-2 text-h6">
                                                                    Harga/Unit
                                                                </th>
                                                                <th className="border border-black text-center py-2 text-h6">
                                                                    Kuantitas
                                                                </th>
                                                                <th className="border border-black text-center py-2 text-h6">
                                                                    Subtotal
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data?.orderlines.map(
                                                                (
                                                                    orderline,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            orderline.id
                                                                        }
                                                                    >
                                                                        <td className="border border-black text-center py-2 text-h6">
                                                                            {index +
                                                                                1}
                                                                        </td>
                                                                        <td className="border border-black text-center py-2 text-h6">
                                                                            {
                                                                                orderline.nama_pakaian
                                                                            }
                                                                        </td>
                                                                        <td className="border border-black text-center py-2 text-h6">
                                                                            Rp.{" "}
                                                                            {orderline.harga_pakaian.toLocaleString()}
                                                                            /
                                                                            {
                                                                                orderline.unit_pakaian
                                                                            }
                                                                        </td>
                                                                        <td className="border border-black text-center py-2 text-h6">
                                                                            {
                                                                                orderline.kuantitas
                                                                            }{" "}
                                                                        </td>
                                                                        <td className="border border-black text-center py-2 text-h6">
                                                                            Rp.{" "}
                                                                            {orderline.total_harga.toLocaleString()}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="flex flex-row justify-between">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="font-bold text-body">
                                                            Total Harga :
                                                        </div>
                                                        <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-96">
                                                            <div className="font-bold text-h6">
                                                                Rp.{" "}
                                                                {data?.total_harga.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-red-500">
                                                Tidak ada transaksi
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
