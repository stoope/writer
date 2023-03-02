export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./service-worker.js", {
        scope: "/",
      });
    } catch (error) {
      console.error(`Service worker registration failed with ${error}`);
    }
  }
}
