const { merge } = require('webpack-merge');
const PrerenderSPAPlugin = require('@prerenderer/webpack-plugin');
const { ArticleCategory } = require('./article-category');
const { ArticleId } = require('./article-id');
const baseConfig = require('./base.config');

/* Every url the app resolves must have a prerendered html file of its own: github pages
 * serves static files, with no fallback for the paths the client router knows about
 */
const routes = ['/', '/blog', '/portfolio']
    // The blog route redirects to the default category; each category is a page on its own
    .concat(Object.keys(ArticleCategory).map((categoryKey) => `/blog/${categoryKey}`))
    .concat(Object.values(ArticleId).map((articleId) => `/blog/${articleId}`));

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
                /* Give the app time to render the section (and its embedded content)
                 * before taking the html snapshot */
                renderAfterTime: 2000,
                /* react-responsive resolves the breakpoints at render time, so the
                 * snapshot freezes the layout of whichever viewport is used here */
                viewport: { width: 1440, height: 900 }
            },
            routes
        })
    ]
});
