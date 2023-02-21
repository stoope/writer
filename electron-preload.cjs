const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: ipcRenderer.send.bind(ipcRenderer),
  on: ipcRenderer.on.bind(ipcRenderer),
  invoke: ipcRenderer.invoke.bind(ipcRenderer),
});
