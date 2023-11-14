"use client";

import { use, useEffect, useState } from "react";
import StatusDetailTransaksi from "./components/StatusDetailTransaksi";
import SuccessMessage from "./components/SuccessMessage";

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
}

export default function DetailTransaksiPage(props: DetailTransaksiPageProps) {
  const { id } = props.params;
  const [data, setData] = useState<Transaksi>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modified, setModified] = useState(false); // New state for tracking status modification
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/transaksi?id=${id}`, {
          method: "GET",
        });

        if (response.status === 404) {
          setError("Tidak ada transaksi");
        } else {
          const result = await response.json();
          setData(result);
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


  const closeSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const handleStatusChange = (newStatus: string) => {
    setData((prevData: Transaksi | undefined) => ({
      ...prevData!,
      status: newStatus,
    }));
    setModified(true);
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

        // Reset the modified state after successful save
        setModified(false);

        setSuccessMessage("Berhasil mengubah status pesanan");
      } catch (error) {
        console.error("Error updating data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    }
  };

  return (
    <>
      <div>
      {successMessage && (
        <SuccessMessage message={successMessage} onClose={closeSuccessMessage} />
      )}
        <div className="w-full mb-[50px]">
          <div className="container mx-auto">
            <h1 className="font-bold text-3xl mt-[100px] mb-16">
              Detail Transaksi
            </h1>
            {loading ? (
              <p className="animate-pulse font-semibold">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    {data?.orderlines && data.orderlines.length > 0 ? (
                      <>
                        {/* Display the list of items here */}
                        <div className="flex flex-row gap-10 mb-4 justify-between">
                          <h2 className="text-2xl font-semibold underline">
                            {data?.nama}
                          </h2>
                          <StatusDetailTransaksi
                            status={data?.status}
                            onChange={handleStatusChange} // Pass the status change handler
                          />
                        </div>
                        <p>
                          <span className="font-semibold">Kode Transaksi:</span>{" "}
                          {data?.id}
                        </p>
                        <p>
                          <span className="font-semibold">Tanggal:</span>{" "}
                          {data?.tanggal}
                        </p>
                        <p>
                          <span className="font-semibold">Nama Customer:</span>{" "}
                          {data?.nama_customer}
                        </p>
                        <p>
                          <span className="font-semibold">Daftar Pakaian:</span>
                        </p>
                        <ul className="flex flex-col gap-2">
                          {data.orderlines.map((item) => (
                            <li key={item.id}>
                              - {`${item.nama_pakaian} (${item.kuantitas}x)`}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={handleSave}
                          disabled={!modified} // Disable the button if not modified
                          className={`bg-blue-500 text-white px-4 py-2 rounded-full mt-12 ${
                            modified
                              ? "cursor-pointer hover:bg-blue-600"
                              : "cursor-not-allowed opacity-50"
                          } `}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <p className="text-red-500">Tidak ada transaksi</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

