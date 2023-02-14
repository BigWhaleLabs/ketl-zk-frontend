/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      colors: {
        'night': '#232323',
      }
    }
  }
}
