import {FC} from 'react'
import s from './DropdownItem.module.css'
import {IDropdownItemProps} from '../../../../../models/props/Converter/Dropdown/DropdownItem/DropdownItem'

const DropdownItem: FC<IDropdownItemProps> = ({
    name,
    img,
    baseImgUrl,
    elementHandle
}) => {
    return (
        <button className={s.dropdown__item} onClick={elementHandle}>
            <img src={baseImgUrl + img}/>
            <h5>{name}</h5>
        </button>
    )
}

export default DropdownItem