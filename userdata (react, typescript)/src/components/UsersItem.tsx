import {useState} from 'react'
import {TUsersItem} from '../types/UsersItem'
import FormContainer from './FormContainer'

const UsersItem: TUsersItem = ({el}) => {
    const [toggle, setToggle] = useState(false)

    return (
        <div className="users__item">
            <div className="users__initials"><span>Имя:</span> {el.name}</div>
            <div className="users__city"><span>Город:</span> {el.address.city}</div>
            <div className="users__company"><span>Компания:</span> {el.company.name}</div>
            
            <button className="users__more-info" onClick={() => {
                setToggle(!toggle)
            }}>Подробнее</button>

            {toggle && <FormContainer el={el} toggle={() => setToggle(!toggle)}/>}
        </div>
    )
}

export default UsersItem