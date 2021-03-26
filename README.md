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

### (6) Create json.js File [/src/apis/] That Fetch Data Using Axios And Import Fetched Data Inside [/src/actions/index.js] But It Produce Error As Bad Approach Of Fetching Data

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