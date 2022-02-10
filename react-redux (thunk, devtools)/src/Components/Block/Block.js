import BlockResults from './BlockResults/BlockResults'
import {useState, useEffect} from 'react'

function Block(props) {
    const {changeValueOnTextEntry, toggleFunction, uniqId, searchElements, data} = props
    const [toggle, setToggle] = useState('on')
    const [inputValue, setInputValue] = useState([])
    const [currentData, setData] = useState([])
    useEffect(() => data.length !== 0 && setData(data), [data])

    return <>
        <div className="block">
            <form onSubmit={(e) => e.preventDefault()} className={`form form${uniqId}`}>
                <input onChange={(e) => {
                    changeValueOnTextEntry(e, setInputValue)
                    searchElements(e.target.value, inputValue, data, setData)
                }} type="text" value={inputValue} placeholder={props.inputPlaceholder} className={`input-text input-text${uniqId}`}/>
                <input onClick={() => toggleFunction(toggle, setToggle)} type="button" value={toggle === 'off' ? '∨' : '∧'} className={`show-results show-results${uniqId}`}/>
            </form>

            <BlockResults
                blockType={props.blockType}
                uniqId={uniqId}
                data={currentData}
                error={props.error}
                loading={props.loading}

                toggle={toggle}
                toggleFunction={() => toggleFunction(toggle, setToggle)}
                setToggle={setToggle}
                smoothToggle={props.smoothToggle}
                inputValue={inputValue}
                setInputValue={setInputValue}

                loadHouses={props.loadHouses}
                loadFlats={props.loadFlats}
                loadInputText={props.loadInputText}
                changeValueOnClick={props.changeValueOnClick}
            />
        </div>
    </>
}

export default Block