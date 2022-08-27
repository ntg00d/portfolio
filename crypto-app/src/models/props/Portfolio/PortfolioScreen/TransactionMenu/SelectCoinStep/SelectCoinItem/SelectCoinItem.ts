import {ICoin} from '../../../../../../api/coin'

export interface ISelectCoinItemProps {
    coin: ICoin
    coinHandle: (name: string, fullName: string, img: string) => void
    baseImgUrl: string
}