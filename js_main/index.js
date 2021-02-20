import path from "path"
import { app, BrowserWindow, ipcMain } from "electron"

const isDev = process.env.NODE_ENV === 'development'

const winURL = isDev
  ? `http://localhost:9080`
  : "file://"+__dirname+"/index.html";

function createWindow () {
  // react 调试工具
  // 加载应用的index.html
  const reactDevtoolsDir = path.resolve(__dirname, "../devtools/react_devtools")
  const reduxDevtoolsDir = path.resolve(__dirname, "../devtools/redux_devtools")
  BrowserWindow.addDevToolsExtension(reactDevtoolsDir)
  BrowserWindow.addDevToolsExtension(reduxDevtoolsDir)

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences:{
      nodeIntegration:true
    }
  })
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
