import {useState, useEffect} from 'react'
import ContactContainer from '../Contact/ContactContainer'
import AddNote from '../AddNote/AddNote'
import AddContactContainer from '../AddContact/AddContactContainer'
import {IContact} from '../../types/contacts'
import {TProfile} from '../../types/component'
import {useActions, useTypedSelector, useStorage} from '../../hooks'

const Profile: TProfile = ({
    currentUser,
    userSvg,
    exitSvg,
    searchElements,
    noteHandle,
    addContactHandle
}) => {
    const {deleteUser} = useStorage()
    const {fetchContactsFromServer, exitProfile, clearState} = useActions()
    const {contacts} = useTypedSelector(state => state.contacts)

    const [addContactToggle, setAddContactToggle] = useState<boolean>(false)
    const [noteToggle, setNoteToggle] = useState<string>('none')
    const [searchValue, setSearchValue] = useState<string | []>([])
    const [data, setData] = useState<IContact[] | undefined>([])

    useEffect(() => {
        clearState()
    }, [])

    useEffect(() => {
        fetchContactsFromServer(currentUser)
        setData(contacts)
    }, [contacts])

    return (
        <div className="profile">
            <div className="profile__top">
                <button className="profile__exit" onClick={() => {
                    deleteUser()
                    exitProfile()
                }}>{exitSvg}</button>
                <div className="profile__user">{userSvg} {currentUser}</div>
            </div>
            <div className="profile__actions">
                <input className="profile__search" onChange={(e) => {
                    setSearchValue(e.target.value)
                    searchElements(e.target.value, searchValue, contacts, setData)
                }} value={searchValue} type="text"/>
                
                <button className="profile__add-contact" onClick={() => {
                    addContactHandle(addContactToggle, setAddContactToggle)
                }}>+</button>

                {addContactToggle && <AddContactContainer
                    handle={() => addContactHandle(addContactToggle, setAddContactToggle)}
                    setter={setAddContactToggle}
                    currentUser={currentUser}
                />}
            </div>

            <div className="profile__contacts">
                {data?.length ? data.map(el => <div key={el.id} className="contact__root">
                    <ContactContainer
                        el={el}
                        currentUser={currentUser}
                        handle={() => noteHandle(el.id, noteToggle, setNoteToggle)}
                    />
                    {noteToggle === el.id && <AddNote
                        el={el}
                        currentUser={currentUser}
                        handle={() => noteHandle(el.id, noteToggle, setNoteToggle)}
                    />}
                </div>) : <div className="profile__empty-list">Пусто</div>}
            </div>
        </div>
    )
}

export default Profile