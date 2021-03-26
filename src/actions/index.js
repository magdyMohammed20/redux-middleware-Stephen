import json from '../apis/json'

export const fetchPosts =  () => {
    // Edit fetchPosts By Make It Return A Function
    return function(dispatch , getState){
        const response =  json.get('/posts');

        return {
            type: "FETCH_POSTS",
            payload: response
        }
    }
}