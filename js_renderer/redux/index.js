import thunk from 'redux-thunk'
import rootReducer from './modules'
import { createStore, applyMiddleware, compose } from 'redux'

const isBuild = process.env.NODE_ENV === 'production'

// if(isBuild){
//   compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
// } else {

// }
export const store = createStore(rootReducer, compose(applyMiddleware(thunk), isBuild? '': window.__REDUX_DEVTOOLS_EXTENSION__()))
