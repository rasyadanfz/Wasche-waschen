// FilterTransaksi.tsx
import { useState } from "react";
import Button from "@/components/Button";

interface FilterTransaksiProps {
  statusFilters: {
    done: boolean;
    onProgress: boolean;
    notConfirmed: boolean;
  };
  startDate: string;
  endDate: string;
  setStatusFilters: React.Dispatch<
    React.SetStateAction<{
      done: boolean;
      onProgress: boolean;
      notConfirmed: boolean;
    }>
  >;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const FilterTransaksi: React.FC<FilterTransaksiProps> = ({
  statusFilters,
  startDate,
  endDate,
  setStatusFilters,
  setStartDate,
  setEndDate,
  handleSearch,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleApplyFilter = () => {
    // Logic for applying filter
    handleSearch();
    toggleFilter();
  };

  const handleClearFilter = () => {
    // Logic for clearing filter
    setStatusFilters({
      done: false,
      onProgress: false,
      notConfirmed: false,
    });
    setStartDate("");
    setEndDate("");
    handleSearch();
    toggleFilter();
  };

  return (
    <div className="relative">
      <div
        id="filterBtn"
        onClick={toggleFilter}
        className="font-semibold hover:cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center h-14 border border-black hover:bg-primary-300 bg-primary-400"
      >
        Filter
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </div>
      {isFilterOpen && (
        <div
          id="filterPopUp"
          className="absolute bg-white border rounded-md shadow-md mt-3 flex flex-col pt-1 z-[5] -translate-x-[50%] px-2"
        >
          <div className="m-3">
            <h2 className="font-semibold mb-2">Status Transaksi</h2>
            <div className="flex flex-col gap-1">
              <div className="flex w-56 gap-x-2  leading-5 items-center">
                <input
                  type="checkbox"
                  id="done"
                  checked={statusFilters.done}
                  onChange={() =>
                    setStatusFilters((prevFilters) => ({
                      ...prevFilters,
                      done: !prevFilters.done,
                    }))
                  }
                />
                <label htmlFor="done">Done</label>
              </div>
              <div className="flex w-56 gap-x-2 leading-5 items-center">
                <input
                  type="checkbox"
                  id="onProgress"
                  checked={statusFilters.onProgress}
                  onChange={() =>
                    setStatusFilters((prevFilters) => ({
                      ...prevFilters,
                      onProgress: !prevFilters.onProgress,
                    }))
                  }
                />
                <label htmlFor="onProgress">On Progress</label>
              </div>
              <div className="flex w-56 gap-x-2  leading-5 items-center">
                <input
                  type="checkbox"
                  id="notConfirmed"
                  checked={statusFilters.notConfirmed}
                  onChange={() =>
                    setStatusFilters((prevFilters) => ({
                      ...prevFilters,
                      notConfirmed: !prevFilters.notConfirmed,
                    }))
                  }
                />
                <label htmlFor="notConfirmed">Not Confirmed</label>
              </div>
            </div>
          </div>
          <div className="m-3">
            <h2 className="font-semibold mb-2">Tanggal Transaksi</h2>
            <div className="flex flex-col w-[80%] gap-2">
              <div>
                <p>Start Date</p>
                <input
                  id="startDate"
                  type="date"
                  className="border border-black rounded-md px-2 py-1"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <p>End Date</p>
                <input
                  id="endDate"
                  type="date"
                  className="border border-black rounded-md px-2 py-1"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="m-3 flex flex-col items-center gap-1">
            <div className="">
              <Button
                id="applyFilterBtn"
                onClick={handleApplyFilter}
                text="Apply Filter(s)"
                className="w-[150px] inline-flex items-center justify-center px-4 py-2 bg-primary-400 text-white rounded-md"
              />
            </div>
            <div>
              <Button
                onClick={handleClearFilter}
                text="Clear Filter(s)"
                className="w-[150px] inline-flex items-center justify-center px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTransaksi;
