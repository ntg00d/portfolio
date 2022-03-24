import {combineReducers} from 'redux'
import {dataReducer} from './dataReducer'
import {stabilityReducer} from './stabilityReducer'

export const rootReducer = combineReducers({
    dataRed: dataReducer,
    stabilityRed: stabilityReducer
})