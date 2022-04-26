import {useState, useEffect} from 'react'
import UsersItem from './components/UsersItem'
import Spinner from './components/Spinner'
import {TApp, IUser} from './types/App'
import './App.css'

const App: TApp = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loadState, setLoadState] = useState<boolean | string>(false)
  const [searchName, setSearchName] = useState('')
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    setLoadState(true)
    setTimeout(async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
        setLoadState(false)
      } catch (error) {
        console.log(error)
      }
    }, 1000)
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
          {loadState ? <div className="load-spinner"><Spinner/></div> : <>
            <div className="users__title">Список пользователей</div>
            <div className="users__list">
              {users.filter(el => {
                const template = (type: string, word: string) => type.toLowerCase().includes(word.toLowerCase())
                return template(el.name, searchName) && template(el.address.city, searchCity) && el
              }).map(el => <UsersItem key={el.id} el={el}/>)}
            </div>
          </>}
        </div>

      </div>
    </div>
  )
}

export default App