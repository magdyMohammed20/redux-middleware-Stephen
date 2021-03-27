import json from '../apis/json'

export const fetchPosts =  () => async dispatch => {
        const response =  await json.get('/posts');

        dispatch({
            type: "FETCH_POSTS",
            payload: response.data
        })
    }
