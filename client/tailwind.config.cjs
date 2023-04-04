/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#BD4F6C',
                secondary: '#D7816A',
                textPrimary: '#545253',
                textSecondary: '#BCBCBC',
            },
            backgroundImage: {
                divImg: "url('./src/assets/MaskGroup1.png')",
            },
        },
    },
}
