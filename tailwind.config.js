/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        sirp: {
          // primary: '#4582C4',
          // primaryLess1: '#B2CBE6',
          // primaryLess2: '#E8F8FD',
          // secondary: '#ffee88',
          // lightGrey: '#F3F5F6',
          // grey: '#545C62',
          // greyShadow: '#F7E9EB',
          // secondary1: '#FFEE88',
          // secondary2: '#F9F9F9',
          // dashbordb: '#DFCF6D',
          // dashbordb3: '#D17D86',
          // dashbordb3a: '#B22735',
          // dashbordb1: '#E8EAEC',
          // primary1: '#4AC7ED'
          primary: '#4582C4',

          primaryLess2: '#E8F8FD',

          secondary: '#ffee88',

          lightGrey: '#F3F5F6',

          greyShadow: '#F7E9EB',

          secondary1: '#FFEE88',

          secondary2: '#F9F9F9',

          dashbordb: '#DFCF6D',

          dashbordb3: '#D17D86',

          dashbordb1: '#E8EAEC',

          primary1: '#4AC7ED',

          primaryBlue: '#1293BA',

          primaryLess1: '#B2CBE6',

          grey: '#545C62',

          grey1: '#383E42',

          dashbordb3a: '#B22735',

          dashboardcola: '#4AC7ED',

          keynotebg: '#A2E2F6',

          hoverbg: '#D1F1FA',

          counterbg: '#ECF2F9',

          listBg: '#F9FBFE'
        }
      },
      screens: {
        xs: '480px',
        ss: '620px',
        sm: '768px',
        md: '1060px',
        lg: '1200px',
        xl: '1700px'
      }
    }
  },
  plugins: []
};
