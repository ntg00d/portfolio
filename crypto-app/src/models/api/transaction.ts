export interface ITransaction {
    id: string
    type: {title: string, profit: string}
    paymentPrice: number
    amount: number
    fees: number
    notes: string
    date: string
}