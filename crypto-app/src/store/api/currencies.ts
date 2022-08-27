import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {ICurrenciesPayload} from '../../models/api'
import {CoinsResponse, ICoin} from '../../models/api/coin'
import {IMarketCap, IMarketCapsPayload, MarketCapsResponse} from '../../models/api/market-cap'
import {IMultipriceResponse, IPrice} from '../../models/api/price'

export const currenciesAPI = createApi({
  reducerPath: 'currenciesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://min-api.cryptocompare.com/data/'}),
  endpoints: (build) => ({
    fetchCoins: build.query<ICoin[], void>({
      query: () => ({
        url: 'top/totalvolfull',
        params: {
          limit: 100,
          tsym: 'USD'
        }
      }),
      transformResponse: (response: CoinsResponse) => response.Data.map(el => el.CoinInfo)
    }),
    
    fetchPrice: build.query<number, ICurrenciesPayload>({
      query: (payload) => ({
        url: 'price',
        params: {
          fsym: payload.coin,
          tsyms: payload.currency
        }
      }),
      transformResponse: (response: IPrice) => Object.values(response)[0]
    }),

    fetchMultiprice: build.query<IPrice, string>({
      query: (payload) => ({
        url: 'pricemulti',
        params: {
          fsyms: payload,
          tsyms: 'USD'
        }
      }),
      transformResponse: (response: IMultipriceResponse) => {
        const newResponse = JSON.parse(JSON.stringify(response))
        for (let key in newResponse) newResponse[key] = Object.values(newResponse[key])[0]
        return newResponse
      }
    }),

    fetchMarketCaps: build.query<IMarketCap[], IMarketCapsPayload>({
      query: (payload) => ({
        url: 'histoday',
        params: {
          fsym: payload.coin,
          tsym: payload.currency,
          limit: payload.days
        }
      }),
      transformResponse: (response: MarketCapsResponse) => response.Data
    })
  })
})

export const {
  useFetchCoinsQuery,
  useFetchPriceQuery,
  useLazyFetchMultipriceQuery,
  useFetchMarketCapsQuery
} = currenciesAPI