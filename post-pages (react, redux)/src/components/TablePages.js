import React from 'react'

const TablePages = ({data, currentPage, fetchPosts}) => {
    const route = (limit, step) => {
        return currentPage !== limit
        ? fetchPosts((currentPage + step))
        : null
    }

    return (
        <div className="table__pages">
            <button className="nav-btn" onClick={() => route(1, (-1))}>Назад</button>

            {data.map(el => (
                <button key={el} className="table__page" style={
                    currentPage === el
                    ? {backgroundColor: 'green'}
                    : null
                } onClick={() => fetchPosts(el)}>{el}</button>
            ))}

            <button className="nav-btn" onClick={() => route(10, 1)}>Далее</button>
        </div>
    )
}

export default TablePages