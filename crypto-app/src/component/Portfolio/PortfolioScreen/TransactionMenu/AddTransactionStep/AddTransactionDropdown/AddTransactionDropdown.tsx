import {FC, useState} from 'react'
import s from  './AddTransactionDropdown.module.css'
import s2 from './AddTransactionDropdownItem/AddTransactionDropdownItem.module.css'
import {useAppSelector} from '../../../../../../hooks'
import {IAddTransactionDropdownProps} from '../../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/AddTransactionStep/AddTransactionDropdown/AddTransactionDropdown'
import AddTransactionDropdownItem from './AddTransactionDropdownItem/AddTransactionDropdownItem'
import {FiChevronUp, FiChevronDown} from 'react-icons/fi'

const AddTransactionDropdown: FC<IAddTransactionDropdownProps> = ({
    coins,
    coinHandle,
    currentCoin
}) => {
    const {name, fullName, img} = currentCoin
    const {baseImgUrl} = useAppSelector(state => state.converter.currentCoin)
    const [toggle, setToggle] = useState(false)

    const dropdownHandle = () => {
        setToggle(!toggle)
    }

    return (
        <div className={s.addTransactionDropdown}>
            <button
                className={`${s.addTransactionDropdown__select} ${s2.addTransactionDropdown__item}`}
                onClick={dropdownHandle}
            >
                <img src={baseImgUrl + img} alt="coin"/>
                <p>{fullName} <span>{name}</span></p>
                <div className={s.addTransactionDropdown__arrow}>
                    {toggle ? <FiChevronUp/> : <FiChevronDown/>}   
                </div>
            </button>

            {toggle && (
                <div className={s.addTransactionDropdown__list}>
                    {coins.map(coin => {
                        const {Name, FullName, ImageUrl} = coin
                        return <AddTransactionDropdownItem
                            key={Name}
                            coin={coin}
                            smartHandle={() => {
                                coinHandle(Name, FullName, ImageUrl)
                                dropdownHandle()
                            }}
                            baseImgUrl={baseImgUrl}
                        />
                    })}
                </div>
            )}
        </div>
    )
}

export default AddTransactionDropdown