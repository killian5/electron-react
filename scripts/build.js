const del = require('del')
const webpack = require('webpack')
const chalk = require('chalk')

process.env.NODE_ENV = 'production'

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

init();
// 打包过程分为3步
// 1.webpack打包主进程
// 2.webpack打包渲染进程
// 3.运行electron-builder
function init(){
  // 清空文件夹下所有文件，避免打包出错
  del.sync(['build/*', 'dist/*'])
  chalk.white.bold('compiling...')
  // webpack打包 主进程 和 渲染进程
  Promise.all([pack(mainConfig), pack(rendererConfig)])
  .then(res => {
    packLog(res, 'blue');
  })
  .catch(err => {
    packLog(`\n${err}\n`,'red')
    process.exit(1)
  })
}


// webpack 打包
function pack (config) {
  return new Promise((resolve, reject) => {
    config.mode = 'production'
    const processName = config.target === 'electron-main' ? '主进程':'渲染进程'
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject([`${processName} webpack 打包失败:\n`,...stats.toString({chunks: false, colors: true})
        .split(/\r?\n/)
        .map(line => ` ${line}\n`)]
        .join(""))
      } else {
        resolve(`${processName} webpack 打包成功 \n`)
      }
    })
  })
}

function packLog (data, color) {
  console.log(chalk[color].bold(`${data}`) )
}


