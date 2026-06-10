const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
  });

  // win.loadURL("http://localhost:3000");
  win.loadURL("https://gen-bill.vercel.app/");

}

app.whenReady().then(() => {
  createWindow();
});