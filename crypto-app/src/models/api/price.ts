export interface IPrice {
    [key: string]: number
}

export interface IMultipriceResponse {
    [key: string]: {
        [key: string]: number
    }
}