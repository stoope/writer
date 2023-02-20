const { ipcRenderer } = require("electron");

window.electron = {
  toggleFullscreen: () => ipcRenderer.invoke("toggleFullscreen"),
  close: () => ipcRenderer.invoke("close"),
  minimize: () => ipcRenderer.invoke("minimize"),
};
