import Spin from '../../Spin/Spin'
import {useEffect} from 'react'

function BlockResults(props) {
    const {toggle, smoothToggle, loading, error, data, blockType, toggleFunction, setToggle, changeValueOnClick, loadHouses, loadFlats, setInputValue} = props
    useEffect(() => setToggle('on'), [data])

    return <>
        <div style={smoothToggle(toggle)} className="results">
            {error.length === 0 ? (
                data.length !== 0 ? data.map(el => {
                    switch (blockType) {
                        case 'streets':
                            return <button onClick={(e) => {
                                loadHouses(e)
                                toggleFunction()
                                changeValueOnClick(blockType, el.name, setInputValue)
                            }} key={el.id} streetstype={blockType} streetid={el.id} className="result">{el.name}</button>
                            
                        case 'houses':
                            return <button onClick={(e) => {
                                loadFlats(e)
                                toggleFunction()
                                changeValueOnClick(blockType, el.name, setInputValue)
                            }} key={el.id} housestype={blockType} houseid={el.id} className="result">{el.name}</button>

                        case 'flats':
                            return <button onClick={() => {
                                toggleFunction()
                                changeValueOnClick(blockType, el.name, setInputValue)
                            }} key={el.id} flatstype={blockType} className="result">{el.name}</button>
                    }
                }) : (loading === true
                    ? <button className="result loading"><Spin/></button>
                    : <button className="result result-null">Пусто</button>)
            ) : <button className="result result-error">Произошла ошибка</button>}
        </div>
    </>
}

export default BlockResults