import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import {bindActionCreators} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from '../store'
import {converterSlice} from '../store/reducers/converterSlice'
import {portfolioSlice} from '../store/reducers/portfolioSlice'
import {useState, useRef, useEffect} from 'react'
import {useUpdatePortfolioMutation} from '../store/api/portfolioBase'
import {IPortfolio} from '../models/api/portfolio'
import {ICurrentCoin} from '../models/props/Portfolio/PortfolioScreen/TransactionMenu/AddTransactionStep/AddTransactionStep'
import {ITransaction} from '../models/api/transaction'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useUniqId = () => Math.floor(Math.random() * Date.now())

export const useActions = () => {
    const actions = {...converterSlice.actions, ...portfolioSlice.actions}
    const dispatch = useAppDispatch()
    return bindActionCreators(actions, dispatch)
}

export const useOutside = (initialState: boolean) => {
    const [isShow, setIsShow] = useState(initialState)
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return {ref, isShow, setIsShow}
}

export const usePortfolio = () => {
    const {portfolios, currentPortfolio} = useAppSelector(state => state.portfolio)
    const index = portfolios.findIndex(portfolio => portfolio.id === currentPortfolio)

    return portfolios[index]
}

export const useBalance = (id: string) => {
    const {portfolios} = useAppSelector(state => state.portfolio)
    const index = portfolios.findIndex(portfolio => portfolio.id === id)

    return Number(portfolios[index].assets
    .map(asset => asset.price * asset.totalAmount)
    .reduce((prev, current) => prev + current, 0).toFixed(2))
}

export const useOperation = () => {
    const uniqId = useUniqId()
    const portfolio = usePortfolio()
    const [updatePortfolio, {isLoading, isSuccess}] = useUpdatePortfolioMutation()
    const {setUpdateIndicator} = useActions()

    useEffect(() => {
        const state = isLoading ? true : isSuccess && false
        setUpdateIndicator(state)
    }, [isLoading, isSuccess])

    return {
        removeAsset: (assetCoin: string) => {
            const updatedPortfolio = JSON.parse(JSON.stringify(portfolio)) as IPortfolio
            const assetIndex = portfolio.assets.findIndex(asset => asset.name === assetCoin)
            updatedPortfolio.assets.splice(assetIndex, 1)
    
            updatePortfolio(updatedPortfolio)
        },

        addTransaction: (
            currentCoin: ICurrentCoin,
            transactionData: {
                currentType: {title: string, profit: string},
                quantity: number,
                price: number,
                fees: number,
                notes: string,
                date: string
            }
        ) => {
            const {name, fullName, img} = currentCoin
            const {currentType, price, quantity, fees, notes, date} = transactionData
    
            const updatedPortfolio = JSON.parse(JSON.stringify(portfolio)) as IPortfolio
            const {assets} = updatedPortfolio
            const assetIndex = assets.findIndex(asset => asset.name === name)
    
            const newTransaction = {
                id: `t${uniqId}`,
                type: currentType,
                paymentPrice: price,
                amount: Number(currentType.profit + quantity),
                fees,
                notes,
                date
            } as ITransaction
    
            if (assetIndex > -1) {
                assets[assetIndex].transactions.push(newTransaction)
                assets[assetIndex].totalAmount += newTransaction.amount
            } else {
                assets.push({
                    id: `a${uniqId}`,
                    name,
                    fullName,
                    img,
                    price,
                    totalAmount: newTransaction.amount,
                    transactions: [newTransaction]
                })
            }
    
            updatePortfolio(updatedPortfolio)
        },

        removeTransaction: (
            assetCoin: string,
            transactionData: {id: string, amount: number}
        ) => {
            const {id, amount} = transactionData
            const updatedPortfolio = JSON.parse(JSON.stringify(portfolio)) as IPortfolio
    
            const assetIndex = updatedPortfolio.assets
            .findIndex(asset => asset.name === assetCoin)
    
            const transactionIndex = updatedPortfolio.assets[assetIndex].transactions
            .findIndex(transactions => transactions.id === id)
    
            updatedPortfolio.assets[assetIndex].totalAmount -= amount
            updatedPortfolio.assets[assetIndex].transactions.splice(transactionIndex, 1)
    
            !updatedPortfolio.assets[assetIndex].transactions.length && (
                updatedPortfolio.assets.splice(assetIndex, 1)
            )
    
            updatePortfolio(updatedPortfolio)
        }
    }
}