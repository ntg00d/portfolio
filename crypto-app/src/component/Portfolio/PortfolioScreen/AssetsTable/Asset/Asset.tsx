import {FC, useState} from 'react'
import s from './Asset.module.css'
import {useFetchMarketCapsQuery} from '../../../../../store/api/currencies'
import {useOperation} from '../../../../../hooks'
import {IAssetProps} from '../../../../../models/props/Portfolio/PortfolioScreen/Asset/Asset'
import TransactionsTable from './TransactionsTable/TransactionsTable'
import {FaTrashAlt} from 'react-icons/fa'

const Asset: FC<IAssetProps> = ({asset, baseImgUrl}) => {
    const {name, fullName, img, price, totalAmount, transactions} = asset
    const {removeAsset} = useOperation()
    const [menuToggle, setMenuToggle] = useState(false)

    const menuHandle = () => {
        setMenuToggle(!menuToggle)
    }

    const {
        data: marketCaps,
        isSuccess: marketCapsIsSuccess
    } = useFetchMarketCapsQuery({
        coin: name,
        currency: 'USD',
        days: 1
    })

    const dayProffit = () => (
        marketCapsIsSuccess && Number(marketCaps.map(cap => cap.close)
        .reduce((prev, current) => (current - prev) / current * 100)
        .toFixed(2))
    )

    return <>
        <div className={s.asset} onClick={menuHandle}>
            <div className={s.asset__name}>
                <img src={baseImgUrl + img} alt="coin"/>
                <p>{fullName} <span>{name}</span></p>
            </div>

            <div className={s.asset__dayProffit} style={{
                color: dayProffit() > 0
                ? 'rgb(0, 136, 72)'
                : 'rgb(255, 76, 74)'
            }}>
                <p>{dayProffit()}%</p>
            </div>

            <div className={s.asset__price}>
                <p>${price}</p>
            </div>

            <div className={s.asset__holdings}>
                <p>${(totalAmount * price).toFixed(2)}</p>
                <h4>{totalAmount} {name}</h4>
            </div>

            <div className={s.asset__remove}>{
                <button onClick={(e) => {
                    e.stopPropagation()
                    removeAsset(name)
                }}><FaTrashAlt/></button>
            }</div>
        </div>

        {menuToggle && (
            <TransactionsTable
                menuHandle={menuHandle}
                assetInfo={{coin: name, price, totalAmount}}
                transactions={transactions}
            />
        )}
    </>
}

export default Asset