import React from 'react'

const TableCol = ({info, type, uniq, toggle, handle}) => {
    const key = Object.keys(info)[0]
    const value = Object.values(info)[0]

    if (type === 'title') {
        const {currentState, defaultState, event} = toggle

        const handler = () => {
            return event === key
            ? handle(prev => ({...prev, currentState: !currentState}))
            : handle(prev => ({...prev, currentState: !defaultState, event: key}))
        }

        return (
            <div className={`table__col_${uniq}`} style={{
                userSelect: 'none',
                color: '#fff'
            }} onClick={handler}>
                {value}
                <span>{(currentState && event === key) ? '∧' : '∨'}</span>
            </div>
        )
    } else return <div className={`table__col_${uniq}`}>{value}</div>
}

export default TableCol