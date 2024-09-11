/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Semi Condensed"', "sans-serif"],
        bigShoulders: ['"Big Shoulders Display"', "sans-serif"],
        josefin: ['"Josefin Sans"', "sans-serif"],
        kumbh: ['"Kumbh Sans"', "sans-serif"],
        leagueSpartan: ['"League Spartan"', "sans-serif"],
        lexend: ['"Lexend Deca"', "sans-serif"],
        manrope: ['"Manrope"', "sans-serif"],
        montserrat: ['"Montserrat Subrayada"', "sans-serif"],
        notoSerif: ['"Noto Serif"', "serif"],
        plusJakarta: ['"Plus Jakarta Sans"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
        rubik: ['"Rubik"', "sans-serif"],
        merriweather: ['"Merriweather"', "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
