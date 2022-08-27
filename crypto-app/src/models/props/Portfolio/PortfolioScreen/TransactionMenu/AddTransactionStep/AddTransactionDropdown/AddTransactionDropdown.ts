import {ICoin} from '../../../../../../api/coin'
import {ICurrentCoin} from '../AddTransactionStep'

export interface IAddTransactionDropdownProps {
    coins: ICoin[]
    coinHandle: (name: string, fullName: string, img: string) => void
    currentCoin: ICurrentCoin
}