export interface IAuthState {
    currentUser: string
}

export enum AuthActionTypes {
    FETCH_CURRENTUSER = 'FETCH_CURRENTUSER',
    INIT_AUTHSTORAGE = 'INIT_AUTHSTORAGE',
    INIT_CURRENTUSER = 'INIT_CURRENTUSER',
    EXIT_PROFILE = 'EXIT_PROFILE'
}

interface IFetchCurrentUserAC {
    type: AuthActionTypes.FETCH_CURRENTUSER
    payload: string
}

interface IInitAuthStorageAC {
    type: AuthActionTypes.INIT_AUTHSTORAGE
}

interface IInitCurrentUserAC {
    type: AuthActionTypes.INIT_CURRENTUSER
    payload: string
}

interface IExitProfileAC {
    type: AuthActionTypes.EXIT_PROFILE
}

export type TAuthAction = IFetchCurrentUserAC | IInitAuthStorageAC | IInitCurrentUserAC | IExitProfileAC