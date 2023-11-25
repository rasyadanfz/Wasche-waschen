import Button from "@/components/Button";
import Image from "next/image";

const AddToCart = ({
    pakaianInCart,
    onClick,
}: {
    pakaianInCart: { [pakaianName: string]: number }[];
    onClick: () => void;
}) => {
    return (
        <div
            id="add_to_cart"
            className="fixed flex items-center bottom-8 left-[50%] translate-x-[-50%]"
            onClick={onClick}
        >
            <Button
                text="Add to Cart"
                className="shadow-lg w-[300px] h-[40px]"
                type="secondary"
            />
            {/* Cart icon */}
            <Image
                src="/icons/cart-white.svg"
                width={20}
                height={21}
                alt={"Cart"}
                className="translate-x-[-200%]"
            />
        </div>
    );
};

export default AddToCart;
