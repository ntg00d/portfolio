import {FC} from 'react'
import s from './Chart.module.css'
import {useActions, useAppSelector} from '../../../hooks'
import {useFetchMarketCapsQuery} from '../../../store/api/currencies'
import Chart from './Chart'

const ChartWrapper: FC = () => {
    const {currentCoin, currentCurrency, days} = useAppSelector(state => state.converter)
    const {setDays} = useActions()

    const {data: caps, isSuccess: marketCapsIsSuccess} = useFetchMarketCapsQuery({
        coin: currentCoin.name,
        currency: currentCurrency.name,
        days: days
    })

    return (
        <div className={s.chart__container}>
            <div className={s.historyBtns}>
                {[
                    {title: '24H', days: 1},
                    {title: '7D', days: 7},
                    {title: '14D', days: 14},
                    {title: '1M', days: 30},
                    {title: '1Y', days: 365}
                ].map(el => (
                    <button
                        className={s.historyBtn}
                        key={el.days}
                        style={{
                            backgroundColor: days == el.days
                            ? 'rgb(186, 186, 186)'
                            : ''
                        }}
                        onClick={() => setDays(el.days)}
                    >{el.title}</button>
                ))}
            </div>

            {marketCapsIsSuccess && (
                <Chart
                    caps={caps}
                    currentCoin={currentCoin.name}
                    currentCurrency={currentCurrency.name}
                />
            )}
        </div>
    )
}

export default ChartWrapper