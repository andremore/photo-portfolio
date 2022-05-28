module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['halloween'],
        // themes: [
        //     {
        //         mytheme: {
        //             primary: '#f5f5f4',
        //             secondary: '#1c1917',
        //             accent: '#78716c',
        //             neutral: '#292524',
        //             'base-100': '#e7e5e4',
        //             info: '#4290F5',
        //             success: '#1FA86A',
        //             warning: '#eab308',
        //             error: '#F0472D',
        //         },
        //     },
        // ],
    },
};
