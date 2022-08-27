import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {currenciesAPI} from './api/currencies'
import {portfolioBaseAPI} from './api/portfolioBase'
import {converterSlice} from './reducers/converterSlice'
import {portfolioSlice} from './reducers/portfolioSlice'

const rootReducer = combineReducers({
    converter: converterSlice.reducer,
    portfolio: portfolioSlice.reducer,
    [currenciesAPI.reducerPath]: currenciesAPI.reducer,
    [portfolioBaseAPI.reducerPath]: portfolioBaseAPI.reducer
})

const setupStore = () => (
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
            .concat(
                currenciesAPI.middleware,
                portfolioBaseAPI.middleware
            )
        )
    })
)

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']