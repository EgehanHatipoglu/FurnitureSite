export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: '#F5F0E8',
                warm: '#EDE5D4',
                sand: '#C9B99A',
                brown: '#7A5C3E',
                dark: '#2A1F14',
                accent: '#B85C38',
                customtext: '#3D2D1E',
                muted: '#9A8878',
            },
            fontFamily: {
                sans: ['"DM Sans"', 'sans-serif'],
                serif: ['"Cormorant Garamond"', 'serif'],
            },
            transitionTimingFunction: {
                'ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            animation: {
                fadeUp: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                fadeIn: 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                slowZoom: 'slowZoom 12s ease-out forwards',
                marquee: 'marquee 24s linear infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slowZoom: {
                    '0%': { transform: 'scale(1.08)' },
                    '100%': { transform: 'scale(1)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
