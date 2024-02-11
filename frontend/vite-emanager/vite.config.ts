import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Proxy all requests to the backend server
  //     "/**": {
  //       target: "http://localhost:8082",
  //       changeOrigin: true,

  //       rewrite: (path) => path,
  //     },
  //   },
  // },
});
