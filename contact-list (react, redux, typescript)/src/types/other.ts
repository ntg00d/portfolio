import {Dispatch} from 'react'
import {TAuthAction} from './auth'
import {TContactAction} from './contacts'

export interface IRefsContact {
    name: React.RefObject<HTMLTextAreaElement>
    phone: React.RefObject<HTMLTextAreaElement>
    apply: React.RefObject<HTMLButtonElement>
}

export interface IAddContactRefs {
    name: React.RefObject<HTMLInputElement>
    phone: React.RefObject<HTMLInputElement>
}

export type TSetState<T> = React.Dispatch<React.SetStateAction<T>>
export type TContactDispatch = Dispatch<TContactAction>
export type TAuthDispatch = Dispatch<TAuthAction>