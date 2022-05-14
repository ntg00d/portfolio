import {useRef} from 'react'
import {useActions} from '../../hooks'
import {TContact} from '../../types/component'
import {IRefsContact} from '../../types/other'

const Contact: TContact = ({
    el,
    currentUser,
    handle,
    showInfo,
    contactModeHandle,
    noteSvg,
    changeSvg,
    deleteSvg,
    applySvg
}) => {
    const {confirmContacts, deleteContact} = useActions() 
    const refs: IRefsContact = {name: useRef(null), phone: useRef(null), apply: useRef(null)}
    const {name, phone, apply} = refs
    
    return (
        <div className="profile__contact">
            <div onClick={(e) => {
                const nextElement = e.currentTarget.nextElementSibling
                showInfo(name.current, nextElement)
            }} className="profile__contact-title">
                <textarea ref={name} defaultValue={el.name} disabled/>
            </div>

            <div className="profile__contact-info">
                <textarea className="profile__contact-textarea" ref={phone} defaultValue={el.phone} disabled/>
                <button className="profile__contact-btn" onClick={() => {
                    handle()
                }}>{noteSvg}</button>

                <div className="profile__contact-toggle">
                    <button className="profile__contact-btn" onClick={() => {
                        contactModeHandle(Object.values(refs), apply.current, refs)
                    }}>{changeSvg}</button>

                    <button className="profile__contact-btn profile__contact-apply disabled" ref={apply} onClick={() => {
                        if (name.current && phone.current && apply.current) {
                            contactModeHandle(Object.values(refs), apply.current, refs)
                            confirmContacts(el.id, name.current.value, phone.current.value, currentUser)
                        }
                    }}>{applySvg}</button>
                </div>

                <button className="profile__contact-btn" onClick={() => {
                    deleteContact(el.id, currentUser)
                }}>{deleteSvg}</button>
            </div>
        </div>
    )
}

export default Contact