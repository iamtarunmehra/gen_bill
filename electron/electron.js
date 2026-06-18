const { app, BrowserWindow, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const dns = require("dns");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
  });

  dns.lookup("google.com", (err) => {
    if (err) {
      console.log("Offline Mode");
      win.webContents.session.clearCache();
      win.loadFile(path.join(__dirname, "../out/index.html"));
    } else {
      console.log("Online Mode");
      win.loadURL("https://gen-bill.vercel.app/");
    }
  });

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-available", () => {
    dialog.showMessageBox({
      type: "info",
      title: "Update Available",
      message: "A new version is available. Downloading...",
    });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update Ready",
        message: "Update downloaded. Restart now?",
        buttons: ["Restart", "Later"],
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
  });
}

app.whenReady().then(() => {
  createWindow();
});