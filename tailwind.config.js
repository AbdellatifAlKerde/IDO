/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-gradient":
          "linear-gradient(180deg, rgba(133,86,164,1) 0%, rgba(45,43,82,1) 100%)",
      },
      colors: {
        overlay: "rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};
