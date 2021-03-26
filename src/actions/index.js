import json from '../apis/json'

export const fetchPosts = async () => {
    // bad Approach
    const response = await json.get('/posts');

    return {
        type: "FETCH_POSTS",
        payload: response
    }
}