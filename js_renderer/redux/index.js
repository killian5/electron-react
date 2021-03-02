import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import ui from "./ui"
// 合并所有reducer
const rootReducer = combineReducers({
  ui
})

// 在非生产模式下, 使用reudx调试插件
const isBuild = process.env.NODE_ENV === 'development'

export default createStore(rootReducer, 
  isBuild ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()):
  applyMiddleware(thunk))
