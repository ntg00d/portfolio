import {LOAD_STREETS, LOAD_HOUSES, LOAD_FLATS, ERROR, SEARCH_FOR_MATCHES, LOAD_INPUTTEXT, LOADER_ON, LOADER_OFF, CHANGE_INFO, DELETE_CLIENT, ADD_CLIENT} from './types'

export const loadStreetsAC = () => async dispatch => {
    try {
        dispatch(loaderOnAC())
        const response = await fetch('https://dispex.org/api/vtest/Request/streets')
        const jsonData = await response.json()
        dispatch({type: LOAD_STREETS, data: jsonData})
        dispatch(loaderOffAC())
    } catch (error) {
        dispatch({type: ERROR, errorInfo: error})
    }
}

export const loadHousesAC = (id) => async dispatch => {
    try {
        const response = await fetch(`https://dispex.org/api/vtest/Request/houses/${id}`)
        const jsonData = await response.json()
        dispatch({type: LOAD_HOUSES, data: jsonData})
    } catch (error) {
        dispatch({type: ERROR, errorInfo: error})
    }
}

export const loadFlatsAC = (id) => async dispatch => {
    try {
        const response = await fetch(`https://dispex.org/api/vtest/Request/house_flats/${id}`)
        const jsonData = await response.json()
        dispatch({type: LOAD_FLATS, data: jsonData})
    } catch (error) {
        dispatch({type: ERROR, errorInfo: error})
    }
}

export const searchForMatchesAC = () => ({type: SEARCH_FOR_MATCHES})

export const loadInputTextAC = (blocktype, inputvalue) => ({type: LOAD_INPUTTEXT, blocktype, inputvalue})

export const loaderOnAC = () => ({type: LOADER_ON})

export const loaderOffAC = () => ({type: LOADER_OFF})

export const changeInfoAC = (address, initials, phone, email, id) => {
    const initial = initials.split(' ')
    return {type: CHANGE_INFO, address, data: {surname: initial[0], name: initial[1], patronymic: initial[2], phone, email, id}}
}

export const deleteClientAC = (address, id) => ({type: DELETE_CLIENT, address, id})

export const addClientAC = (address, initials, phone, email, id) => {
    const initial = initials.split(' ')
    return {type: ADD_CLIENT, address, data: {surname: initial[0], name: initial[1], patronymic: initial[2], phone, email, id}}
}