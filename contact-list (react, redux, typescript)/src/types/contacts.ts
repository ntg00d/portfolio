export interface IUserData {
    id: string
    user: string
    contacts: IContact[]
}

export interface IContact {
    id: string
    name: string
    phone: string
    note: string
}

export interface IContactState {
    contacts: IContact[] | undefined
}

export enum ContactActionTypes {
    FETCH_CONTACTS = 'FETCH_CONTACTS',
    CONFIRM_CONTACTS = 'CONFIRM_CONTACTS',
    FETCH_NOTE = 'FETCH_NOTE',
    ADD_CONTACT = 'ADD_CONTACT',
    DELETE_CONTACT = 'DELETE_CONTACT',
    CLEAR_STATE = 'CLEAR_STATE'
}

interface IFetchContactsFromStorageAC {
    type: ContactActionTypes.FETCH_CONTACTS
    payload: IContact[]
}

interface IConfirmContactsAC {
    type: ContactActionTypes.CONFIRM_CONTACTS
    payload: IContact[]
}

interface IFetchNoteAC {
    type: ContactActionTypes.FETCH_NOTE
    payload: {
        elId: string
        value: string
    }
}

interface IAddContact {
    type: ContactActionTypes.ADD_CONTACT
    payload: IContact[]
}

interface IDeleteContact {
    type: ContactActionTypes.DELETE_CONTACT
    payload: {
        elId: string
        currentUser: string
        user: IUserData
    }
}

interface IClearState {
    type: ContactActionTypes.CLEAR_STATE
}

export type TContactAction = IFetchContactsFromStorageAC | IConfirmContactsAC | IFetchNoteAC | IDeleteContact | IAddContact | IClearState