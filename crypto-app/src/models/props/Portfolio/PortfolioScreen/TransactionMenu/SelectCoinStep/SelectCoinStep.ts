import {ICoin} from '../../../../../api/coin'

export interface ISelectCoinStepProps {
    coins: ICoin[]
    coinHandle: (name: string, fullName: string, img: string) => void
}