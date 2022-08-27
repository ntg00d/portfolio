import {ForwardedRef} from 'react'
import {ITransaction} from '../../../../../../../api/transaction'

export interface ITransactionDetailsProps {
    ref: ForwardedRef<HTMLDivElement>
    details: ITransaction
    outsideHandle: () => void
}