import AddClient from './AddClient'
import {connect} from 'react-redux'
import {addClientAC} from '../../Redux/actions'
import {RiUserAddLine} from 'react-icons/ri'

const mapState = (state, props) => {
    return {
        addClientSvg: <RiUserAddLine color='#0038D1' style={{marginRight:'8px'}}/>,
        address: props.address,
        toggle: props.toggle,
        setToggle: props.setToggle,
        smoothToggle: props.smoothToggle
    }
}

const mapDispatch = (dispatch) => {
    return {
        enterData: (address, initialsValue, phoneValue, emailValue, refs, setter) => {
            for (let key in refs) {
                refs[key].current.value === '' && (refs[key].current.placeholder = 'Введите данные')
            }
            if (phoneValue !== '' && emailValue !== '' && initialsValue !== '') {
                dispatch(addClientAC(address, initialsValue, phoneValue, emailValue, Math.floor(Math.random() * 99999)))
                setter('off')
            }
        }
    }
}

const AddClientContainer = connect(mapState, mapDispatch)(AddClient)
export default AddClientContainer