import {combineReducers} from 'redux'

// Use Switch Statement Here
const postsReducer = (state = [] , action) => {
    switch(action.type){
        case "FETCH_POSTS":
            return action.payload

        default: return state
    }
}


const userReducer = (state = [] , action) => {
    switch(action.type){
        case "FETCH_USER":
            return [...state , action.payload]

        default: return state
    }
}
export default combineReducers({
    posts: postsReducer,
    user: userReducer  
});

