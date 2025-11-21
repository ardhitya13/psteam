/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/lib/**/*.js',
  ],
  theme: {
    extend: {
      // 🎨 CUSTOM COLORS
      colors: {
        primary: '#0A2A66',     // Biru tua Polibatam
        secondary: '#153E90',   // Biru terang elegan
        lightgray: '#E8E8E8',
        dark: '#1C1C1C',
      },

      // ✨ ANIMATIONS
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'fade-out': 'fadeOut 0.4s ease-in-out forwards',
        'slide-down': 'slideDown 0.4s ease-in-out forwards',
      },

      // ⚙️ KEYFRAMES
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(30px)', opacity: '0' },
        },
      },
    },
  },

  // 🧩 PLUGINS
  plugins: [
    require('flowbite/plugin'), // dukungan komponen Flowbite
  ],
};
