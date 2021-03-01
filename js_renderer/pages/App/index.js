import React, {Component}from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'


import Home from "../Home"
import Login from "../Login"
import Download from "../Download"
import Player from "components/Player.js";

class App extends Component {
  render(){
    return (
      <>
      <Player/>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/Login">登录</Link>
        <Link to="/Download">下载</Link>
        <Switch>
          <Route exact  path='/' component={Home} />
          <Route exact path='/Login' component={Login} />
          <Route path='/Download' component={Download} />
        </Switch>
      </Router>
      </>
    )
  }

}

export default App