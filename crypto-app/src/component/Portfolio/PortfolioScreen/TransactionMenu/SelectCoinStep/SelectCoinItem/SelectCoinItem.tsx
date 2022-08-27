import {FC} from 'react'
import s from './SelectCoinItem.module.css'
import {ISelectCoinItemProps} from '../../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/SelectCoinStep/SelectCoinItem/SelectCoinItem'

const SelectCoinItem: FC<ISelectCoinItemProps> = ({
    coin,
    coinHandle,
    baseImgUrl
}) => {
    const {Name, FullName, ImageUrl} = coin

    return (
        <button className={s.selectCoinItem} onClick={() => {
            coinHandle(Name, FullName, ImageUrl)
        }}>
            <img src={baseImgUrl + ImageUrl} alt="coin"/>
            <p>{FullName} <span>{Name}</span></p>
        </button>
    )
}

export default SelectCoinItem