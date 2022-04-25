import React from 'react'
import {IUser} from './App'

interface IUsersItemProps {
    el: IUser
}

export type TUsersItem = React.FC<IUsersItemProps>