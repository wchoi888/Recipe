import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //make it mobile friendly
    port: 5173,
    open: true,
    host: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3005",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(),VitePWA({
//     registerType: "autoUpdate",injectRegister:"script-defer",devOptions:{enabled:true},
//     manifest:{
//       name:"Recipes for Me",
//       short_name: "Recipes",
//       description: "recipe sharing platform",
//       theme_color:"#ffffff",
//       icons:[{
//         src: 'pwa-192x192.png',
//         sizes: '192x192',
//         type: 'image/png'
//       },
//       {
//         src: 'pwa-512x512.png',
//         sizes: '512x512',
//         type: 'image/png'
//       }]
//     },
//     workbox: {
//       globPatterns: ['**/*.{js,css,html,png,svg,jpg,pdf,jsx}'],
//       runtimeCaching: [
//         {
//           urlPattern: ({ url }) => {
//             return url.pathname.startsWith("/src/assets");
//           },
//           handler: "CacheFirst",
//           options: {
//             cacheName: "assets-cache",
//             cacheableResponse: {
//               statuses: [0, 200],
//             },
//           },
//         },
//       ],
//     },
//   })],
//  server: { //make it mobile friendly
//     port: 3000,
//     open: true,
//     host: true,
//     proxy: {
//       '/graphql': {
//         target: 'http://localhost:3001', //make sure it's the right port, as wing
//         secure: false,
//         changeOrigin: true,
//       }
//     }
//   }
// })

