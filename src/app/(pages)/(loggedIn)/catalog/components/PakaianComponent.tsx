"use client";

import Image from "next/image";
import { ExistingPakaian } from "@prisma/client";
import AddButton from "./AddButton";
import Button from "@/components/Button";
import UpdateForm from "./UpdateForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

function imageExists(imageUrl: string) {
    var http = new XMLHttpRequest();
    http.open("HEAD", imageUrl, false);
    http.send();
    return http.status !== 404;
}

const PakaianComponent = ({
    pakaian,
    updateCartCount,
    updatePakaianInCart,
    disabledButton,
    admin,
}: {
    pakaian: ExistingPakaian;
    updateCartCount: (count: number) => void;
    updatePakaianInCart: (pakaianName: string, pakaianCount: number) => void;
    disabledButton: boolean;
    admin: boolean;
}) => {
    const [isImageExists, setisImageExists] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [isConfirmDeleteFormVisible, setIsConfirmDeleteFormVisible] =
        useState(false);

    useEffect(() => {
        checkImageExists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeUpdateForm = () => {
        setIsUpdateFormVisible(false);
    };

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/pakaian?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            toast.success("Successfully deleted pakaian");
        } else {
            toast.error("Failed to delete pakaian");
        }

        window.location.reload();
    };

    const checkImageExists = () => {
        const status = imageExists(`/assets/${pakaian.name}.jpg`);
        if (status === false) {
            setisImageExists(false);
        } else {
            setisImageExists(true);
        }
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <div
                className={`border flex flex-col justify-between my-5 items-start gap-4 shadow-md transition-transform ${
                    isHovered ? "hover:scale-110" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="">
                    <Image
                        src={
                            isImageExists
                                ? `/assets/${pakaian.name}.jpg`
                                : `/assets/no_picture.jpg`
                        }
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
                        pakaian={pakaian}
                        updateCartCount={updateCartCount}
                        updatePakaianInCart={updatePakaianInCart}
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
                            onClick={() => setIsConfirmDeleteFormVisible(true)}
                        />
                    </div>
                )}
            </div>

            {isUpdateFormVisible && (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <UpdateForm
                        id={pakaian.pakaianId}
                        closeUpdateForm={closeUpdateForm}
                    />
                </div>
            )}

            {isConfirmDeleteFormVisible && (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="bg-white p-4 rounded shadow-md">
                        <div className="flex justify-end">
                            <button
                                onClick={() =>
                                    setIsConfirmDeleteFormVisible(false)
                                }
                            >
                                <IoMdClose />
                            </button>
                        </div>
                        <div className="text-xl font-bold mb-4">
                            Delete Confirmation
                        </div>
                        <div className="border-t border-gray-300 mb-5"></div>
                        <div className="bg-red-200 p-4 rounded shadow-md mb-8">
                            Are you sure you want to delete this item?
                        </div>
                        <div className="border-t border-gray-300 mb-5"></div>
                        <div className="flex justify-end gap-2">
                            <Button
                                text="Cancel"
                                type="secondary"
                                onClick={() =>
                                    setIsConfirmDeleteFormVisible(false)
                                }
                            />
                            <Button
                                text="Delete"
                                type="danger"
                                onClick={() => handleDelete(pakaian.id)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PakaianComponent;
