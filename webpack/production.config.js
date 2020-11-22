const merge = require('webpack-merge');
const { resolve } = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const { ArticleId } = require('../src/components/articles/article-id');
const baseConfig = require('./base.config');

const routes = ['/', '/blog', '/portfolio'].concat(
    Object.values(ArticleId).map((articleId) => `/blog/${articleId}`)
);

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new PrerenderSPAPlugin({
            staticDir: resolve(__dirname, '..', 'docs'),
            routes
        })
    ]
});
