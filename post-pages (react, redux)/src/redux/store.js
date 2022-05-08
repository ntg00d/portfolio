import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {mainReducer} from './mainReducer'
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
    main: mainReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
))