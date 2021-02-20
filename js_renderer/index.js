import React from 'react'
import ReactDOM from 'react-dom'
import './test.less'

const App = ()=>{
  return (
    <div>
      <p className="a">
        <span className="b">1231231</span>
      </p>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));