import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // proxy: {
  //   "/api": {
  //     target: "https://mern-onligne-shop.vercel.app",
  //     changeOrigin: true,
  //     // Remove the "secure" option or set it to true for production
  //     rewrite: (path) => path.replace(/^\/api/, ""),
  //   },
  // },
});
