import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { actions as uiActions } from "@redux/ui"

class Player extends Component {
  render(){
    const {handelAdd, changeColor} = this.props
    return (<button onClick={()=>{changeColor("#123")}}>+</button>)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeColor(color){
      dispatch(uiActions.changeColor(color))
    }
  }
  // return {
  //   ...bindActionCreators(uiActions, dispatch)
  // }
}
export default connect(null, mapDispatchToProps)(Player)