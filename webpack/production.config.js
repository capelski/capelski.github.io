const merge = require('webpack-merge');
const { resolve } = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new PrerenderSPAPlugin({
            staticDir: resolve(__dirname, '..', 'docs'),
            // TODO Compute articles url to be prerendered
            routes: ['/', '/blog', '/portfolio']
        })
    ]
});
