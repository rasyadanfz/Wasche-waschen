import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { errorToastOptions } from "@/toastConfig";

interface PaginationProps {
    filteredData: any[]; // Adjust the type according to your data structure
    itemsPerPage: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    filteredData,
    itemsPerPage,
    currentPage,
    paginate,
}) => {
    const [inputPage, setInputPage] = useState("");

    const pageNumbers = Array(Math.ceil(filteredData.length / itemsPerPage))
        .fill(null)
        .map((_, i) => i + 1);

    const handleGoToPage = () => {
        const pageNumber = parseInt(inputPage, 10);

        if (
            !isNaN(pageNumber) &&
            pageNumber >= 1 &&
            pageNumber <= pageNumbers.length
        ) {
            paginate(pageNumber);
        } else if (isNaN(pageNumber) || pageNumber < 1) {
            toast.error("Nomor halaman tidak valid!", errorToastOptions);
        } else {
            toast.error("Nomor halaman tidak ditemukan!", errorToastOptions);
        }

        setInputPage(""); // Clear the input field after navigating to the page
    };

    const renderPaginationButtons = () => {
        const maxButtonsToShow = 5;

        if (pageNumbers.length <= maxButtonsToShow) {
            return pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`border border-gray-500 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
                        currentPage === number
                            ? "bg-primary-500 text-white"
                            : "hover:bg-gray-200"
                    }`}
                    onClick={() => paginate(number)}
                >
                    {number}
                </button>
            ));
        } else {
            const slicedPageNumbers = pageNumbers.slice(
                Math.max(0, currentPage - 3),
                Math.min(currentPage + 2, pageNumbers.length)
            );

            return (
                <div className="flex gap-x-3 flex-wrap justify-center gap-y-2">
                    {currentPage > 1 && (
                        <>
                            <button
                                className="border border-gray-500 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none hover:bg-gray-200"
                                onClick={() => paginate(1)}
                            >
                                {"<<"}
                            </button>
                            <button
                                className="border border-gray-500 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none hover:bg-gray-200"
                                onClick={() => paginate(currentPage - 1)}
                            >
                                {"<"}
                            </button>
                        </>
                    )}

                    {slicedPageNumbers.map((number) => (
                        <button
                            key={number}
                            className={`border border-gray-500 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
                                currentPage === number
                                    ? "bg-primary-500 text-white"
                                    : "hover:bg-gray-200"
                            }`}
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    ))}

                    {currentPage < pageNumbers.length && (
                        <>
                            <button
                                className="border border-gray-500 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none hover:bg-gray-200"
                                onClick={() => paginate(currentPage + 1)}
                            >
                                {">"}
                            </button>
                            <button
                                className="border border-gray-500 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none hover:bg-gray-200"
                                onClick={() => paginate(pageNumbers.length)}
                            >
                                {">>"}
                            </button>
                        </>
                    )}
                </div>
            );
        }
    };

    return (
        <div id="pagination">
            <div className="error_toast">
                <Toaster
                    position="top-right"
                    toastOptions={errorToastOptions}
                />
            </div>
            <div className="flex flex-col justify-center mt-5 gap-4 mb-5 items-center">
                {renderPaginationButtons()}
                {/* Input for entering the page number */}
                <div className="flex gap-x-3 items-center mt-2">
                    <input
                        id="inputPage"
                        type="number"
                        value={inputPage}
                        onChange={(e) => setInputPage(e.target.value)}
                        className="border border-gray-500 px-3 py-2 rounded-md transition-colors duration-300 ease-in-out focus:outline-none text-center w-20"
                    />
                    of {pageNumbers.length}
                    <button
                        id="goToPageBtn"
                        className="border border-gray-500 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none hover:bg-gray-200"
                        onClick={handleGoToPage}
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
