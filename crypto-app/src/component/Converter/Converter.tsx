import {FC, useEffect} from 'react'
import s from './Converter.module.css'
import {useActions, useAppSelector} from '../../hooks'
import {useFetchPriceQuery} from '../../store/api/currencies'
import {IConverterProps} from '../../models/props/Converter/Converter'
import CalcFragment from './CalcFragment/CalcFragment'
import ChartWrapper from './Chart/ChartWrapper'

const Converter: FC<IConverterProps> = ({coins, currencies}) => {
    const {currentCoin, currentCurrency, price} = useAppSelector(state => state.converter)
    const {setCurrentElement, enterElementValue, setCurrentPrice, equalValues} = useActions()

    const {data: fetchedPrice, isSuccess} = useFetchPriceQuery({
        coin: currentCoin.name,
        currency: currentCurrency.name
    })
    
    useEffect(() => {
        isSuccess && setCurrentPrice(fetchedPrice)
    }, [fetchedPrice])

    useEffect(() => {
        equalValues()
    }, [currentCoin, currentCurrency, price])

    const calcFragmentProps = {
        enterElementValue,
        setCurrentElement
    }

    return <>
        {coins.length && (
            <div className={s.converter}>
                <div className={s.converter__blocks}>
                    <CalcFragment
                        type='coin'
                        elements={coins}
                        currentElement={currentCoin}
                        baseImgUrl={currentCoin.baseImgUrl}
                        {...calcFragmentProps}
                    />

                    <div className={s.converter__equal}>=</div>

                    <CalcFragment
                        type='currency'
                        elements={currencies}
                        currentElement={currentCurrency}
                        baseImgUrl={currentCurrency.baseImgUrl}
                        {...calcFragmentProps}
                    />
                </div>

                <ChartWrapper/>
            </div>
        )}
    </>
}

export default Converter