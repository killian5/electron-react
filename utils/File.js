import fs from "fs"
import path from "path"
import axios from "axios"

/***
 * 创建文件路径
 * @method createPath
 * @param {String} dir 文件地址
 */
export function createPath(dir){
	return new Promise(resolve => {
		// 路径不存在创建路径
		if(!fs.existsSync(dir)){
			fs.mkdir(dir, err => {
				resolve({
					state: err ? 0 : 1,
					message: err ?`路径创建失败:${error}` : '路径创建成功'
				})
			})
		}else{
			resolve({
				state: 0,
				message:'路径已存在'
			})
		}
	})
}
/***
 * 读取文件并转为base64
 * @method readFileToBase64
 * @for File
 * @param {String} fileDir 文件地址
 * @return {Promise} 保存信息
 */
export function readFileToBase64(fileDir){
	return new Promise(resolve => {
		fs.readFile(fileDir,(err,data)=>{	
			if(err){
				resolve({
					state: 0,
					message:`读取文件错误：${err}`
				})
				return
			}
			resolve({
				state: 1,
        size: data.length,
				data:`data:audio/x-wav;base64,${data.toString('base64')}`,
				message:`读取文件成功：${fileDir}`
			})
		})
	})
}
/***
 * 保存流文件到指定文件夹中
 * @method saveStreamFile
 * @for File
 * @param {String} dir 文件保存地址
 * @param {String} fileName 文件名称
 * @param {Stream} data 流文件
 * @return {Promise} 保存信息
 */
export function saveStreamFile(dir, fileName, data){
	const writeStream = fs.createWriteStream(path.resolve(dir,fileName))
	data.pipe(writeStream)
	return new Promise(resolve => {
		writeStream
		.on('finish', ()=>{ // 保存成功
			resolve({
				state: 1,
				fileName,
				message:`保存文件${fileName}`
			})
		})
		.on('error',err=>{// 保存失败
			resolve({
				state: 0,
				fileName,
				message:`保存文件${fileName} 错误原因:${err}`
			})
		})
	})
}
/***
 * 保存流文件到指定文件夹中
 * @method saveRequestFile
 * @for File
 * @param {String} url 文件下载地址
 * @param {String} dir 文件保存地址
 * @param {String} fileName 文件名称
 * @param {Stream} data 流文件
 * @return {Promise} 保存信息
 */
export async function  saveRequestFile(url, dir, fileName){
  let RequestData ;
  try{
    RequestData = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: {'Cache-Control': 'no-cache'},
    });
  }
  catch(err){
    return {
      state: 0,
      url,
      message:`网络错误 错误原因:${err}`
    }
  }
  const {data, status} = RequestData
  if(status === 200){
    return await saveStreamFile(dir, fileName, data);
  }else{
    return {
      state: 0,
      url,
      message:`网络错误 错误码:${status}`
    }
  }

}