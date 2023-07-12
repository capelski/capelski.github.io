const { merge } = require('webpack-merge');
const { resolve } = require('path');
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin');
const { ArticleId } = require('../src/components/articles/all-articles-id');
const baseConfig = require('./base.config');

const routes = ['/', '/blog', '/portfolio'].concat(
    Object.values(ArticleId).map((articleId) => `/blog/${articleId}`)
);

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new PrerenderSPAPlugin({
            staticDir: resolve(__dirname, '..', 'docs'),
            postProcess: (renderedRoute) => {
                /* Remove height attribute from gist iframes, as they generate noise in changesets */
                renderedRoute.html = renderedRoute.html.replace(
                    /<iframe([^>]*) style="height: \d+px;"([^>]*)>/g,
                    '<iframe$1>'
                );
                return renderedRoute;
            },
            routes
        })
    ]
});
