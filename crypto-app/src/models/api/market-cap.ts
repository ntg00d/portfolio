import {ICurrenciesPayload, IResponseSchema} from '.'

export interface IMarketCap {
    time: number
    high: number
    low: number
    open: number
    volumefrom: number
    volumeto: number
    close: number
    conversionType: string
    conversionSymbol: string
}

export interface IMarketCapsPayload extends ICurrenciesPayload {
    days: number
}

export type MarketCapsResponse = IResponseSchema<IMarketCap[]>