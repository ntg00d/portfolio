import {FC} from 'react'
import s from './Dropdown.module.css'
import DropdownItem from './DropdownItem/DropdownItem'
import {IDropdownProps} from '../../../../models/props/Converter/Dropdown/Dropdown'

const Dropdown: FC<IDropdownProps> = ({
    elements,
    elementHandle,
    dropdownToggle,
    dropdownHandle,
    currentElement,
    baseImgUrl
}) => {
    const {name, img} = currentElement

    return (
        <div className={s.dropdown}>
            <button className={s.dropdown__select} onClick={dropdownHandle}>
                <img src={baseImgUrl + img}/>
                <h5>{name}</h5>
            </button>

            {dropdownToggle && (
                <div className={s.dropdown__items}>
                    {elements.map(element => {
                        const {Name, ImageUrl} = element
                        return <DropdownItem
                            key={Name}
                            name={Name}
                            img={ImageUrl}
                            baseImgUrl={baseImgUrl}
                            elementHandle={() => elementHandle(Name, ImageUrl)}
                        />
                    })}
                </div>
            )}
        </div>
    )
}

export default Dropdown