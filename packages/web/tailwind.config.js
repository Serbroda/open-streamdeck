module.exports = {
    purge: {
        enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
        content: ['./src/**/*.{html,ts,scss}'],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
};
