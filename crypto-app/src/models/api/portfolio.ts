import {IAsset} from './asset'

export interface IPortfolio {
    id: string
    name: string
    assets: IAsset[]
}