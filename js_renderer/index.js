import React from 'react'
import ReactDOM from 'react-dom'
import './test.less'
import {ipcRenderer} from 'electron'


const App = () => {
  ipcRenderer.invoke("readFile", '/Users/mac/Downloads/语音条/music/0.mp3', 14782080).then(res => {
    console.log(res)
  })

  // const audio = new Audio(data)

 ipcRenderer.invoke("downloadFile",{
    url:"https://gn-sycdn.kuwo.cn/d5bf3f27c563b5067f828c1ba77090e8/60362304/resource/n1/60/16/768801623.mp3",
    dir:"music",
    fileName:'baidu'
  }).then(res => {
    console.log(res)
})
  return (
    <div>
      <p className="a">
        <span className="b">hello Electron</span>
      </p>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));