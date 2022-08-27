import {ICoin} from '../../../../../api/coin'

export interface ICurrentCoin {
    name: string
    fullName: string
    img: string
}

export interface IAddTransactionStepProps {
    coins: ICoin[]
    coinHandle: (name: string, fullName: string, img: string) => void
    currentCoin: ICurrentCoin
    menuHandle: () => void
}