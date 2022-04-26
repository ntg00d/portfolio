import React, {useState} from 'react'
import {TFormContainer} from '../types/FormContainer'
import Form from './Form'

const FormContainer: TFormContainer = ({el, toggle}) => {
    const [modeToggle, setModeToggle] = useState(false)
    const [title, setTitle] = useState(false)

    const formItems = [
        {title: 'Name', info: el.name},
        {title: 'Username', info: el.username},
        {title: 'E-mail', info: el.email},
        {title: 'Street', info: el.address.street},
        {title: 'City', info: el.address.city},
        {title: 'Zip code', info: el.address.zipcode},
        {title: 'Phone', info: el.phone},
        {title: 'Website', info: el.website},
        {title: 'Comment', info: ''}
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const form = Object.fromEntries(data.entries())
        let tumbler = true

        for (const child of e.currentTarget.elements) {
            if (child.hasAttribute('name') && !child.classList.contains('comment')) {
                if (!child.value.length) {
                    child.classList.add('abort')
                    child.placeholder = 'Заполните поле'
                    tumbler = false
                } else {
                    child.classList.remove('abort')
                    child.placeholder = ''
                }
            }
        }

        if (tumbler) {
            setModeToggle(!modeToggle)
            console.log(form)
            setTitle(true)
            setTimeout(() => setTitle(false), 2000)
        }
    }

    return <Form
        toggle={toggle}
        modeToggle={modeToggle}
        setModeToggle={() => setModeToggle(!modeToggle)}
        formItems={formItems}
        handleSubmit={handleSubmit}
        title={title}
    />
}

export default FormContainer