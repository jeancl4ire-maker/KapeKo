module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        // Original cream background + modern colors
        'coffee-cream': '#F5F5DC', // Original warm cream background
        'modern-black': '#1a1a1a',
        'coffee-brown': '#8B4513',
        'pure-white': '#fefefe',
        'premium-gold': '#d4af37',
        'light-cream': '#fef7e5',
        // Classic colors for compatibility
        'coffee-dark': '#654321',
        'coffee-gold': '#D4AF37',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Playfair Display', 'serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'subtle-float': 'subtleFloat 3s ease-in-out infinite',
        'logo-glow': 'logoGlow 2s ease-in-out infinite alternate',
        'logo-pulse': 'logoPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        logoGlow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' },
        },
        logoPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      backgroundImage: {
        'coffee-pattern': "url('/images/coffee-texture.jpg')",
      }
    },
  },
  plugins: [],
}
