import { Pakaian } from "@prisma/client";

const Pagination = ({ filteredData, currentPage, itemsPerPage, onHandlePage }: { filteredData: Pakaian[], currentPage: number, itemsPerPage: number, onHandlePage: (pageNumber: number) => void }) => {
  const paginate = (pageNumber: number) => onHandlePage(pageNumber);
  return (
    <div className="flex justify-center mt-5 gap-4 mb-5 ">
      {Array(Math.ceil(filteredData.length / itemsPerPage))
        .fill(null)
        .map((_, i) => (
          <button
            className={`border-black border px-2 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            key={i}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
    </div>

  )
}

export default Pagination