import {IAuthState, TAuthAction, AuthActionTypes} from '../../types/auth'

const initialState: IAuthState = {
    currentUser: ''
}

const authReducer = (state = initialState, action: TAuthAction): IAuthState => {
    switch (action.type) {
        case AuthActionTypes.INIT_CURRENTUSER:
            return {...state, currentUser: action.payload}

        case AuthActionTypes.EXIT_PROFILE:
            return {...state, currentUser: ''}

        default:
            return state
    }
}

export default authReducer