import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		allowedHosts: ["8637f67c57ad.ngrok-free.app"],
	},
	optimizeDeps: {
		include: ["@mui/x-charts"],
	},
});
