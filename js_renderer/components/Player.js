import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { actions as uiActions } from "@redux/modules/ui.js"

class Player extends Component {
  render(){
    const {increment, changeColor} = this.props
    return (<button onClick={()=>{changeColor('#FFF')}}>+</button>)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(uiActions, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(Player)