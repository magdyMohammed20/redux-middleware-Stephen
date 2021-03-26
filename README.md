# Redux Application On Redux Middleware

## Project Structure

/src


# Steps Of App

## (1) Install Required Libraries [redux , react-redux , axios , redux-thunk]

    yarn add redux react-redux axios redux-thunk
    
## (2) Setup Redux Connection Inside ./src/index.js

``` 
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
