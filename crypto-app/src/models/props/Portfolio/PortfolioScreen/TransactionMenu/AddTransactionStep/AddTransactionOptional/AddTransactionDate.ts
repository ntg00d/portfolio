export interface IAddTransactionDateProps {
    date: Date
    changeDate: (value: Date) => void
    convertedDate: (value?: Date) => {
        getFullDate: string
        getMonthNames: string[]
    }
}