import {ITransaction} from './transaction'

export interface IAsset {
    id: string
    name: string
    fullName: string
    img: string
    price: number
    totalAmount: number
    transactions: ITransaction[]
}