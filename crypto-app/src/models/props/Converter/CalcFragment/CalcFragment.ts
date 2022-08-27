import {AnyElement} from '../..'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import {ICurrentElement} from '../../../reducers/converter/state'
import {ICurrentElementPL, IElementValuePL} from '../../../reducers/converter/payloads'

export interface ICalcFragmentProps {
    type: string
    elements: AnyElement[]
    currentElement: ICurrentElement
    setCurrentElement: ActionCreatorWithPayload<ICurrentElementPL>
    enterElementValue: ActionCreatorWithPayload<IElementValuePL>
    baseImgUrl: string
}