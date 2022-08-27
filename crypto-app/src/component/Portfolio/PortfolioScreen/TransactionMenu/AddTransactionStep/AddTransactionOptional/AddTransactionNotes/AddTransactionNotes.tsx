import {FC, useState} from 'react'
import s from './AddTransactionNotes.module.css'
import {useOutside} from '../../../../../../../hooks'
import {IAddTransactionNotesProps} from '../../../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/AddTransactionStep/AddTransactionOptional/AddTransactionNotes'
import {MdNotes} from 'react-icons/md'

const AddTransactionNotes: FC<IAddTransactionNotesProps> = ({changeNotes}) => {
    const {ref, isShow, setIsShow} = useOutside(false)
    const [textareaValue, setTextareaValue] = useState('')

    const windowHandle = () => {
        setIsShow(!isShow)
    }

    return <>
        <button onClick={windowHandle}>
            <MdNotes/> Notes
        </button>

        {isShow && (
            <div ref={ref} className={`${s.notesWindow} option__container`}>
                <div className={s.notesWindow__enter}>
                    <textarea value={textareaValue} onChange={(e) => {
                        setTextareaValue(e.target.value)
                    }} />
                </div>

                <button className={s.notesWindow__confirm} onClick={() => {
                    changeNotes(textareaValue)
                    windowHandle()
                }}>Add note</button>
            </div>
        )}
    </>
}

export default AddTransactionNotes