import {ITransaction} from '../../../../../../api/transaction'
import {IAssetInfo} from '../TransactionsTable'

export interface ITransactionProps {
    assetInfo: IAssetInfo
    transaction: ITransaction
}