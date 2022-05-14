import {useRef} from 'react'

function AddClient(props) {
    const {addClientSvg, address, toggle, setToggle, smoothToggle, enterData} = props
    const refs = {addInitials: useRef(), addPhone: useRef(), addEmail: useRef()}

    return <>
        <div style={smoothToggle(toggle)} className="add-client">
            <div className="add-client__title">{addClientSvg} Добавить жильца</div>
            <div className="add-client__address">{address}</div>
            <div className="add-client__info">
                <div className="add-client__contacts">
                    <div className="contact-phone">
                        <div className="contact-phone__title">Телефон</div>
                        <input className='contact-phone__input' ref={refs.addPhone} type="text"/>
                    </div>
                    <div className="contact-email">
                        <div className="contact-email__title">E-mail</div>
                        <input className='contact-email__input' ref={refs.addEmail} type="text"/>
                    </div>
                </div>
                <div className="add-client__initials">
                    <div className="initials__title">Ф.И.О.</div>
                    <input className='initials__input' ref={refs.addInitials} type="text"/>
                </div>
            </div>
            <div className="add-client__actions">
                <button onClick={() => toggle === 'on' ? setToggle('off') : setToggle('on')} className="action__cancel">Отмена</button>
                <button onClick={() => {
                    const phoneValue = refs.addPhone.current.value
                    const emailValue = refs.addEmail.current.value
                    const initialsValue = refs.addInitials.current.value
                    enterData(address, initialsValue, phoneValue, emailValue, refs, setToggle)
                }} className="action__add">Добавить</button>
            </div>
        </div>
    </>
}

export default AddClient