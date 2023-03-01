const { app, BrowserWindow, ipcMain, Menu, nativeTheme } = require("electron");
const path = require("path");
const Store = require("electron-store");

const store = new Store();

const WINDOW_BONDS_KEY = "editor:winBounds";

const isMac = process.platform === "darwin";

const createWindow = async () => {
  const windowBound = store.get(WINDOW_BONDS_KEY) ?? {};

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
    frame: !isMac,
    skipTaskbar: isMac,
    autoHideMenuBar: isMac,
    webPreferences: {
      backgroundThrottling: false,
      preload: path.resolve(__dirname, "electron-preload.cjs"),
      contextIsolation: true,
    },
    ...windowBound,
  });

  ipcMain.handle("toggleFullscreen", function () {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });

  ipcMain.handle("close", function () {
    app.quit();
  });

  ipcMain.handle("minimize", function () {
    mainWindow.minimize();
  });

  ipcMain.handle("setSetting", function (_event, { key, value }) {
    if (key === "app:theme") {
      nativeTheme.themeSource = value;
    }
    return store.set(key, value);
  });

  ipcMain.handle("getSetting", function (_event, { key }) {
    return store.get(key);
  });

  mainWindow.on("close", function () {
    store.set(WINDOW_BONDS_KEY, mainWindow.getBounds());
  });

  mainWindow.on("closed", function () {
    app.quit();
  });

  if (process.env.NODE_ENV !== "development") {
    await mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  } else {
    await mainWindow.loadURL("http://localhost:3000/");
  }

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
