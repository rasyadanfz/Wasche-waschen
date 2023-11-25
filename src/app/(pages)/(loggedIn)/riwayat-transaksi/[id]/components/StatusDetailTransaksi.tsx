import { useState } from "react";

interface StatusDetailTransaksiProps {
  status?: string;
  onChange: (newStatus: string) => void; // Add onChange to the interface
}

export default function StatusDetailTransaksi(
  props: StatusDetailTransaksiProps
) {
  const [status, setStatus] = useState<string>(
    props.status || "Not Confirmed"
  );

  const color =
    status === "Done"
      ? "bg-green-500"
      : status === "On Progress"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="status" className="font-semibold">Status : </label>
        <div
          id="status"
          className={`border border-black rounded-md py-1 ${color} text-center md:w-[300px] w-full`}
        >
          {status}
        </div>
      </div>
    </>
  );
}
