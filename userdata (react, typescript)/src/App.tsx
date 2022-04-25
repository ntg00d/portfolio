import {useState, useEffect} from 'react'
import UsersItem from './components/UsersItem'
import {TApp, IUser} from './types/App'
import './App.css'

const App: TApp = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [searchName, setSearchName] = useState('')
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => setUsers(data))
  }, [])

  return (
    <div className='container'>
      <div className="content">
        <div className="sort__container">
          <div className="sort__content">
            <div className="sort__title">Сортировка</div>
            <div className="sort__actions">
              <input className="sort__input" placeholder='по имени' onChange={e => setSearchName(e.target.value)}/>
              <input className="sort__input" placeholder='по городу' onChange={e => setSearchCity(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="users">
          <div className="users__title">Список пользователей</div>
          <div className="users__list">
            {users.filter(el => {
              const template = (type: string, word: string) => type.toLowerCase().includes(word.toLowerCase())
              return template(el.name, searchName) && template(el.address.city, searchCity) && el
            }).map(el => <UsersItem key={el.id} el={el}/>)}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App