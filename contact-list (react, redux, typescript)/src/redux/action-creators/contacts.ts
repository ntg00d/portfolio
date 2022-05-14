import {response, findUser, findIndex} from '../../hooks/other'
import {ContactActionTypes} from '../../types/contacts'
import {TContactDispatch} from '../../types/other'

const BASE_URL = 'https://623b93f48e9af5878944edc3.mockapi.io/api/v1/data'

export const clearState = () => async (dispatch: TContactDispatch) => {
    dispatch({type: ContactActionTypes.CLEAR_STATE})
}

export const fetchContactsFromServer = (currentUser: string) => async (dispatch: TContactDispatch) => {
    const data = await response()
    const user = findUser(data, currentUser)
    dispatch({type: ContactActionTypes.FETCH_CONTACTS, payload: user.contacts})
}

export const confirmContacts = (
    id: string,
    name: string,
    phone: string,
    currentUser: string
) => async (dispatch: TContactDispatch) => {
    const data = await response()
    const user = findUser(data, currentUser)
    const index = findIndex(user.contacts, id)

    user.contacts[index] = {id, name, phone, note: user.contacts[index].note}

    fetch(`${BASE_URL}/${user.id}`, {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })
    
    dispatch({type: ContactActionTypes.CONFIRM_CONTACTS, payload: user.contacts})
}

export const initNote = (
    elId: string,
    value: string,
    currentUser: string
) => async (dispatch: TContactDispatch) => {
    const data = await response()
    const user = findUser(data, currentUser)
    const index = findIndex(user.contacts, elId)

    const {id, name, phone} = user.contacts[index]
    user.contacts[index] = {id, name, phone, note: value}

    fetch(`${BASE_URL}/${user.id}`, {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })

    dispatch({type: ContactActionTypes.FETCH_NOTE, payload: {elId, value}})
}

export const deleteContact = (
    elId: string,
    currentUser: string
) => async (dispatch: TContactDispatch) => {
    const data = await response()
    const user = findUser(data, currentUser)
    const index = findIndex(user.contacts, elId)

    user.contacts.splice(index, 1)

    fetch(`${BASE_URL}/${user.id}`, {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })

    dispatch({type: ContactActionTypes.DELETE_CONTACT, payload: {elId, currentUser, user}})
}

export const addContact = (
    name: string,
    phone: string,
    id: string,
    currentUser: string
) => async (dispatch: TContactDispatch) => {
    const data = await response()
    const user = findUser(data, currentUser)
    user.contacts.unshift({id, name, phone, note: ''})

    fetch(`${BASE_URL}/${user.id}`, {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })

    dispatch({type: ContactActionTypes.ADD_CONTACT, payload: user.contacts})
}