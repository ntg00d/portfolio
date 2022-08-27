import {IPortfolio} from '../../api/portfolio'

export interface IPortfolioState {
    portfolios: IPortfolio[]
    currentPortfolio: string,
    updateIndicator: boolean
}