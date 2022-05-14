import {AuthActionTypes} from '../../types/auth'
import {IUserData} from '../../types/contacts'
import {TAuthDispatch} from '../../types/other'

export const initCurrentUser = (currentUser: string) => async (dispatch: TAuthDispatch) => {
    const BASE_URL = 'https://623b93f48e9af5878944edc3.mockapi.io/api/v1/data'
    const response = await fetch(BASE_URL)
    const data = await response.json()
    const check = (user: string) => data.some((el: IUserData) => el.user === user)

    const newUser = {
        user: currentUser,
        contacts: []
    }

    if (currentUser.length && !check(currentUser)) {
        fetch(BASE_URL, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newUser)
        })
    }

    dispatch({type: AuthActionTypes.INIT_CURRENTUSER, payload: currentUser})
}

export const exitProfile = () => async (dispatch: TAuthDispatch) => {
    dispatch({type: AuthActionTypes.EXIT_PROFILE})
}