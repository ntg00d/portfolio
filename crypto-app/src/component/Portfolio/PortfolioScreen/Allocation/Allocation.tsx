import {FC} from 'react'
import s from './Allocation.module.css'
import {useBalance, usePortfolio} from '../../../../hooks'

const Allocation: FC = () => {
    const portfolio = usePortfolio()
    const portfolioBalance = useBalance(portfolio.id)

    const allocationItems = portfolio.assets.map(asset => {
        const {name, price, totalAmount} = asset

        const getRandomColor = () => {
            let color = '#'
            let letters = '0123456789ABCDEF'
            for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
            return color
        }

        return {
            name,
            percent: ((totalAmount >= 0
                ? price * totalAmount
                : 0
            ) * 100) / portfolioBalance || 0,
            color: getRandomColor()
        }
    })

    return (
        <div className={s.allocation}>
            <div className={s.allocation__bar}>
                {allocationItems.map(item => {
                    const {name, percent, color} = item
                    return <span key={name} style={{
                        width: percent + '%',
                        backgroundColor: color
                    }}/>
                })}
            </div>

            <div className={s.allocation__marks}>
                {allocationItems.map(item => {
                    const {name, percent, color} = item
                    return <div key={name} className={s.allocation__mark}>
                        <span className={s.allocation__markDot} style={{backgroundColor: color}}/>

                        <span className={s.allocation__markName}>
                            {name}
                        </span>
                        
                        <span className={s.allocation__markPercent}>
                            {percent.toFixed(2) + '%'}
                        </span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Allocation