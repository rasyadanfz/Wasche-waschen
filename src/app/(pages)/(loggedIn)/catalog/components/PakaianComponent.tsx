"use client"

import Image from "next/image";
import { ExistingPakaian } from "@prisma/client";
import AddButton from "./AddButton";
import Button from "@/components/Button";
import UpdateForm from "./UpdateForm";
import { useState } from "react";

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
    admin,
}: {
    pakaian: ExistingPakaian;
    updateCartCount: (count: number) => void;
    disabledButton: boolean;
    admin: boolean;
}) => {
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

    const closeUpdateForm = () => {
        setIsUpdateFormVisible(false);
    }

    const handleDelete = async (id: string) => {
        await fetch(`/api/pakaian?id=${id}`, {
            method: "DELETE",
        });
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <div
                className={`border flex flex-col justify-between my-5 items-start gap-4 shadow-md transition-transform transform-gpu ${isHovered ? "hover:scale-110" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >            
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
                {!admin ? (
                    <AddButton
                        updateCartCount={updateCartCount}
                        disabledButton={disabledButton}
                    />
                ) : (
                    <div className="p-4 w-full flex gap-2">
                        <Button
                            text="Edit"
                            type="warning"
                            onClick={() => setIsUpdateFormVisible(true)}
                        />
                        <Button
                            text="Delete"
                            type="danger"
                            onClick={() => handleDelete(pakaian.id)}
                        />
                    </div>
                )}
            </div>

            {isUpdateFormVisible && (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <UpdateForm id={pakaian.pakaianId} closeUpdateForm={closeUpdateForm}/>
                </div>
            )}
        </div>
    );
};

export default PakaianComponent;
