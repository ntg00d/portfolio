import {FC, useState, useEffect} from 'react'
import s from './CalcFragment.module.css'
import {ICalcFragmentProps} from '../../../models/props/Converter/CalcFragment/CalcFragment'
import Dropdown from './Dropdown/Dropdown'

const CalcFragment: FC<ICalcFragmentProps> = ({
    type,
    elements,
    currentElement,
    setCurrentElement,
    enterElementValue,
    baseImgUrl
}) => {
    const [dropdownToggle, setDropdownToggle] = useState(false)

    const dropdownHandle = () => {
        setDropdownToggle(!dropdownToggle)
    }

    useEffect(() => {
        if (!currentElement.name.length) {
            const {Name, ImageUrl} = elements[0]
            setCurrentElement({type, Name, ImageUrl})
        }
    }, [])

    return (
        <div className={s.converter__item}>
            <input
                className={s.converter__input}
                type='number'
                min='0'
                value={currentElement.inputValue}
                onChange={(e) => enterElementValue({type, value: e.target.value})}
            />

            <Dropdown
                elements={elements}
                elementHandle={(Name: string, ImageUrl: string) => {
                    setCurrentElement({type, Name, ImageUrl})
                    dropdownHandle()
                }}
                currentElement={currentElement}
                baseImgUrl={baseImgUrl}
                dropdownToggle={dropdownToggle}
                dropdownHandle={dropdownHandle}
            />
        </div>
    )
}

export default CalcFragment