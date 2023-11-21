interface RowData {
    nama: string;
    harga: number;
    jumlah: number;
}

const SingleRow = ({ nama, harga, jumlah }: RowData) => {
    return (
        <div className="grid grid-cols-3 py-2 border-l-2 border-r-2 border-b-2 text-center">
            <div>{nama}</div>
            <div>{harga}</div>
            <div>{jumlah}</div>
        </div>
    );
};

export default SingleRow;
