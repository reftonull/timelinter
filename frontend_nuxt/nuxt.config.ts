import { defineNuxtConfig } from "nuxt";
import path from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
    buildDir: path.resolve(__dirname, "../public"),
    ssr: false,
    vite: {
        server: {
            proxy: {
                "/secure": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
                "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
    },
});
