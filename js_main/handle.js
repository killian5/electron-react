import { app, ipcMain } from "electron"
import { createPath, readFileToAudio, saveRequestFile} from '../utils/File'

/***
 * 下载文件(主进程)
 * 下载线上文件 保存到本地
 */
ipcMain.handle('downloadFile', async (event, {url, dir, fileName}) => {
  if(!url || !dir || !fileName){
    return `下载文件时，请将downloadFile参数填写完整`
  }else{

    const data =  await saveRequestFile(url, app.getPath(dir), fileName)
    return data
  }
})

/***
 * 读取文件(主进程)
 * 通过主进程将文件转为base64 to renderer
 */
ipcMain.handle('readFile', async (event, dir, realitySize = 0) => {
  const {state} = await createPath(dir)
  // state = 0 路径存在说明文件已经有了
  if(!state){
    const {state, size, data} = await readFileToAudio(dir)
    if(state){ // 文件读取成功 实际大小符合 误差值为80%
      if(size / realitySize > 0.8){
        return {state:1, data}
      }else{ // 文件读取成功 实际大小不符合
        return {
          state:0, 
          message:'文件大小有问题'
        }
      }
    } else {
      // 没有路径无法读取文件
      return {
        state:0, 
        message:'当前文件不存在'
      }
    }
  }
})
