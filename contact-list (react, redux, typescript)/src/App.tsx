import {useEffect} from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import ProfileContainer from './components/Profile/ProfileContainer'
import {useActions, useTypedSelector, useStorage} from './hooks'

const App = () => {
  const {initCurrentUser} = useActions()
  const {data} = useStorage()
  const {currentUser} = useTypedSelector(state => state.auth)

  useEffect(() => {
    initCurrentUser(data.currentUser)
  }, [currentUser])

  return (
    <div className="App">
      {!currentUser.length ? <Auth/> : <ProfileContainer currentUser={currentUser}/>}
    </div>
  )
}

export default App