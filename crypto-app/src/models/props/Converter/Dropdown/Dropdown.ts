import {AnyElement} from '../..'
import {ICurrentElement} from '../../../reducers/converter/state'

export interface IDropdownProps {
    elements: AnyElement[]
    elementHandle: (...args: string[]) => void
    currentElement: ICurrentElement
    baseImgUrl: string
    dropdownToggle: boolean
    dropdownHandle: () => void
}