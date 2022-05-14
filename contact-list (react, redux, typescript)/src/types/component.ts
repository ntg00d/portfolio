import React from "react"
import {IContact} from "./contacts"

interface IProfileProps {
    currentUser: string
    searchElements: Function
    noteHandle: Function
    addContactHandle: Function
    
    userSvg: JSX.Element
    exitSvg: JSX.Element
}

interface IContactProps {
    el: IContact
    currentUser: string
    handle: Function
    showInfo: Function
    contactModeHandle: Function
    
    noteSvg: JSX.Element
    changeSvg: JSX.Element
    deleteSvg: JSX.Element
    applySvg: JSX.Element
}

interface IAddContactProps {
    handle: Function
    currentUser: string
    addContactSvg: JSX.Element
    enterData: Function
}

interface IAddNoteProps {
    el: IContact
    currentUser: string
    handle: Function
}

export type TProfile = React.FC<IProfileProps>
export type TContact = React.FC<IContactProps>
export type TAddContact = React.FC<IAddContactProps>
export type TAddNote = React.FC<IAddNoteProps>