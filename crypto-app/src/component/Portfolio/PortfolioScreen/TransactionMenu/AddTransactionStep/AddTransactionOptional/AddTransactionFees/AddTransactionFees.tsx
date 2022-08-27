import {FC, useState} from 'react'
import s from './AddTransactionFees.module.css'
import {useOutside} from '../../../../../../../hooks'
import {IAddTransactionFeesProps} from '../../../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/AddTransactionStep/AddTransactionOptional/AddTransactionFees'
import {BiTransferAlt} from 'react-icons/bi'

const AddTransactionFees: FC<IAddTransactionFeesProps> = ({changeFees}) => {
    const {ref, isShow, setIsShow} = useOutside(false)
    const [inputValue, setInputValue] = useState(0)

    const windowHandle = () => {
        setIsShow(!isShow)
    }

    return <>
        <button onClick={windowHandle}>
            <BiTransferAlt/> Fee
        </button>

        {isShow && (
            <div ref={ref} className={`${s.feeWindow} option__container`}>
                <div className={s.feeWindow__enter}>
                    <span>$</span>
                    <input
                        type="number"
                        min={0}
                        style={{borderColor: inputValue < 0 ? 'red' : ''}}
                        value={inputValue}
                        onChange={(e) => setInputValue(Number(e.target.value))}
                    />
                </div>

                <button className={s.feeWindow__confirm} onClick={() => {
                    if (inputValue >= 0) {
                        changeFees(inputValue)
                        windowHandle()
                    }
                }}>Add fee</button>
            </div>
        )}
    </>
}

export default AddTransactionFees