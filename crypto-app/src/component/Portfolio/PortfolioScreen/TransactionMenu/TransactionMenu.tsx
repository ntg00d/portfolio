import {FC, useState} from 'react'
import s from './TransactionMenu.module.css'
import {ITransactionMenuProps} from '../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/TransactionMenu'
import SelectCoinStep from './SelectCoinStep/SelectCoinStep'
import AddTransactionStep from './AddTransactionStep/AddTransactionStep'
import {GrClose} from 'react-icons/gr'

const TransactionMenu: FC<ITransactionMenuProps> = ({coins, menuHandle}) => {
    const [currentCoin, setCurrentCoin] = useState({
        name: '',
        fullName: '',
        img: ''
    })

    const coinHandle = (name: string, fullName: string, img: string) => {
        setCurrentCoin({name, fullName, img})
    }

    return (
        <div className="menu__container">
            <div className="menu__transparentBg"/>
        
            <div className={s.transactionMenu}>
                <div className={s.transactionMenu__title}>
                    <h2>{!currentCoin.name.length ? 'Select coin' : 'Add transaction'}</h2>
                    <button className={s.transactionMenu__close} onClick={menuHandle}>
                        <GrClose/>
                    </button>
                </div>

                <div className={s.transactionMenu__screen}>{
                    !currentCoin.name.length
                    ? <SelectCoinStep
                        coins={coins}
                        coinHandle={coinHandle}
                    />
                    : <AddTransactionStep
                        coins={coins}
                        coinHandle={coinHandle}
                        currentCoin={currentCoin}
                        menuHandle={menuHandle}
                    />
                }</div>
            </div>
        </div>
    )
}

export default TransactionMenu