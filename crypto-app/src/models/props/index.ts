import {ICoin} from '../api/coin'

export interface ICurrency {
    Name: string
    ImageUrl: string
}

export type AnyElement = ICoin | ICurrency