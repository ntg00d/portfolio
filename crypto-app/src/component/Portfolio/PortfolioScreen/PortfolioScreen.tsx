import {FC, useState} from 'react'
import s from './PortfolioScreen.module.css'
import {IPortfolioScreenProps} from '../../../models/props/Portfolio/PortfolioScreen/PortfolioScreen'
import {useActions, useAppSelector, useBalance, usePortfolio} from '../../../hooks'
import {useRemovePortfolioMutation} from '../../../store/api/portfolioBase'
import AssetsTable from './AssetsTable/AssetsTable'
import Allocation from './Allocation/Allocation'
import TransactionMenu from './TransactionMenu/TransactionMenu'
import {BsPlusLg} from 'react-icons/bs'
import {FaTrashAlt} from 'react-icons/fa'

const PortfolioScreen: FC<IPortfolioScreenProps> = ({coins}) => {
    const {portfolios} = useAppSelector(state => state.portfolio)
    const {id, assets} = usePortfolio()
    const {setCurrentPortfolio} = useActions()
    const [removePortfolio] = useRemovePortfolioMutation()
    const portfolioBalance = useBalance(id)

    const [menuToggle, setMenuToggle] = useState(false)

    const menuHandle = () => {
        setMenuToggle(!menuToggle)
    }

    return (
        <div className={s.portfolio__screen}>
            <div className={s.portfolio__info}>
                <div className={s.portfolio__balance}>
                    <p>Current balance</p>
                    <h1>${portfolioBalance}</h1>
                </div>

                <div className={s.portfolio__actions}>
                    <button className={s.portfolio__addNew} onClick={menuHandle}>
                        <BsPlusLg/>
                        <p>Add new transaction</p>
                    </button>
                    
                    {portfolios.length > 1 && (
                        <button className={s.portfolio__remove} onClick={() => {
                            removePortfolio(id)
                            setCurrentPortfolio('')
                        }}>
                            <FaTrashAlt/>
                            <p>Remove portfolio</p>
                        </button>
                    )}
                </div>
            </div>

            <Allocation/>

            {assets.length
            ? <AssetsTable/>
            : <div className={s.portfolio__empty}>
                <p>This portfolio is empty</p>
                <span>Add any coins to get started</span>    
            </div>}

            {menuToggle && (
                <TransactionMenu
                    coins={coins}
                    menuHandle={menuHandle}
                />
            )}
        </div>
    )
}

export default PortfolioScreen