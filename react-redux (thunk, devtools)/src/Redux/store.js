import {createStore, compose, applyMiddleware} from 'redux'
import {rootReducer} from './Reducers/rootReducer'
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))