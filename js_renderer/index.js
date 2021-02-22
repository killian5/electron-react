import React from 'react'
import ReactDOM from 'react-dom'
import './test.less'

const App = ()=>{

  return (
    <div>
      <p className="a">
        <span className="b">hello Electron</span>
      </p>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));