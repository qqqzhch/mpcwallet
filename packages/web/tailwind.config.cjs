/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,jsx}", 
  "../../packages/ui-components/**/*.{js,ts,jsx,tsx}",
  "./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {},
    container: {
      
      screens: {
        
        "2xl": "1905px",
      },
    }
    
  },
  plugins: [],
}
