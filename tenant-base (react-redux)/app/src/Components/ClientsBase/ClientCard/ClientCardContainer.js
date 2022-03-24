import ClientCard from '../ClientCard/ClientCard'
import {connect} from 'react-redux'
import {changeInfoAC, deleteClientAC} from '../../../Redux/actions'
import {GoTrashcan} from 'react-icons/go'
import {RiEditLine} from 'react-icons/ri'
import {AiOutlineUser, AiOutlinePhone} from 'react-icons/ai'
import {HiOutlineMail, HiBadgeCheck} from 'react-icons/hi'

const mapState = (state, props) => {
    return {
        userSvg: <AiOutlineUser style={{transform:'translate(67%, 55%)'}} color='#0038D1' size='2.5em'/>,
        phoneSvg: <AiOutlinePhone style={{marginBottom:'4.5px', color:'#008B51'}}/>,
        mailSvg: <HiOutlineMail style={{marginBottom:'4px'}}/>,
        deleteSvg: <GoTrashcan style={{transform:'translate(440%, 88%)'}}/>,
        editSvg: <RiEditLine style={{transform:'translate(440%, 88%)'}}/>,
        applySvg: <HiBadgeCheck style={{transform:'translate(-21.5%, -11.5%)'}} color='#008B51' size='3.7em'/>,
        el: props.el,
        data: props.data
    }
}

const mapDispatch = (dispatch) => {
    return {
        confirmData: (address, initials, phone, email, id) => dispatch(changeInfoAC(address, initials, phone, email, id)),
        deleteClient: (address, id) => dispatch(deleteClientAC(address, id)),
        editInfo: (element, applyBtn, refs) => {
            for (let i = 0; i < Object.keys(refs).length - 1; i++) {
                element[i].current.hasAttribute('disabled')
                ? element[i].current.removeAttribute('disabled')
                : element[i].current.setAttribute('disabled', '')
            }
            applyBtn.classList.contains('disabled')
            ? applyBtn.classList.remove('disabled')
            : applyBtn.classList.add('disabled')
        }
    }
}

const ClientCardContainer = connect(mapState, mapDispatch)(ClientCard)
export default ClientCardContainer