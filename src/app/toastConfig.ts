import { DefaultToastOptions } from "react-hot-toast";

export const successToastOptions: DefaultToastOptions = {
    duration: 3000,
    position: "top-right",
    style: {
        background: "#25AAE1",
        color: "#FFFFFF",
    },
    id: "success",
};

export const errorToastOptions: DefaultToastOptions = {
    duration: 4000,
    position: "top-right",
    style: {
        background: "#25AAE1",
        color: "#FFFFFF",
    },
    id: "error",
};

export const successMobileToastOptions: DefaultToastOptions = {
    duration: 3000,
    position: "top-center",
    style: {
        background: "#25AAE1",
        color: "#FFFFFF",
    },
    id: "success",
};

export const errorMobileToastOptions: DefaultToastOptions = {
    duration: 4000,
    position: "top-center",
    style: {
        background: "#25AAE1",
        color: "#FFFFFF",
    },
    id: "error",
};
