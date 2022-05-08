import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useActions} from './hook/useActions'
import TableCol from './components/TableCol'
import TablePages from './components/TablePages'
import './App.css'

const App = () => {
  const [data, setData] = useState([])
  const [searchItem, setSearchitem] = useState('')
  const [sortToggle, setSortToggle] = useState({currentState: false, defaultState: false, event: null})

  const itemsWrapper = (id, title, body) => [{id}, {title}, {body}]
  const {fetchPosts, fetchPages} = useActions()
  const {posts, pages, totalCount, currentPage} = useSelector(state => state.main)

  useEffect(() => {
    fetchPosts(1)
  }, [])

  useEffect(() => {
    posts.length && setData(posts)
  }, [posts])

  useEffect(() => {
    totalCount !== 0 && fetchPages()
  }, [totalCount])

  return (
    <div className="container">
      <input className="search" placeholder='Поиск' onChange={e => {
        setSearchitem(e.target.value)
      }}/>

      <div className="table">
        <div className="table__item main-title">
            {itemsWrapper('ID', 'Title', 'Description').map((el, i) => (
              <TableCol
                key={i}
                type={'title'}
                uniq={Object.keys(el)[0]}
                info={el}
                toggle={sortToggle}
                handle={setSortToggle}
              />
            ))}
        </div>

        <div className="table__items">
          {[...data].sort((prev, next) => {
            const {currentState, event} = sortToggle

            if (currentState) {
              if (event === 'id') {
                return next.id - prev.id
              } else {
                if (prev[event] < next[event]) return -1
                if (prev[event] > next[event]) return 1
              }
            }
          }).filter(el => {
            const wrapper = (key) => el[key].toString().toLowerCase().includes(searchItem.toLowerCase())
            return searchItem === '' && el || (wrapper('id') || wrapper('title') || wrapper('body')) && el
          }).map(el => (
            <div key={el.id} className="table__item">
              {itemsWrapper(el.id, el.title, el.body).map((el, i) => (
                <TableCol
                  key={i}
                  type={'item'}
                  uniq={Object.keys(el)[0]}
                  info={el}
                />
              ))}
            </div>
          ))}
        </div>

        <TablePages
          data={pages}
          currentPage={currentPage}
          fetchPosts={fetchPosts}
        />
        
      </div>
    </div>
  )
}

export default App