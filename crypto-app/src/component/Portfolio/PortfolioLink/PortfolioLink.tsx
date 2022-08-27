import {FC} from 'react'
import s from './PortfolioLink.module.css'
import {useActions, useAppSelector, useBalance} from '../../../hooks'
import {IPortfolioLinkProps} from '../../../models/props/Portfolio/PortfolioLink/PortfolioLink'
import {BiRadioCircleMarked} from 'react-icons/bi'

const PortfolioLink: FC<IPortfolioLinkProps> = ({portfolio}) => {
    const {id, name} = portfolio
    const {currentPortfolio} = useAppSelector(state => state.portfolio)
    const {setCurrentPortfolio} = useActions()
    const portfolioBalance = useBalance(id)

    return (
        <button className={s.portfolio__link} onClick={() => {
            setCurrentPortfolio(id)
        }}>
            <div className={s.portfolio__link_icon}>
                {name[0].toUpperCase()}
            </div>

            <div className={s.portfolio__link_info}>
                <h4>{name}</h4>
                <h6>
                    <span>$</span>
                    {portfolioBalance}
                </h6>
            </div>

            {currentPortfolio === id && (
                <div className={s.portfolio__selectMark}>
                    <BiRadioCircleMarked color='rgb(27 49 130)'/>
                </div>
            )}
        </button>
    )
}

export default PortfolioLink