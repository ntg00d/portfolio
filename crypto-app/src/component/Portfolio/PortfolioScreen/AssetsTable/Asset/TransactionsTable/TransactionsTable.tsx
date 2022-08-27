import {FC} from 'react'
import s from './TransactionsTable.module.css'
import s2 from './Transaction/Transaction.module.css'
import Transaction from './Transaction/Transaction'
import {ITransactionsTableProps} from '../../../../../../models/props/Portfolio/PortfolioScreen/Asset/TransactionsTable/TransactionsTable'
import {GrClose} from 'react-icons/gr'

const TransactionsTable: FC<ITransactionsTableProps> = ({
    menuHandle,
    assetInfo,
    transactions
}) => {
    const {coin, price, totalAmount} = assetInfo

    return (
        <div className='menu__container' onClick={(e) => e.stopPropagation()}>
            <div className='menu__transparentBg'/>

            <div className={s.transactionsTable}>
                <div className={s.transactionsTable__title}>
                    <p>Transactions</p>
                    <button
                        className={s.transactionsTable__close}
                        onClick={menuHandle}
                    ><GrClose/></button>
                </div>

                <div className={s.transactionsTable__info}>
                    <div className={s.transactionsTable__balance}>
                        <p>{coin} balance</p>
                        <h4>${price * totalAmount}</h4>
                    </div>

                    <div className={s.transactionsTable__quantity}>
                        <p>Quantity</p>
                        <h4>{totalAmount} {assetInfo.coin}</h4>
                    </div>
                    
                    <div className={s.transactionsTable__avgBuyPrice}>
                        <p>Avg. buy price</p>
                        <h4>${(transactions.map(transaction => transaction.paymentPrice)
                        .reduce((prev, current) => prev + current, 0) / transactions.length)
                        .toFixed(2)}</h4>
                    </div>
                </div>

                <div className={`${s2.transaction__title} ${s2.transaction}`}>
                    {['Type', 'Price', 'Amount', 'Fees', 'Remove'].map(title => (
                        <div key={title}>{title}</div>
                    ))}
                </div>

                <div className={s.transaction__list}>
                    {transactions.map(transaction => (
                        <Transaction
                            key={transaction.id}
                            assetInfo={assetInfo}
                            transaction={transaction}
                        />
                    )).reverse()}
                </div>
            </div>
        </div>
    )
}

export default TransactionsTable