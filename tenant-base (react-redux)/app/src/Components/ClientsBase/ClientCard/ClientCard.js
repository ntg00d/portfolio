import {useRef} from 'react'

function ClientCard(props) {
    const {userSvg, phoneSvg, mailSvg, deleteSvg, editSvg, applySvg, el, data, confirmData, deleteClient, editInfo} = props
    const refs = {initials: useRef(), phone: useRef(), email: useRef(), apply: useRef()}
    const address = Object.keys(data)[0]

    return <>
        <div className="clients__card">
            <div className="clients__info">
                <div className="clients__avatar">{userSvg}</div>
                <div className="clients__data">
                    <div className="textarea-block">
                        <textarea ref={refs.initials} disabled className='textarea textarea-initials' cols="19" defaultValue={`${el.surname} ${el.name} ${el.patronymic}`}/>
                    </div>
                    <div className='textarea-block'>
                        {phoneSvg} <textarea ref={refs.phone} disabled className='textarea textarea-phone' cols="17.5" rows="1" defaultValue={el.phone}/>
                    </div>
                    <div className='textarea-block'>
                        {mailSvg} <textarea ref={refs.email} disabled className='textarea textarea-email' cols="19" rows="1" defaultValue={el.email}/>
                    </div>
                </div>
            </div>
            <div className="clients__actions">
                <div onClick={() => deleteClient(address, el.id)} className="clients__actions-delete">{deleteSvg}</div>
                <span className="clients__span"/>
                <div onClick={() => {
                    const element = Object.values(refs)
                    const apply = refs.apply.current
                    editInfo(element, apply, refs)
                }} className="clients__actions-change">{editSvg}</div>

                <button onClick={() => {
                    const inputInitialsValue = refs.initials.current.value
                    const inputPhoneValue = refs.phone.current.value
                    const inputEmailValue = refs.email.current.value
                    confirmData(address, inputInitialsValue, inputPhoneValue, inputEmailValue, el.id)
                }} ref={refs.apply} className='apply-btn disabled'>{applySvg}</button>
            </div>
        </div>
    </>
}

export default ClientCard