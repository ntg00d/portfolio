import React, {useState, useEffect} from 'react'
import {useActions, useStorage} from '../../hooks'

const Auth: React.FC = () => {
    const {initCurrentUser} = useActions()
    const [inputState, setInputState] = useState({value: '', fail: false})
    const {getUser, setUser} = useStorage()

    useEffect(() => {
        !getUser && setUser('')
    }, [])

    return (
        <div className='auth__container'>
            <form onSubmit={(e) => e.preventDefault()} className='auth__form' action=''>
                <div className="auth__title">Введите имя</div>
                
                <input className='auth__input' type='text'
                    value={inputState.value}
                    placeholder={inputState.fail ? 'Минимум 4 символа' : ''}
                    onChange={(e) => {
                    setInputState({...inputState, value: e.target.value})
                }}/>

                <button className='auth__confirm' onClick={() => {
                    if (inputState.value.length > 3) {
                        setUser(inputState.value)
                        initCurrentUser(inputState.value)
                    } else setInputState({value: '', fail: true})
                }}>Продолжить</button>
            </form>
        </div>
    )
}

export default Auth