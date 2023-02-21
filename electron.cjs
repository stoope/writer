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

  ipcMain.handle("initSettings", function () {
    nativeTheme.themeSource = store.get("app:theme") ?? "dark";
    return {
      ["editor:value"]: store.get("editor:value") ?? "",
      ["editor:spellCheck"]: store.get("editor:spellCheck") ?? false,
      ["editor:selectionStart"]: store.get("editor:selectionStart") ?? 0,
      ["editor:selectionEnd"]: store.get("editor:selectionEnd") ?? 0,
      ["editor:scrollTop"]: store.get("editor:scrollTop") ?? 0,
    };
  });

  ipcMain.handle("setSetting", function (_event, { key, value }) {
    return store.set(key, value);
  });

  mainWindow.on("close", function () {
    store.set(WINDOW_BONDS_KEY, mainWindow.getBounds());
  });

  mainWindow.on("closed", function () {
    app.quit();
  });

  buildMenu(mainWindow);

  if (process.env.NODE_ENV !== "development") {
    await mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  } else {
    await mainWindow.loadURL("http://localhost:5000/");
  }

  mainWindow.webContents.openDevTools();
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

function buildMenu(window) {
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    {
      label: "Settings",
      submenu: [
        {
          label: "Theme",
          submenu: [
            {
              label: "Dark",
              type: "checkbox",
              checked:
                store.get("app:theme") === "dark" || !store.get("app:theme"),
              click: () => {
                nativeTheme.themeSource = "dark";
                store.set("app:theme", "dark");
                buildMenu(window);
              },
            },
            {
              label: "Light",
              type: "checkbox",
              checked: store.get("app:theme") === "light",
              click: () => {
                nativeTheme.themeSource = "light";
                store.set("app:theme", "light");
                buildMenu(window);
              },
            },
            {
              label: "System",
              type: "checkbox",
              checked: store.get("app:theme") === "system",
              click: () => {
                nativeTheme.themeSource = "system";
                store.set("app:theme", "system");
                buildMenu(window);
              },
            },
          ],
        },
        {
          label: "Spellcheck",
          type: "checkbox",
          checked: store.get("app:spellCheck") === true,
          click: (event) => {
            window.webContents.send("setSpellcheck", event.checked);
            store.set("app:spellCheck", event.checked);
            buildMenu(window);
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
