import {useState} from 'react'
import {useActions} from '../../hooks'
import {TAddNote} from '../../types/component'

const AddNote: TAddNote = ({
    el,
    currentUser,
    handle
}) => {
    const [value, setValue] = useState(el.note)
    const {initNote} = useActions()

    return (
        <div className="add-note__container">
            <div className="add-note__top">
                <div className="add-note__title">Заметка</div>
                <button className="add-note__btn" onClick={() => {
                    initNote(el.id, value, currentUser)
                    handle()
                }}>X</button>
            </div>
            <div className="add-note__info">
                <textarea className="add-note__textarea" value={value} onChange={(e) => {
                    setValue(e.target.value)
                }}/>
            </div>
        </div>
    )
}

export default AddNote