import json from '../apis/json'

export const fetchPosts =  () => async dispatch => {
        const response =  await json.get('/posts');

        dispatch({
            type: "FETCH_POSTS",
            payload: response.data
        })
    }

// Fetch 1 User For Each Post 
export const fetchUser = id => async dispatch => {
    const response = await json.get(`/users/${id}`);

    dispatch({
        type: "FETCH_USER",
        payload: response.data
    })
}