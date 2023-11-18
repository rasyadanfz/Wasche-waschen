import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        colors: {
            primary: {
                50: "#E1F5FE",
                100: "#B3E5FC",
                200: "#81D3FA",
                300: "#4FC2F7",
                400: "#29B5F6",
                500: "#05A8F4",
                600: "#069AE5",
                700: "#0587D1",
                800: "#0576BD",
                900: "#04569B",
            },
            secondary: {
                50: "#F0E7FE",
                100: "#D7C4FC",
                200: "#BB9CFB",
                300: "#9E72FA",
                400: "#854FF9",
                500: "#6A29EF",
                600: "#5D24EF",
                700: "#491AE7",
                800: "#3012E2",
                900: "#0000DB",
            },
            tertiary: {
                50: "#fce0f3",
                100: "#f7b1e1",
                200: "#f57acc",
                300: "#f629b5",
                400: "#f900a0",
                500: "#f80085",
                600: "#e60081",
                700: "#ce007c",
                800: "#b60077",
                900: "#8a0070",
            },
            black: "#000000",
            white: "#FFFFFF",
            danger: {
                300: "#E0434D",
                400: "#E5000E",
            },
            success: {
                300: "#4Df05D",
                400: "#0CF023",
            },
            warning: {
                300: "#FFD454",
                400: "#FFBF00",
            },
        },
        fontFamily: {
            raleway: ["var(--font-raleway)"],
            poppins: ["var(--font-poppins)"],
            itim: ["var(--font-itim)"],
        },
        fontSize: {
            h1: "3.815rem",
            h2: "3.052rem",
            h3: "2.441rem",
            h4: "1.953rem",
            h5: "1.563rem",
            h6: "1.25rem",
            body: "1rem",
            subtitle: "0.875rem",
            button: "1rem",
            caption: "0.8rem",
        },
    },
    plugins: [],
};
export default config;
