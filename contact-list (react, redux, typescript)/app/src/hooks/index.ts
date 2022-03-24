import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {RootState} from '../redux/reducers'
import ActionCreators from '../redux/action-creators/index'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}

export const useStorage = () => {
    const getUser: any = localStorage.getItem('authState')
    const data = JSON.parse(getUser)
    const setUser = (payload: string) => localStorage.setItem('authState', JSON.stringify({currentUser: payload}))
    const deleteUser = () => localStorage.setItem('authState', JSON.stringify({currentUser: ''}))
    return {getUser, data, setUser, deleteUser}
}