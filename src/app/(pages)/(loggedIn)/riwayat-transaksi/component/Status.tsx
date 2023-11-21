interface StatusProps {
  status: string;
}

export default function Status(props: StatusProps) {
  const status = props.status;
  const color = status === "Done" ? "bg-green-500" : status === "On Progress" ? "bg-yellow-500" : "bg-red-500";

  return (
    <>
      <div className={`absolute top-2 right-2 rounded-md text-black px-2 py-1 ${color}`}>
        <p className="text-sm">{props.status}</p>
      </div>
    </>
  );
}