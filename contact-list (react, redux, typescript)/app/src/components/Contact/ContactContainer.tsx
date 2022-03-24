import React from 'react'
import Contact from './Contact'
import {connect} from 'react-redux'
import {IContact} from '../../types/contacts'
import {TSetState, IRefsContact} from '../../types/other'
import {MdOutlineNotes, MdDelete} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'
import {GrFormCheckmark} from 'react-icons/gr'

const mapState = (_: any, props: {
    el: IContact,
    currentUser: string,
    handle: () => (id: number, state: number, setState: TSetState<number>) => void
}) => {
    return {
        el: props.el,
        currentUser: props.currentUser,
        noteHandle: props.handle,
        noteSvg: <MdOutlineNotes size={20} style={{padding: '3px 0 0 1px'}}/>,
        changeSvg: <AiFillEdit size={17} style={{padding: '3px 0 0 0'}}/>,
        deleteSvg: <MdDelete size={20} style={{padding: '3px 0 0 1px'}}/>,
        applySvg: <GrFormCheckmark size={22} style={{padding: '0 0 0 1.5px'}}/>
    }
}

const mapDispatch = () => {
    return {
        showInfo: (
            element: HTMLTextAreaElement | null,
            nextElement: any
        ): void => {
            nextElement?.style.maxHeight && element && element.hasAttribute('disabled')
            ? (nextElement.style.maxHeight = null)
            : (nextElement.style.maxHeight = nextElement.scrollHeight * 3 + 'px')
        },

        contactModeHandle: (
            element: React.RefObject<any>[],
            applyBtn: HTMLButtonElement | null,
            refs: IRefsContact
        ): void => {
            for (let i = 0; i < Object.keys(refs).length - 1; i++) {
                element[i].current.hasAttribute('disabled')
                ? element[i].current.removeAttribute('disabled')
                : element[i].current.setAttribute('disabled', '')
            }
            applyBtn?.classList.contains('disabled')
            ? applyBtn.classList.remove('disabled')
            : applyBtn?.classList.add('disabled')
        }
    }
}

export default connect(mapState, mapDispatch)(Contact)