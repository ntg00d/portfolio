import {FC, useState} from 'react'
import s from './AddTransactionDate.module.css'
import {useOutside} from '../../../../../../../hooks'
import {IAddTransactionDateProps} from '../../../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/AddTransactionStep/AddTransactionOptional/AddTransactionDate'
import {MdOutlineDateRange} from 'react-icons/md'

const AddTransactionDate: FC<IAddTransactionDateProps> = ({
    date,
    changeDate,
    convertedDate
}) => {
    const {ref, isShow, setIsShow} = useOutside(false)

    const outsideHandle = () => {
        setIsShow(!isShow)
    }

    const [{year, month, day, hours, minutes}, setPickedDate] = useState({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes()
    })

    const updatePickedDate = (field: string, value: number) => {
        setPickedDate(prev => ({...prev, [field]: value}))
    }

    const getList = (value: number, start: number) => {
        const elements = []
        for (let i = start; i <= value; i++) elements.push(i)
        return elements
    }

    const pickedItemStyle = (item: number, state: number) => (
        item === state ? {
            color: 'rgb(230, 230, 230)',
            backgroundColor: 'rgb(41, 41, 41)',
            border: 'none'
        } : {}
    )

    return <>
        <button onClick={outsideHandle}>
            <MdOutlineDateRange/>
            {convertedDate().getFullDate}
        </button>

        {isShow && (
            <div ref={ref} className={`${s.datePicker} option__container`}>
                <div className={s.datePicker__selection}>
                    <div className={s.datePicker__selectDate}>
                        {[
                            {
                                paragraph: 'Month',
                                args: [11, 0],
                                item: month,
                                field: 'month',
                                title: (el: number) => convertedDate().getMonthNames[el]
                            },
                            {
                                paragraph: 'Day',
                                args: [new Date(year, month + 1, 0).getDate(), 1],
                                item: day,
                                field: 'day',
                                title: (el: number) => el
                            },
                            {
                                paragraph: 'Year',
                                args: [new Date().getFullYear(), 2012],
                                item: year,
                                field: 'year',
                                title: (el: number) => el
                            }
                        ].map(obj => {
                            const {paragraph, args, item, field, title} = obj

                            return <div key={field} className={s.datePicker__col}>
                                <p>{paragraph}</p>
                                <div className={s.datePicker__list}>
                                    {getList(args[0], args[1]).sort((a, b) => (
                                        field === 'year'
                                        ? b - a
                                        : a - b
                                    )).map(el => (
                                        <button
                                            key={el}
                                            className={s.datePicker__item}
                                            style={pickedItemStyle(el, item)}
                                            onClick={() => updatePickedDate(field, el)}
                                        >{title(el)}</button>
                                    ))}
                                </div>
                            </div>
                        })}

                    </div>
                    <div className={s.datePicker__selectTime}>
                        {[
                            {
                                paragraph: 'Hours',
                                args: [23, 0],
                                item: hours,
                                field: 'hours'
                            },
                            {
                                paragraph: 'Minutes',
                                args: [59, 0],
                                item: minutes,
                                field: 'minutes'
                            }
                        ].map(obj => {
                            const {paragraph, args, field, item} = obj

                            return <div key={field} className={s.datePicker__col}>
                                <p>{paragraph}</p>
                                <div className={s.datePicker__list}>
                                    {getList(args[0], args[1]).map(el => (
                                        <button
                                            key={el}
                                            className={s.datePicker__item}
                                            style={pickedItemStyle(el, item)}
                                            onClick={() => updatePickedDate(field, el)}
                                        >{field === 'minutes' && el < 10 && 0}{el}</button>
                                    ))}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <button className={s.datePicker__confirm} onClick={() => {
                    changeDate(new Date(year, month, day, hours, minutes))
                    outsideHandle()
                }}>
                    Change date & time
                </button>
            </div>
        )}
    </>
}

export default AddTransactionDate