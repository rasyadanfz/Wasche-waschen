import Button from "@/components/Button"
import FormInput from "@/components/FormInput"
import { errorToastOptions } from "@/toastConfig"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { IoMdClose } from "react-icons/io";

interface Pakaian {
    name: string,
    price: number,
    unit: string,
}

async function getDataPakaian( id: string ) {
    const res = await fetch(`/api/pakaian/?id=${id}`, {
        method: "GET",
    });
    const pakaian = await res.json();
    return pakaian;
}

const UpdateForm = ({ id, closeUpdateForm }: { id: string, closeUpdateForm: () => void }) => {
    const [currData, setCurrData] = useState<Pakaian>({
        name: "",
        price: 0,
        unit: ""
    });

    useEffect(() => {
        getDataPakaian(id).then((pakaian) => {
            setCurrData(pakaian);
        })
    })
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrData({
            ...currData,
            [e.target.id]: Number(e.target.value),
        });
    };

    const handleSave = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currData.price.toString() == "") {
            toast.error("Please enter price");
            return;
        }

        console.log(currData.price);

        const res = await fetch(`/api/pakaian?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price: currData.price
            }),
        })

        if (res.ok) {
            toast.success(`Price of ${currData["name"]} updated!`);
        }
        else {
            toast.error(`Failed to update the price of ${currData["name"]}`);
        }

        closeUpdateForm();
    }

    return (
        <div className="bg-white border border-black-500 rounded-md p-6">
            <div className="error_toast">
                <Toaster toastOptions={errorToastOptions} />
            </div>
            <div className="flex justify-end">
                <button
                    onClick={closeUpdateForm}
                >
                    <IoMdClose />
                </button>
            </div>
            <form 
                action=""
                className="flex flex-col gap-y-3"
                onSubmit={handleSave}
            >
                <FormInput
                    type="text"
                    id="name"
                    text="Nama"
                    placeholder={currData?.["name"] || ""}
                    value={currData?.["name"]}
                ></FormInput>
                <FormInput
                    type="text"
                    id="price"
                    text="Harga"
                    placeholder={currData?.["price"].toString() || ""}
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="text"
                    id="unit"
                    text="Unit"
                    placeholder={currData?.["unit"] || ""}
                    value={currData?.["unit"]}
                ></FormInput>
                <Button
                    text="Update"
                    className="py-2 mt-4 w-full h-full"
                    id="submit"
                />
            </form>
        </div>
    )
}

export default UpdateForm