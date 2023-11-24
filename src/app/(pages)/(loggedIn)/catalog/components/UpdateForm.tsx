import Button from "@/components/Button"
import FormInput from "@/components/FormInput"
import { errorToastOptions } from "@/toastConfig"
import { useState } from "react"
import { Toaster } from "react-hot-toast"

const UpdateForm = async({ id }: { id: string }) => {
    return (
        <div></div>
    )
    // const res = await fetch(`/api/pakaian/?id=${id}`, {
    //     method: "GET",
    // });
    // const pakaian = await res.json();

    // const [currData, setCurrData] = useState(pakaian);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setCurrData({
    //         ...currData,
    //         [e.target.id]: e.target.value,
    //     });
    // };

    // return (
    //     <div>
    //         <div className="error_toast">
    //             <Toaster toastOptions={errorToastOptions} />
    //         </div>
    //         <form 
    //             action=""
    //             className="flex flex-col gap-y-3"
    //             // onSubmit={onFormSubmit}
    //         >
    //             <FormInput
    //                 type="text"
    //                 id="name"
    //                 text="Nama"
    //                 placeholder={pakaian.name}
    //                 onChange={handleInputChange}
    //             ></FormInput>
    //             <FormInput
    //                 type="text"
    //                 id="price"
    //                 text="Harga"
    //                 placeholder={pakaian.price}
    //                 onChange={handleInputChange}
    //             ></FormInput>
    //             <FormInput
    //                 type="text"
    //                 id="unit"
    //                 text="Unit"
    //                 placeholder={pakaian.unit}
    //                 onChange={handleInputChange}
    //             ></FormInput>
    //             <Button
    //                 text="Update"
    //                 className="py-2 mt-4 w-full h-full"
    //                 id="submit"
    //             />
    //         </form>
    //     </div>
    // )
}

export default UpdateForm