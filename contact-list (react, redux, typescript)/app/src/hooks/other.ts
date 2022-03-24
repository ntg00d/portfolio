import {IContact, IUserData} from '../types/contacts'

export const response = async () => {
    const response = await fetch('https://623b93f48e9af5878944edc3.mockapi.io/api/v1/data')
    const data: Promise<any> = await response.json()
    return data
}

export const findUser = (data: any, mark: string): IUserData => {
    return data.find((el: IUserData) => el.user === mark)
}

export const findIndex = (contacts: IContact[], id: string): number => {
    return contacts.findIndex((el: IContact) => el.id === id)
}