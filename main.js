const electron = require('electron')
const { app, BrowserWindow } = electron

let mainWin

app.on('ready', () => {
  mainWin = new BrowserWindow({
    height: 500,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWin.loadFile('music.html')

  mainWin.webContents.openDevTools()

})