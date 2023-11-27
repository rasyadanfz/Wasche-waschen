

const TotalHargaCart = ({total_harga}: {total_harga:number}) => {
  return (
    <div className="justify-end border border-black rounded-md p-4 relative duration-100 bg-[#EDEDED] my-[20px] max-w-[300px]">
        <div className="flex">
            <div className="">
                Total Harga : 
            </div>
            <div >
                {total_harga}
            </div>
        </div>
    </div>
  )
}

export default TotalHargaCart;

