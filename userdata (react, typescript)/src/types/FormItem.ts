import React from 'react'
import {IFormItem} from './Form'

interface IFormItemProps {
    el: IFormItem
    uniq: string
    modeToggle: boolean
}

export type TFormItem = React.FC<IFormItemProps>