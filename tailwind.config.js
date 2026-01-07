// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         orange: {
//           50: '#fff7ed',
//           100: '#ffedd5',
//           200: '#fed7aa',
//           300: '#fdba74',
//           400: '#fb923c',
//           500: '#f97316',
//           600: '#ea580c',
//           700: '#c2410c',
//           800: '#9a3412',
//           900: '#7c2d12',
//         }
//       },
//       animation: {
//         'enter': 'enter 0.2s ease-out',
//         'leave': 'leave 0.15s ease-in forwards',
//       },
//       keyframes: {
//         enter: {
//           '0%': { transform: 'scale(0.9)', opacity: 0 },
//           '100%': { transform: 'scale(1)', opacity: 1 },
//         },
//         leave: {
//           '0%': { transform: 'scale(1)', opacity: 1 },
//           '100%': { transform: 'scale(0.9)', opacity: 0 },
//         },
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//   ],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      }
    },
  },
  plugins: [],
}