import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'assets'),
    define: {
        PRODUCTION_URL_BASE: JSON.stringify('https://capelski.github.io')
    },
    plugins: [
        react(),
        vitePrerenderPlugin({
            prerenderScript: resolve(__dirname, 'src', 'prerender.tsx'),
            previewMiddlewareFallback: '/index.html',
            renderTarget: '#app-placeholder'
        })
    ],
    build: {
        outDir: resolve(__dirname, 'docs'),
        emptyOutDir: true
    }
});
