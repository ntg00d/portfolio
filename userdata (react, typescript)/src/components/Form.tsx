import {TForm} from '../types/Form'
import FormItem from './FormItem'

const Form: TForm = ({
    toggle,
    modeToggle,
    setModeToggle,
    formItems,
    handleSubmit,
    title
}) => {
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__top">
                <div className="form__top_title">{title ? 'Данные выведены в консоль' : 'Профиль пользователя'}</div>
                <div className="form__top_actions">
                   <button type='button' className="form__top_edit" onClick={setModeToggle} disabled={modeToggle}>Редактировать</button>
                   <button className="form__top_apply">Отправить</button>
                </div>
                <button className="form__top_exit" onClick={toggle}>×</button>
            </div>

            <div className="form__items">
                {formItems.map(el => (
                    <FormItem
                        key={el.title}
                        el={el}
                        uniq={el.title == 'Comment' ? 'comment' : ''}
                        modeToggle={modeToggle}
                    />
                ))}
            </div>
        </form>
    )
}

export default Form