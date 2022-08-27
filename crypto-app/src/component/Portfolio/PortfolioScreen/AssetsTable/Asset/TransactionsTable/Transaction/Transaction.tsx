import {FC} from 'react'
import s from './Transaction.module.css'
import {ITransactionProps} from '../../../../../../../models/props/Portfolio/PortfolioScreen/Asset/TransactionsTable/Transaction/Transaction'
import {useOutside, useOperation} from '../../../../../../../hooks'
import TransactionDetails from './TransactionDetails/TransactionDetails'
import {FaTrashAlt} from 'react-icons/fa'

const Transaction: FC<ITransactionProps> = ({assetInfo, transaction}) => {
    const {
        id,
        type,
        paymentPrice,
        amount,
        fees,
        date
    } = transaction

    const {ref, isShow, setIsShow} = useOutside(false)

    const outsideHandle = () => {
        setIsShow(!isShow)
    }

    const {removeTransaction} = useOperation()

    return <>
        <div className={s.transaction} onClick={outsideHandle}>
            <div className={s.transaction__type}>
                <div className={s.transaction__icon}>
                    <p>{type.title[0].toUpperCase()}</p>
                </div>
                <div className={s.transaction__typeData}>
                    <div className={s.transaction__typeTitle}>
                        <p>{type.title}</p>
                    </div>
                    <div className={s.transaction__typeDate}>
                        <p>{date}</p>
                    </div>
                </div>
            </div>

            <div className={s.transaction__paymentPrice}>
                <p>${paymentPrice}</p>
            </div>

            <div className={s.transaction__amount}>
                <p style={{
                    color: amount > 0
                    ? 'rgb(0, 136, 72)'
                    : 'rgb(255, 76, 74)'
                }}>{
                    amount <= -1
                    ? amount
                    : type.profit + amount} {assetInfo.coin
                }</p>
            </div>

            <div className={s.transaction__fees}>
                <p>${fees}</p>
            </div>

            <div className={s.transaction__remove} onClick={(e) => {
                e.stopPropagation()
                removeTransaction(assetInfo.coin, {id, amount})
            }}><FaTrashAlt/></div>
        </div>

        {isShow && (
            <TransactionDetails
                ref={ref}
                details={transaction}
                outsideHandle={outsideHandle}
            />
        )}
    </>
}

export default Transaction