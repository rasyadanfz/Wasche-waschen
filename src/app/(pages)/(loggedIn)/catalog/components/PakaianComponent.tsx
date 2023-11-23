import Image from "next/image";
import { Pakaian } from "@prisma/client";
import AddButton from "./AddButton";
import Button from "@/components/Button";

function imageExists(imageUrl: string) {
    var http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
}
  
const PakaianComponent = ({
    pakaian,
    updateCartCount,
    disabledButton,
}: {
    pakaian: Pakaian;
    updateCartCount: (count: number) => void;
    disabledButton: boolean;
}) => {
    const handleDelete = async (id: string) => {
        await fetch(`/api/pakaian?id=${id}`, {
            method: "DELETE",
        });
    };

    return (
        <div className="border flex flex-col justify-between my-5 items-start gap-4 shadow-md">
            <div className="">
                <Image
                    src={imageExists(`/assets/${pakaian.name}.jpg`) ? `/assets/${pakaian.name}.jpg` : `/assets/no_picture.jpg`}
                    alt={pakaian.name}
                    width={144}
                    height={144}
                    className="w-[300px] h-[144px]"
                />
            </div>
            <div className="p-4 w-full">
                <h2 className="font-bold text-2xl">{pakaian.name}</h2>
                <p>
                    Rp{pakaian.price}/{pakaian.unit}
                </p>
            </div>
            <div className="p-4 w-full flex">
                <AddButton
                    updateCartCount={updateCartCount}
                    disabledButton={disabledButton}
                />
                <Button
                    text="Edit"
                    type="warning"
                    // onClick={() => handleUpdate(pakaian.id)}
                />
                <Button
                    text="Delete"
                    type="danger"
                    onClick={() => handleDelete(pakaian.id)}
                />
            </div>
        </div>
    );
};

export default PakaianComponent;
