import Block from './Block'
import {connect} from 'react-redux'
import {loadHousesAC, loadFlatsAC, loadInputTextAC} from '../../Redux/actions'

const mapState = (state, props) => {
    return {
        data: props.data,
        uniqId: props.uniqId,
        inputPlaceholder: props.inputPlaceholder,
        inputValue: props.inputValue,
        blockType: props.blockType,
        error: state.stabilityRed.error,
        loading: state.stabilityRed.loading
    }
}

const mapDispatch = (dispatch) => {
    return {
        toggleFunction: (value, setter) => {
            return value === 'off' ? setter('on') : setter('off')
        },
        loadHouses: (e) => {
            const id = e.target.getAttribute('streetid')
            dispatch(loadHousesAC(id))
        },
        loadFlats: (e) => {
            const id = e.target.getAttribute('houseid')
            dispatch(loadFlatsAC(id))
        },
        changeValueOnClick: (type, value, setter) => {
            setter(value)
            dispatch(loadInputTextAC(type, value))
        },
        changeValueOnTextEntry: (event, setter) => {
            setter(event.target.value)
        },
        searchElements: (word, inputValue, propsData, setter) => {
            let filtered = propsData
            if (inputValue !== '') {
                filtered = []
                propsData.forEach(el => {
                    const convert = (element) => element.replace(/\s+/g, '').toLowerCase()
                    convert(el.name).search(convert(word)) !== -1 && filtered.push(el)
                })
            } else filtered = propsData
            setter(filtered)
        }
    }
}

const BlockContainer = connect(mapState, mapDispatch)(Block)
export default BlockContainer