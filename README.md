# Redux Application On Redux Middleware

## Project Structure

/src

    - Components
     - PostList.js

    - reducers
     - index.js

    - actions
     - index.js

    - apis
     - json.js


# Steps Of App

### (1) Install Required Libraries [redux , react-redux , axios , redux-thunk]

    yarn add redux react-redux axios redux-thunk
    
### (2) Setup Redux Connection Inside ./src/index.js

```js
    import ReactDOM from 'react-dom';
    import App from './App';

    import {createStore} from 'redux'
    import {Provider} from 'react-redux'
    import reducers from './reducers'

    ReactDOM.render(
        <Provider store={createStore(reducers)}>
            <App />
        </Provider>, 
       document.getElementById('root')
    );
```
### (3) Create Reducers Files [/src/reducers/index.js ]

```js
    import {combineReducers} from 'redux'

    export default combineReducers({replaceMe: () => "Hi"});
```

### (4) Create PostList.js File [/src/Components] And Import In [App.js]

#### PostList.js
```js
    import React from 'react'

    function PostList() {
        return (
            <div>
                PostList
            </div>
        )
    }

    export default PostList
```

#### App.js
```js
    import PostList from './Components/PostList'

    function App() {

    return (
        <div className="App">
        <PostList/>
        </div>
    );
    }

    export default App;
```

### (5) Create index.js File [/src/actions] That Contains Action Creators And Import It Inside [PostsList.js] And Setup Redux Connection

#### index.js
```js
    export const fetchPosts = () => {
        return {
            type: "FETCH_POSTS"
        }
    }
```

#### PostsList.js
```js
    import React,{useEffect} from 'react'
    import {connect} from 'react-redux'
    import {fetchPosts} from '../actions/'

    function PostList(props) {

        useEffect(() => {
            console.log(props.fetchPosts())
        } , [])
        return (
            <div>
                PostList
            </div>
        )
    }

    export default connect(null , {fetchPosts})(PostList)
```

### (6) Create json.js File [/src/apis/] That Fetch Data Using Axios And Import Fetched Data Inside [/src/actions/index.js] But It Produce Error As Bad Approach Of Fetching Data And If Want To Dismiss The Error Remove [async , await] Keywords

#### json.js
```js
    import axios from 'axios'

    export default axios.create({
        baseURL: "https://jsonplaceholder.typicode.com"
    })
```

#### index.js
```js
    import json from '../apis/json'

    export const fetchPosts = async () => {
        // bad Approach
        const response = await json.get('/posts');

        return {
            type: "FETCH_POSTS",
            payload: response
        }
    }
```

### (7) Edit 'fetchPosts' Action Creator By Make It Return A Function And Remove [Async , Await] Keywords

#### /actions/index.js
```js
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
```

### (8) Inside [/src/index.js] Setup Thunk And Middleware [Import 'thunk' , applyMiddleware] And Edit 'fetchPosts' Action Creator Inside [/src/actions/index.js]

#### /src/index.js
```js
    import ReactDOM from 'react-dom';
    import App from './App';

    import {createStore , applyMiddleware} from 'redux'
    import {Provider} from 'react-redux'
    import reducers from './reducers/'
    import thunk from 'redux-thunk'

    const store = createStore(reducers , applyMiddleware(thunk));

    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
    );
```

#### /src/actions/index.js
```js
    import json from '../apis/json'

    export const fetchPosts =  () => async dispatch => {
            const response =  await json.get('/posts');

            dispatch({
                type: "FETCH_POSTS",
                payload: response
            })
        }
```

### (9) Create postsReducer Structure

#### /src/reducers/index.js
```js
    import {combineReducers} from 'redux'

    // Post Reducer Structure
    const postsReducer = () => {
        return 123;
    }

    // Pass To CombineReducers
    export default combineReducers({
        posts: postsReducer    
    });
```

### (10) Use Switch Statement With Reducer

#### /src/reducers/index.js
```js
    import {combineReducers} from 'redux'

    // Use Switch Statement Here
    const postsReducer = (state = [] , action) => {
        switch(action.type){
            case "FETCH_POSTS":
                return action.payload

            default: return state
        }
    }

    export default combineReducers({
        posts: postsReducer    
    });
```

### (11) Create 'mapStateToProps' Function In 'PostsList.js' And Edit Action To Return The Actual Data

#### /src/Components/PostsList.js
```js
    import React,{useEffect} from 'react'
    import {connect} from 'react-redux'
    import {fetchPosts} from '../actions/'

    function PostList(props) {
        // Call fetchPosts()
        useEffect(() => {
            props.fetchPosts()
        } , [])

        // Print Data
        console.log(props.posts)
        
        return (
            <div>
                PostList
            </div>
        )
    }

    const mapStateToProps = state => {
        return {
            posts: state.posts
        }
    }
    export default connect(mapStateToProps , {fetchPosts})(PostList)
```

#### /src/actions/index.js
```js
import json from '../apis/json'

export const fetchPosts =  () => async dispatch => {
        const response =  await json.get('/posts');

        // Return response.data Here
        dispatch({
            type: "FETCH_POSTS",
            payload: response.data
        })
    }
```

### (12) Render Fetched Data Inside 'PostsList.js' Component

#### /src/Components/PostsList.js
```js
    import React,{useEffect} from 'react'
    import {connect} from 'react-redux'
    import {fetchPosts} from '../actions/'

    function PostList(props) {

        
        useEffect(() => {
            props.fetchPosts()
        } , [])

        // Create Function For Render The Data
        const renderList = () => {
            return props.posts.map(post => {
                return <div key={post.id}> 
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            })
        }
        
        return (
            <div>
                {renderList()}
            </div>
        )
    }

    const mapStateToProps = state => {
        return {
            posts: state.posts
        }
    }
    export default connect(mapStateToProps , {fetchPosts})(PostList)
```

### (13) Create Action Creator Of Fetching 1 User For Each Post

#### /src/actions/index.js
```js
    // Fetch 1 User For Each Post 
    export const fetchUser = id => async dispatch => {
        const response = await json.get(`/users/${id}`);

        dispatch({
            type: "FETCH_USER",
            payload: response.data
        })
    }
```

### (14) Create 'UserHeader' Component For Display Fetched User Data And Import It In 'PostsList.js' Component

#### /src/Components/UserHeader.js
```js
    import React , {useEffect} from 'react'
    import {connect} from 'react-redux'
    import {fetchUser} from '../actions/'

    function UserHeader(props) {

        useEffect(() => {
            props.fetchUser(props.userId)
        })

        return (
            <div>
                UserHeader
            </div>
        )
    }

    export default connect(null , {fetchUser})(UserHeader)
```

#### /src/Components/PostList.js
```js
    import React,{useEffect} from 'react'
    import {connect} from 'react-redux'
    import {fetchPosts} from '../actions/'
    import UserHeader from './UserHeader'

    function PostList(props) {

        
        useEffect(() => {
            props.fetchPosts()
        } , [])

        const renderList = () => {
            return props.posts.map(post => {
                return <div key={post.id}> 
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <UserHeader userId={post.userId}/>
                </div>
            })
        }
        
        return (
            <div>
                {renderList()}
            </div>
        )
    }

    const mapStateToProps = state => {
        return {
            posts: state.posts
        }
    }
    export default connect(mapStateToProps , {fetchPosts})(PostList)
```