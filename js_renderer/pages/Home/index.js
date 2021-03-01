import React,{ PureComponent } from "react"
import { connect } from "react-redux"

class Home extends PureComponent {
  render (){
    const {color} = this.props
    return (<div>首页{color}</div>)
  }
}

const mapStateToProps = state => ({
  count: state.ui.count,
  color: state.ui.color
})
export default connect(mapStateToProps, null)(Home)