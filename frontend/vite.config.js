import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        outDir: path.resolve(__dirname, "../public"),
    },
    server: {
        proxy: {
            '/secure': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,      
                ws: true,
            },
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,      
                ws: true,
            }
        },
    },
});
