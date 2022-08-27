import {FC} from 'react'
import s from './AssetsTable.module.css'
import s2 from './Asset/Asset.module.css'
import {useAppSelector, usePortfolio} from '../../../../hooks'
import Asset from './Asset/Asset'

const AssetsTable: FC = () => {
    const portfolio = usePortfolio()
    const {baseImgUrl} = useAppSelector(state => state.converter.currentCoin)

    return (
        <div className={s.assets__table}>
            <h2>Your assets</h2>

            <div className={`${s2.assets__title} ${s2.asset}`}>
                {['Name', '24H', 'Price', 'Holdings', 'Remove'].map(title => (
                    <div key={title}>{title}</div>
                ))}
            </div>

            <div className={s.assets__list}>
                {portfolio.assets.map(asset => (
                    <Asset
                        key={asset.id}
                        asset={asset}
                        baseImgUrl={baseImgUrl}
                    />
                ))}
            </div>
        </div>
    )
}

export default AssetsTable