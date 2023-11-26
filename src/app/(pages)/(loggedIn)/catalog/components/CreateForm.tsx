import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { errorToastOptions } from "@/toastConfig";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { ChangeablePakaianData } from "./UpdateForm";

const CreateForm = ({ closeCreateForm }: { closeCreateForm: () => void }) => {
    const [currData, setCurrData] = useState<ChangeablePakaianData>({
        name: "",
        price: 0,
        unit: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrData({
            ...currData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currData.name === "") {
            toast.error("Please enter the name");
            return;
        }

        if (currData.price.toString() === "") {
            toast.error("Please enter the price");
            return;
        }

        if (currData.unit === "") {
            toast.error("Please enter the unit");
            return;
        }

        currData.price = Number(currData.price);

        const res = await fetch("/api/pakaian", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currData),
        });

        if (res.ok) {
            toast.success(`${currData.name} created!`);
        } else {
            toast.error(`Failed to create ${currData.name}`);
        }

        closeCreateForm();
        window.location.reload();
    };

    return (
        <div className="bg-white border border-black-500 rounded-md p-6 shadow-xl">
            <div className="error_toast">
                <Toaster toastOptions={errorToastOptions} />
            </div>
            <div className="flex justify-between mb-4">
                <div className="text-h6 font-bold font-raleway">
                    New Pakaian
                </div>
                <div className="flex justify-end">
                    <button onClick={closeCreateForm}>
                        <IoMdClose />
                    </button>
                </div>
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
                    placeholder="Enter the name"
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="text"
                    id="price"
                    text="Harga"
                    placeholder="Enter the price"
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="text"
                    id="unit"
                    text="Unit"
                    placeholder="Enter the unit"
                    onChange={handleInputChange}
                ></FormInput>
                <Button
                    text="Create"
                    className="py-2 mt-4 w-full h-full"
                    id="submit"
                />
            </form>
        </div>
    );
};

export default CreateForm;
