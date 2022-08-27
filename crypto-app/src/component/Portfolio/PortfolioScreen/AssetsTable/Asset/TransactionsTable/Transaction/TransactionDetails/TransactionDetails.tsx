import {FC, forwardRef} from 'react'
import s from './TransactionDetails.module.css'
import {ITransactionDetailsProps} from '../../../../../../../../models/props/Portfolio/PortfolioScreen/Asset/TransactionsTable/Transaction/TransactionDetails/TransactionDetails'
import {GrClose} from 'react-icons/gr'

const TransactionDetails: FC<ITransactionDetailsProps> = forwardRef(({
    details,
    outsideHandle
}, ref) => {
    const {type, paymentPrice, fees, notes, date, amount} = details

    return (
        <div ref={ref} className={`${s.transactionDetails} option__container`}>
            <div className={s.transactionDetails__title}>
                <p>Transaction details</p>
                <button onClick={outsideHandle}>
                    <GrClose/>
                </button>
            </div>

            <div className={s.transactionDetails__fields}>
                {[
                    {name: 'Type', data: type.title},
                    {name: 'Date', data: date},
                    {name: 'Payment price', data: '$' + paymentPrice},
                    {name: 'Quantity', data: Math.abs(amount)},
                    {name: 'Fees', data: '$' + fees},
                    {name: `Total ${
                        type.title === 'Buy'
                        ? 'spent'
                        : type.title === 'Sell' && 'received'
                    }`, data: Math.abs(amount) * paymentPrice + Number(type.profit + fees)},
                    {name: 'Notes', data: notes},
                ].map(obj => {
                    const {name, data} = obj
                    return <div key={name} className={s.transactionDetails__field}>
                        <div className={s.transactionDetails__name}>
                            {name}
                        </div>
                        <div className={s.transactionDetails__data}>
                            {data.toString().length ? data : '--'}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
})

export default TransactionDetails