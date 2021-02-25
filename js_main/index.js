import path from "path"
import { app, BrowserWindow } from "electron"

const isBuild = process.env.NODE_ENV === 'development'

const winURL = isBuild
  ? `http://localhost:9080`
  : "file://"+__dirname+"/index.html";

function createWindow () {

  // react 调试工具
  // 加载应用的index.html
  if(isBuild){
    const reactDevtoolsDir = path.resolve(__dirname, "../devtools/react_devtools")
    const reduxDevtoolsDir = path.resolve(__dirname, "../devtools/redux_devtools")
    BrowserWindow.addDevToolsExtension(reactDevtoolsDir)
    BrowserWindow.addDevToolsExtension(reduxDevtoolsDir)
  }
  import("./handle") // 子进程发送消息到主进程注册位置
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

}

app.on('ready', createWindow)