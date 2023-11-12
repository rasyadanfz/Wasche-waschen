import { useState } from "react";

interface StatusDetailTransaksiProps {
  status: string;
}

export default function StatusDetailTransaksi(
  props: StatusDetailTransaksiProps
) {
  const [selectedStatus, setSelectedStatus] = useState<string>(props.status);

  const statusOptions = ["Not Confirmed", "On Progress", "Done"];
  const color = selectedStatus === "Done" ? "bg-green-500" : selectedStatus === "On Progress" ? "bg-yellow-500" : "bg-red-500";


  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <div>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className={`border border-black rounded-full px-2 py-1 ${color}`}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status} className="bg-white">
              {status}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
