import {LOADER_ON, LOADER_OFF, ERROR} from '../types'

const initialState = {
    loading: false,
    error: []
}

export const stabilityReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER_ON:
            return {...state, loading: true}

        case LOADER_OFF:
            return {...state, loading: false}

        case ERROR:
            return {...state, error: action.errorInfo}

        default:
            return state
    }
}