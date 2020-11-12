const path = require('path')
const {app, BrowserWindow, ipcMain} = require('electron')

app.allowRendererProcessReuse = true

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : "file://"+__dirname+"/index.html";

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences:{
      nodeIntegration:true,
      webSecurity: false // 允许加载本地资源
    }
  })
  // react 调试工具
  process.env.ELECTRON_ENV === 'development' && BrowserWindow.addDevToolsExtension("/Users/mac/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.8.2_0");
  // and load the index.html of the app.
  win.loadURL(winURL)
  win.webContents.openDevTools()
  sendRenderer(app.getPath('desktop'));
}
function sendRenderer(message){
  ipcMain.on('init', event => {
    event.reply('main-message', message)
  })
}

app.on('ready', createWindow)