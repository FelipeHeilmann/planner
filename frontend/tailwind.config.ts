import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'dashboardCard': 'linear-gradient(94deg, #6266F5 14.99%, #8487FF 92.22%)',
                'dashboardCardPink': 'linear-gradient(94deg, #f25178 14.99%, #f36b95 92.22%)',
            },
            colors: {
                'mainBlue': '#6266f5',
                'mainPink': '#f25178',
                'mainYellow': '#ffc56d',
                'prayerCyan': '#62d9e6',
                'loginCardBgColor': '#f3f6fd',
                'loginTitleColor': '#353535',
                'loginInputBgColor': '#e8f0fe',
                'loginInputPlaceholderColor': '#adadad',
                'navbarMobileIconColor': '#d2d2d2',
                'weirdBlack': '#575353',
                'weirdWhite': '#F3F6FD'
            },
            boxShadow: {
                loginCardBoxShadow: '0 5px 10px 0px rgba(0, 0, 0, 0.2)',
                loginBgColor: '#6266f5',
                loginCardBgColor: '#f3f6fd',
                loginTitleColor: '#353535',
                loginInputBgColor: '#e8f0fe',
                loginInputPlaceholderColor: '#adadad'
            },
            minWidth: {
                iphoneSEWidth: '375px',
            },
        },
    },
    plugins: [],
}
export default config

