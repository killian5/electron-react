import {ipcRenderer} from 'electron'

class RenderInvoke {
  /***
   * 子进程发送异步信息通知主进程下载文件
   * @method downloadFile
   * @for RenderInvoke
   * @param {String} url 文件下载地址
   * @param {String} dir 文件保存本地地址 默认为本地音乐文件夹
   * @param {String} fileName 文件名称
   * @return {Promise} 保存信息
   */
  async downloadFile(url, dir = 'music', fileName){
    return await ipcRenderer.invoke("downloadFile",{url, dir, fileName})
  }
  /***
   * 读取文件并转为base64
   * @method readFile
   * @for File
   * @param {String} fileDir 文件地址
   * @param {Number} realitySize 文件原始大小 选填默认为零
   * @return {Promise} 保存信息
   */
  async readFile(dir, realitySize){
    return await ipcRenderer.invoke("readFile", dir, realitySize)
  }
}