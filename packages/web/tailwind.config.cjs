/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,jsx}", 
  "../../packages/ui-components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      
      screens: {
        
        "2xl": "1905px",
      },
    }
    
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
