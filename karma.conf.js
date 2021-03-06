// karma.conf.js

var webpackConfig = require('./webpack.config.js')

webpackConfig['mode'] = 'development'

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],

        files: [
            'test/**/*.spec.js'
        ],

        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        reporters: ['spec'],

        browsers: ['ChromeHeadless'],

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}