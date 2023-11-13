import { useState } from "react";

interface StatusDetailTransaksiProps {
  status?: string;
  onChange: (newStatus: string) => void; // Add onChange to the interface
}

export default function StatusDetailTransaksi(
  props: StatusDetailTransaksiProps
) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    props.status || "Not Confirmed"
  );

  const statusOptions = ["Not Confirmed", "On Progress", "Done"];
  const color =
    selectedStatus === "Done"
      ? "bg-green-500"
      : selectedStatus === "On Progress"
      ? "bg-yellow-500"
      : "bg-red-500";

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedStatus(event.target.value);

    // Call the onChange prop with the new status
    props.onChange(event.target.value);
  };

  return (
    <>
      <div>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className={`border border-black rounded-full py-1 ${color} text-center w-[300px]`}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status} className="bg-white text-center">
              {status}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
