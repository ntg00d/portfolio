import {FC} from 'react'
import s from './AddTransactionDropdownItem.module.css'
import {IAddTransactionDropdownItemProps} from '../../../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/AddTransactionStep/AddTransactionDropdown/AddTransactionDropdownItem/AddTransactionDropdownItem'

const AddTransactionDropdownItem: FC<IAddTransactionDropdownItemProps> = ({
    coin,
    smartHandle,
    baseImgUrl
}) => {
    const {Name, FullName, ImageUrl} = coin

    return (
        <button className={s.addTransactionDropdown__item} onClick={smartHandle}>
            <img src={baseImgUrl + ImageUrl} alt="coin"/>
            <p>{FullName} <span>{Name}</span></p>
        </button>
    )
}

export default AddTransactionDropdownItem