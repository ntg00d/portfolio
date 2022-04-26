import {useInput} from '../hooks'
import {TFormItem} from '../types/FormItem'

const FormItem: TFormItem = ({el, uniq, modeToggle}) => {
    const input = useInput(el.info)

    return (
        <div className='form__item'>
            <h5 className='form__title'>{el.title}</h5>
            <textarea name={el.title} className={`form__textarea ${uniq}`} {...input} readOnly={!modeToggle}/>
        </div>
    )
}

export default FormItem