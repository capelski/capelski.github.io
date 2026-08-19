const { merge } = require('webpack-merge');
const PrerenderSPAPlugin = require('@prerenderer/webpack-plugin');
const { ArticleId } = require('./article-id');
const baseConfig = require('./base.config');

const routes = ['/', '/blog', '/portfolio'].concat(
    Object.values(ArticleId).map((articleId) => `/blog/${articleId}`)
);

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new PrerenderSPAPlugin({
            postProcess: (renderedRoute) => {
                /* Remove height attribute from gist iframes, as they generate noise in changesets */
                renderedRoute.html = renderedRoute.html.replace(
                    /<iframe([^>]*) style="height: \d+px;"([^>]*)>/g,
                    '<iframe$1>'
                );
            },
            renderer: '@prerenderer/renderer-puppeteer',
            rendererOptions: {
                /* The page transitions must be over before taking the html snapshot */
                renderAfterTime: 2000
            },
            routes
        })
    ]
});
