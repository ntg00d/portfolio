import {ITransaction} from '../../../../../api/transaction'

export interface IAssetInfo {
    coin: string
    price: number
    totalAmount: number
}

export interface ITransactionsTableProps {
    menuHandle: () => void
    assetInfo: IAssetInfo
    transactions: ITransaction[]
}