import {IMarketCap} from '../../../api/market-cap'

export interface IChartProps {
    caps: IMarketCap[]
    currentCoin: string
    currentCurrency: string
}