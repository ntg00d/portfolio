import Content from './Content'
import {connect} from 'react-redux'
import {loadStreetsAC, searchForMatchesAC} from '../../Redux/actions'
import {FaUserPlus} from 'react-icons/fa'
import {RiErrorWarningLine} from 'react-icons/ri'

const mapState = (state) => {
    return {
        dataState: state.dataRed,
        addClientSvg: <FaUserPlus size={17} style={{marginTop:'2px'}} color='rgb(65, 65, 65)'/>,
        warningSvg: <RiErrorWarningLine size={23} style={{margin: '2.3px 5px 0 0'}}/>
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadStreets: () => dispatch(loadStreetsAC()),
        searchForMatches: () => dispatch(searchForMatchesAC()),
        smoothToggle: (toggle) => {
            return toggle === 'on'
            ? {visibility: 'visible', opacity: 1, transition: 'all .13s'}
            : {visibility: 'hidden', opacity: 0, transition: 'all .13s'}
        }
    }
}

const ContentContainer = connect(mapState, mapDispatch)(Content)
export default ContentContainer