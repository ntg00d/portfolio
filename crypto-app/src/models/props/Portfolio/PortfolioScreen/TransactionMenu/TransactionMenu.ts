import {ICoin} from '../../../../api/coin'

export interface ITransactionMenuProps {
    coins: ICoin[]
    menuHandle: () => void
}