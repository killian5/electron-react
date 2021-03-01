const initialState = {
  color:"red",
  count: 0
}

// Actions Constants
export const types = {
  CHANGE_COLOR: "UI/CHANGE_COLOR",
  CHANGE_COUNT: "UI/CHANGE_COUNT"
}
// Reducer
 const reducer = (state = initialState, action) => {
   switch (action.type) {
    case types.CHANGE_COLOR:
      return { ...state, color: action.color }
    case types.CHANGE_COUNT:
      return { ...state, count: state.count + 1}
     default:
       return state
   }
 }
export default reducer

// Action Creators
export const actions = {
  increment(){
    return {
      type: types.CHANGE_COUNT
    }
  },
  changeColor(color){
    return dispatch => {
      dispatch({
        type: types.CHANGE_COLOR,
        color
      })
    }
  }
}

// selectors
export const getColor = state => state.ui.color