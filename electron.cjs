const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Config = require("electron-config");
const config = new Config();

let isShown = true;
let currentWindow;

const createWindow = () => {
  const windowBound = config.get("winBounds") ?? {};

  const mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 360,
    minHeight: 360,
    icon: path.join(
      __dirname,
      "public",
      { darwin: "favicon.icns", linux: "favicon.png", win32: "favicon.ico" }[
        process.platform
      ] || "favicon.ico"
    ),
    frame: process.platform !== "darwin",
    skipTaskbar: process.platform === "darwin",
    autoHideMenuBar: process.platform === "darwin",
    webPreferences: {
      backgroundThrottling: false,
      preload: path.resolve(__dirname, "electron-preload.cjs"),
      contextIsolation: false,
    },
    ...windowBound,
  });

  if (process.env.NODE_ENV !== "development") {
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5000/");
  }

  currentWindow = mainWindow;

  ipcMain.handle("toggleFullscreen", function () {
    currentWindow.setFullScreen(!currentWindow.isFullScreen());
  });
  ipcMain.handle("close", function () {
    app.quit();
  });
  ipcMain.handle("minimize", function () {
    currentWindow.minimize();
  });

  currentWindow.on("close", function () {
    config.set("winBounds", currentWindow.getBounds());
  });

  currentWindow.on("closed", function () {
    app.quit();
  });

  currentWindow.on("hide", function () {
    isShown = false;
  });

  currentWindow.on("show", function () {
    isShown = true;
  });

  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
