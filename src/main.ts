import "./global.css";
import App from "./App.svelte";
import { registerServiceWorker } from "./registerServiceWorker";

const app = new App({
  target: document.getElementById("app"),
});

export default app;

if (import.meta.env.VITE_WEB) {
  registerServiceWorker();
}
