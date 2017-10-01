var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        frameworks: ["jasmine"],

        files: [
            'spec/**/*.ts',
            { pattern: 'src/**/*.ts', included: false }
        ],

        preprocessors: {
            'spec/**/*.ts': ['webpack'],
            'src/**/*.ts': ['webpack']
        },

        webpack: webpackConfig,

        reporters: ["spec"],

        browsers: ["ChromeHeadless"],

        mime: {
            'text/x-typescript': ['ts']
        }
    })
}
