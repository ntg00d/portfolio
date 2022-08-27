import {ICoin} from '../../../../../../../api/coin'

export interface IAddTransactionDropdownItemProps {
    coin: ICoin
    smartHandle: () => void
    baseImgUrl: string
}