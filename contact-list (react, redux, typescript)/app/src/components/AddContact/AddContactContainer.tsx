import AddContact from './AddContact'
import {connect} from 'react-redux'
import {addContact} from '../../redux/action-creators/contacts'
import {TSetState} from '../../types/other'
import {RiUserAddLine} from 'react-icons/ri'

const mapState = (_: any, props: {
    handle: () => (state: boolean, setter: TSetState<boolean>) => void,
    setter: TSetState<boolean>,
    currentUser: string
}) => {
    return {
        handle: props.handle,
        currentUser: props.currentUser,
        addContactSvg: <RiUserAddLine style={{color: '#0038D1', marginRight: '2px'}}/>
    }
}

const mapDispatch = (_: any, props: {setter: TSetState<boolean>}) => {
    return {
        enterData: (
            name: string,
            phone: string,
            refs: any,
            currentUser: string,
            actionCreator: typeof addContact
        ) => {
            for (let key in refs) {
                refs[key].current.value === '' && (refs[key].current.placeholder = 'Введите данные')
            }
            if (name !== '' && phone !== '') {
                actionCreator(name, phone, `c${Math.floor(Math.random() * 99999)}`, currentUser)
                props.setter(false)
            }
        }
    }
}

export default connect(mapState, mapDispatch)(AddContact)