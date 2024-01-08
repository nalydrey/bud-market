/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "orange-primary": "#F05A00",
                "orange-secondary": "#FC573B",
                "gray-primary": "#DEDBDB",
                "gray-secondary": "#DEDBDB",
                "gray-medium": "#3B3B3B",
                "gray-dark": "#212526",
                "gray-white": "#F2F5F7",
            },
            gridTemplateColumns: {
                fill: "repeat(auto-fill, minmax(max-content, 200px))",
                fit: "repeat(auto-fit, minmax(max-content, 200px))",
            },
            fontFamily: {
                prosto: ["Prosto One", "sans-serif"],
                raleway: ["Raleway", "sans-serif"],
                sans: ["Raleway", ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
