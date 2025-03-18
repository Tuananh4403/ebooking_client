import 'dotenv/config';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url'
const resourceJsFiles = glob.sync('./src/**/*.js');
const resourceCssFiles = glob.sync('./src/**/*.css');

export default defineConfig({
    server: {
        port: process.env.VITE_SERVER_PORT || 5173,
        host: '0.0.0.0',
    },
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/assets/css/style.css',
                    dest: './'
                },
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            "~scss": path.resolve(__dirname, "./public/assets/scss"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~scss/abstracts/variables" as *;`,
                api: 'modern-compiler'
            },
        },
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (/\.(css)$/.test(assetInfo.name)) {
                        return 'assets/css/[name]-[hash][extname]';
                    }
                    if (/\.(js)$/.test(assetInfo.name)) {
                        return 'assets/js/[name]-[hash][extname]';
                    }
                    if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
                        return 'assets/images/[name]-[hash][extname]';
                    }
                    if (/\.(woff|woff2|ttf|otf)$/.test(assetInfo.name)) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
                manualChunks: {
                    vue: [
                        'vue',
                        'vue-router',
                        'vue-i18n',
                        'vue-toastification',
                        'vue-multiselect'
                    ],
                    vendor: ['axios'],
                },
            },
        },
        chunkSizeWarningLimit: 2000,
    },
});
