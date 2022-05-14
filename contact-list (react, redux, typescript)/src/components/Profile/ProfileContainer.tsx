import Profile from './Profile'
import {connect} from 'react-redux'
import {IContact} from '../../types/contacts'
import {TSetState} from '../../types/other'
import {ImExit} from 'react-icons/im'
import {BiUserCircle} from 'react-icons/bi'

const mapState = (_: any, props: {currentUser: string}) => {
    return {
        currentUser: props.currentUser,
        userSvg: <BiUserCircle size={35} style={{marginRight: '3px', color: 'rgb(36, 36, 36)'}}/>,
        exitSvg: <ImExit size={20} style={{padding: '1px 0 0 2.5px', color: 'rgb(31, 31, 31)'}}/>
    }
}

const mapDispatch = () => {
    return {
        searchElements: (
            word: string,
            value: string | [],
            props: IContact[] | undefined,
            setter: TSetState<IContact[] | undefined>
        ): void => {
            let filtered = props
            if (value !== '') {
                filtered = []
                props?.forEach(el => {
                    const convert = (element: string) => element.toLowerCase()
                    convert(el.name).search(convert(word)) !== -1 && filtered?.push(el)
                })
            } else filtered = props
            setter(filtered)
        },

        noteHandle: (
            id: string,
            state: string,
            setter: TSetState<string>
        ): void => {
            return state !== 'none'
            ? setter('none')
            : setter(id)
        },

        addContactHandle: (
            state: boolean,
            setter: TSetState<boolean>
        ): void => {
            return state === false
            ? setter(true)
            : setter(false)
        }
    }
}

export default connect(mapState, mapDispatch)(Profile)