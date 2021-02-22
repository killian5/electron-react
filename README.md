electron 8.0.0 + react16 + webpack4 + axios +less + react_devtools + redux_devtools 搭建的脚手架工程(无多余内容) 



可以直接打包 win mac linux 安装包
在package.json中配置下面命令就可以打包不同的安装包
```
--mac           //mac版安装包
--linux         //linux版安装包
--win --ia32    //win32版安装包
--win --x64     //win64版安装包

// 例：在package.json中修改
"build": "electron-builder --win",
```

```
package.json 
public/         存放打包后的静态文件
scripts/        webpack打包脚本（渲染进程和主进程）     
js_main/        主进程
js_renderer/    渲染进程
devtools/       调试工具
````

## 本地调试
```
npm i && npm start
```
## 打包安装包
```
npm run build
```
### 无多余内容，纯脚手架，下载后直接使用，需要插件自行安装
### Electron V8.0.0 兼容 es6 
### 自带调试工具，调试错误方便
### 多平台打包更方便
### 支持less
### 多线程
