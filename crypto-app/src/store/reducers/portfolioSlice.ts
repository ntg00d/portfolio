import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IPortfolioState} from '../../models/reducers/portfolio/state'
import {IPortfolio} from '../../models/api/portfolio'
import {IPrice} from '../../models/api/price'

const initialState: IPortfolioState = {
    portfolios: [],
    currentPortfolio: '',
    updateIndicator: false
}

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        uploadPortfolios(state, {payload}: PayloadAction<IPortfolio[]>) {
            const portfolios = JSON.parse(JSON.stringify(payload)) as IPortfolio[]

            portfolios.forEach(portfolio => (
                portfolio.assets.sort((a, b) => (
                    (b.price * b.totalAmount) - (a.price * a.totalAmount)
                ))
            ))
            
            state.portfolios = portfolios
        },

        setCurrentPortfolio(state, {payload}: PayloadAction<string>) {
            state.currentPortfolio = payload
        },

        updateAssetPrices({portfolios}, {payload}: PayloadAction<IPrice>) {
            const keys = Object.keys(payload)

            for (let i1 = 0; i1 < portfolios.length; i1++) {
                for (let i2 = 0; i2 < keys.length; i2++) {
                    const found = portfolios[i1].assets.findIndex(asset => (
                        asset.name === keys[i2]
                    ))
                    found > -1 && (
                        portfolios[i1].assets[found].price = Object.values(payload)[i2]
                    )
                }
            }
        },

        setUpdateIndicator(state, {payload}: PayloadAction<boolean>) {
            state.updateIndicator = payload
        }
    }
})