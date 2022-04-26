import {useState} from 'react'

export const useInput = (initialValue?: string) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)
    return {value, onChange}
}