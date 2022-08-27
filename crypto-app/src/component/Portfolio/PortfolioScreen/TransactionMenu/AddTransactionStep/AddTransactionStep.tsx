import {FC, useState, useEffect} from 'react'
import s from './AddTransactionStep.module.css'
import {useFetchPriceQuery} from '../../../../../store/api/currencies'
import {useOperation} from '../../../../../hooks'
import {IAddTransactionStepProps} from '../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/AddTransactionStep/AddTransactionStep'
import AddTransactionDropdown from './AddTransactionDropdown/AddTransactionDropdown'
import AddTransactionDate from './AddTransactionOptional/AddTransactionDate/AddTransactionDate'
import AddTransactionFees from './AddTransactionOptional/AddTransactionFees/AddTransactionFees'
import AddTransactionNotes from './AddTransactionOptional/AddTransactionNotes/AddTransactionNotes'

const AddTransactionStep: FC<IAddTransactionStepProps> = ({
    coins,
    coinHandle,
    currentCoin,
    menuHandle
}) => {
    const {addTransaction} = useOperation()

    const types = [
        {title: 'Buy', profit: '+'},
        {title: 'Sell', profit: '-'}
    ]

    const [{currentType, quantity, price, fees, notes, date}, setForm] = useState({
        currentType: types[0],
        quantity: 1,
        price: 0,
        fees: 0,
        notes: '',
        date: new Date()
    })

    const updateForm = (
        field: string,
        value: number | string | Date | {[key: string]: string}
    ) => setForm(prev => ({...prev, [field]: value}))

    const convertedDate = (value: Date = date) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]

        const month = value.getMonth()
        const day = value.getDate()
        const year = value.getFullYear()

        const time = value.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })

        return {
            getFullDate: `${monthNames[month]} ${day}, ${year}, ${time}`,
            getMonthNames: monthNames
        }
    }

    const {data: actualPrice, isSuccess: actualPriceIsSuccess} = useFetchPriceQuery({
        coin: currentCoin.name,
        currency: 'USD'
    })

    useEffect(() => {
        actualPriceIsSuccess && updateForm('price', actualPrice)
    }, [actualPrice])

    return (
        <div className={s.addTransactionStep}>
            <div className={s.addTransactionStep__types}>
                {types.map(type => {
                    const {title} = type
                    return <button key={title} style={{
                        backgroundColor: currentType.title === title
                        ? '#fff'
                        : ''
                    }} onClick={() => {
                        updateForm('currentType', type)
                    }}>{title}</button>
                })}
            </div>

            <AddTransactionDropdown
                coins={coins}
                coinHandle={coinHandle}
                currentCoin={currentCoin}
            />

            <div className={s.addTransactionStep__inputs}>
                {[
                    {
                        title: "Quantity",
                        min: "1",
                        value: quantity,
                        field: 'quantity'
                    },
                    {
                        title: "Price per coin in $",
                        min: "0",
                        value: price,
                        field: 'price'
                    }
                ].map(el => {
                    const {title, min, value, field} = el
                    return <div key={field} className={s.addTransactionStep__input}>
                        <p>{title}</p>
                        <input
                            type="number"
                            min={min}
                            value={value}
                            onChange={(e) => updateForm(field, Number(e.target.value))}
                        />
                    </div>
                })}
            </div>

            <div className={s.addTransactionStep__optional}>
                <AddTransactionDate
                    date={date}
                    changeDate={(value: Date) => updateForm('date', value)}
                    convertedDate={convertedDate}
                />
                <AddTransactionFees
                    changeFees={(value: number) => updateForm('fees', value)}
                />
                <AddTransactionNotes
                    changeNotes={(value: string) => updateForm('notes', value)}
                />
            </div>

            <div className={s.addTransactionStep__spent}>
                <p>Total {
                    currentType.title === types[0].title
                    ? 'spent'
                    : 'received'
                }</p>
                <input
                    type="text"
                    value={`$${quantity * price + Number(currentType.profit + fees)}`}
                    readOnly
                />
            </div>

            <button className={s.addTransactionStep__confirm} onClick={() => {
                addTransaction(currentCoin, {
                    currentType,
                    quantity,
                    price,
                    fees,
                    notes,
                    date: convertedDate().getFullDate
                })
                menuHandle()
            }}>Add transaction</button>
        </div>
    )
}

export default AddTransactionStep