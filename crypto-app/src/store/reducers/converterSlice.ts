import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IConverterState} from '../../models/reducers/converter/state'
import {ICurrentElementPL, IElementValuePL} from '../../models/reducers/converter/payloads'

const initialState: IConverterState = {
    currentCoin: {
        inputValue: 1,
        name: '',
        img: '',
        baseImgUrl: 'https://www.cryptocompare.com'
    },
    currentCurrency: {
        inputValue: 0,
        name: '',
        img: '',
        baseImgUrl: 'https://cryptobelka.com/upload/iblock/'
    },
    price: 0,
    days: 30
}

export const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        setCurrentPrice(state, {payload}: PayloadAction<number>) {
            state.price = payload
        },

        setCurrentElement({currentCoin, currentCurrency}, {payload}: PayloadAction<ICurrentElementPL>) {
            const {type, Name, ImageUrl} = payload

            if (type === 'coin') {
                currentCoin.name = Name
                currentCoin.img = ImageUrl
            } else if (type === 'currency') {
                currentCurrency.name = Name
                currentCurrency.img = ImageUrl
            }
        },

        enterElementValue({currentCoin, currentCurrency, price}, {payload}: PayloadAction<IElementValuePL>) {
            const {type, value} = payload
            const num = Number(value)

            if (type === 'coin') {
                currentCoin.inputValue = num
                currentCurrency.inputValue = num * price
            } else if (type === 'currency') {
                currentCurrency.inputValue = num
                currentCoin.inputValue = num / price
            }
        },

        equalValues({currentCoin, currentCurrency, price}) {
            currentCurrency.inputValue = currentCoin.inputValue * price
        },

        setDays(state, {payload}: PayloadAction<number>) {
            state.days = payload
        }
    }
})