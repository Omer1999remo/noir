/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                display: ['Syne', 'sans-serif'],
            },
            colors: {
                noir: '#0a0a0a',
                charcoal: '#141414',
                silver: '#c0c0c0',
                electric: '#ff3d00',
                neon: '#00ff88',
                cream: '#f5f5f0',
            },
            animation: {
                'marquee': 'marquee 20s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'glitch-1': 'glitch1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
                'glitch-2': 'glitch2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite',
                'scan': 'scan 3s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255,61,0,0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(255,61,0,0.6)' },
                },
                glitch1: {
                    '0%': { clipPath: 'inset(20% 0 80% 0)', transform: 'translate(-2px, -2px)' },
                    '20%': { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(2px, 2px)' },
                    '40%': { clipPath: 'inset(40% 0 50% 0)', transform: 'translate(-2px, 2px)' },
                    '60%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(2px, -2px)' },
                    '80%': { clipPath: 'inset(10% 0 70% 0)', transform: 'translate(-2px, 2px)' },
                    '100%': { clipPath: 'inset(30% 0 50% 0)', transform: 'translate(2px, -2px)' },
                },
                glitch2: {
                    '0%': { clipPath: 'inset(15% 0 85% 0)', transform: 'translate(2px, 2px)' },
                    '20%': { clipPath: 'inset(65% 0 15% 0)', transform: 'translate(-2px, -2px)' },
                    '40%': { clipPath: 'inset(45% 0 45% 0)', transform: 'translate(2px, -2px)' },
                    '60%': { clipPath: 'inset(85% 0 10% 0)', transform: 'translate(-2px, 2px)' },
                    '80%': { clipPath: 'inset(5% 0 75% 0)', transform: 'translate(2px, -2px)' },
                    '100%': { clipPath: 'inset(35% 0 45% 0)', transform: 'translate(-2px, 2px)' },
                },
                scan: {
                    '0%': { transform: 'rotate(-35deg) translateX(-100%)' },
                    '100%': { transform: 'rotate(-35deg) translateX(100%)' },
                },
            },
        },
    },
    plugins: [],
}