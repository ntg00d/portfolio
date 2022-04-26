import React from 'react'
import {IUser} from './App'

interface IFormContainerProps {
    el: IUser
    toggle: () => void
}

export type TFormContainer = React.FC<IFormContainerProps>