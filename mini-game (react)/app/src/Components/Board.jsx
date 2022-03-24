import React, {useEffect, useState} from 'react'

const Board = (props) => {
    let {totalSquares, colors, process, randomize, calculation} = props

    const [state, setState] = useState(totalSquares)
    const [classes, toggleClasses] = useState('square hidden')
    const [loses, calcLoses] = useState(0)
    const [result, setResult] = useState(false)

    useEffect(() => setState(randomize(state)), [loses])

    return <>
        {result === true && <div className='finish'>Победа</div>}
        <div className='info'>
            <div className='info__loses'>Loses: {loses}</div>
            <div className='info__tumbler'>
                <input onClick={() => classes === 'square' ? toggleClasses('square hidden') : toggleClasses('square')} className='info__input' type="checkbox"/>
                <div className='info__text'>Показать цвета</div>
            </div>
        </div>
        <div className='board'>
            {totalSquares.map(el => (
                <button
                    className={classes}
                    key={state[el]}
                    onClick={e => calculation(e, process, calcLoses, true, setResult)}
                    style={{backgroundColor: `#${colors[Math.floor(state[el]/2)]}`}}>
                    •
                </button>
            ))}
        </div>
    </>
}

export default Board