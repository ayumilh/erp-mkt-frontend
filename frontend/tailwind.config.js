/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  },
  theme: {
    screens: {
      'xs': '377px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        bg:  "#ffffff",
        primaria: {
          900: "#F6F6FB",
          800: "#F4F7FE",
          700: "#C3D3E2",
          200: "#999999",
        },
        segundaria: {
          900: "#624DE3",
          800: "#695DC5",
        },
        colorFont: {
          200: "#4C4C66",
          100: "#2D3748",
        },
        blue: {
          700: "#0C21C1",
          500: "#4285F4",
        },
        bgModal: 'rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        primaria: '0px 5px 80px -10px rgba(0,0,0,0.1)',
        segundaria: '0px 5px 20px rgba(98, 77, 227, 0.2)',
        input: '0px 5px 20px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(180deg, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        'gradient-start': '#624DE3',
        'gradient-end': '#7B66FF',
        'gradient-start-hover': '#7B66FF',
        'gradient-end-hover': '#624DE3',
      },
      borderRadius: {
        '20': '20px',
      },
    },
  },
  plugins: [],
};