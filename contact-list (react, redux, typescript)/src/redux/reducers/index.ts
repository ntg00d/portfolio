import {combineReducers} from 'redux'
import authReducer from './authReducer'
import contactReducer from './contactReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactReducer
})

export type RootState = ReturnType<typeof rootReducer>