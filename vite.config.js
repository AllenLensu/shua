import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import { vueI18n } from "@intlify/vite-plugin-vue-i18n";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { networkConfig } from "./src/configs/networkConfig.js"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({}),
        vueI18n({
            include: path.resolve(__dirname, './src/locales/**')
        }),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        })
    ],
    server: {
        port: 18000,
        cors: true,
        open: false,
        proxy: {
            '^/api': {
                target: networkConfig.serverUrl,
                // changeOrigin: false,
                // ws: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '^/assets': {
                target: "http://localhost:11010/",
                // changeOrigin: false,
                // ws: false,
                rewrite: (path) => path.replace(/^\/assets/, '')
            }
        }
    },
    assetsInclude: ['**/*.ttf']
})