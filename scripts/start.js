const path = require('path')
const webpack = require('webpack')
const electron = require('electron')

const { say } = require('cfonts')
const { spawn } = require('child_process')

const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

let electronProcess = null, manualRestart = false;

function startRenderer () {
  return new Promise(resolve => {
    rendererConfig.mode = 'development'
    const compiler = webpack(rendererConfig)
    // 保持热更新活力 
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })
    // 创建一个webpack服务器 热更新
    const server = new WebpackDevServer( compiler, {
        contentBase: path.join(__dirname, '../build'),
        quiet: true,
        before (app) {
          app.use(hotMiddleware)
        }
      }
    )
    server.listen(9080,"localhost",()=>{
      resolve("服务启动成功了！！！！");
    })
  })
}

function startMain () {
  return new Promise(resolve => {
    mainConfig.mode = 'development'
    const compiler = webpack(mainConfig)
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log("主进程代码错误:",err)
        return
      }
      console.log('主进程代码开始编译')
      // 主进程代码更新时，重新启动electron
      if ( electronProcess ) {
        // 先杀死electron子进程
        process.kill(electronProcess.pid)
        // 主进程代码发生变化 不允许关闭 node 进程
        manualRestart = true
        // 清空对象
        electronProcess = null
        // 再次启动electron
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 2000)
      }

      resolve()
    })
  })
}

function startElectron () {
  // 通过electron创建一个子进程
  // 相当于 electron . 启动命令
  var args = [
    '--inspect=5858',
    path.join(__dirname, '../build/main.js')
  ]

  electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    console.log('主进程: ' + data);
  })

  electronProcess.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  })

  // 当electron的子进程被关闭时
  electronProcess.on('close', () => {
    // 当electron 进程结束后 退出node进程
    if (!manualRestart) process.exit()
  })
}

function init(){
  // 命令行装饰 不重要
  say('killian', {
    font: '3d',              
    align: 'center',             
    colors: ['#999','#113bee']
  });
  Promise.all([startRenderer(), startMain()])
  .then(() => {
    startElectron()
  })
  .catch(err => {
    console.error(err)
  })

}
init();