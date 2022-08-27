export interface ICurrentElement {
    inputValue: number
    name: string
    img: string
    baseImgUrl: string
}

export interface IConverterState {
    currentCoin: ICurrentElement
    currentCurrency: ICurrentElement
    price: number
    days: number
}