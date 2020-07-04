const electron = require('electron')
const { app, BrowserWindow } = electron

let mainWin

app.on('ready', () => {
  mainWin = new BrowserWindow({
    height: 500,
    width: 330,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false
  })

  mainWin.loadFile('music.html')
})