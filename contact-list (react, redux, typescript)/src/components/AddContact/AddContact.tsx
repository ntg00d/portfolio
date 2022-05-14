import {useRef} from 'react'
import {useActions} from '../../hooks'
import {TAddContact} from '../../types/component'
import {IAddContactRefs} from '../../types/other'

const AddContact: TAddContact = ({
    handle,
    currentUser,
    enterData,
    addContactSvg
}) => {
    const {addContact} = useActions()
    const refs: IAddContactRefs = {name: useRef(null), phone: useRef(null)}
    const {name, phone} = refs

    return (
        <div className="add-contact-form__container">
            <div className="add-contact-form__title">{addContactSvg} Добавить контакт</div>

            <div className="add-contact-form__input">
                <div className="add-contact-form__input-title">Имя</div>
                <input ref={name} type="text"/>
            </div>
            <div className="add-contact-form__input">
                <div className="add-contact-form__input-title">Телефон</div>
                <input ref={phone} type="text"/>
            </div>

            <div className="add-contact-form__actions">
                <button className="add-contact-form__apply" onClick={() => {             
                    (name.current && phone.current) && enterData(name.current.value, phone.current.value, refs, currentUser, addContact)
                }}>Добавить</button>

                <button className="add-contact-form__cancel" onClick={() => {
                    handle()
                }}>Отмена</button>
            </div>
        </div>
        )
    }

export default AddContact