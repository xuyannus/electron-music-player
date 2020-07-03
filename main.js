const electron = require('electron')
const { app, BrowserWindow } = electron

let mainWin

app.on('ready', () => {
  mainWin = new BrowserWindow({
    height: 500,
    width: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWin.loadFile('music.html')
})