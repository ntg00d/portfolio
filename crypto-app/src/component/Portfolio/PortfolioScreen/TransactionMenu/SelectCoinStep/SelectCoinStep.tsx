import {FC, useState} from 'react'
import s from './SelectCoinStep.module.css'
import {useAppSelector} from '../../../../../hooks'
import {ISelectCoinStepProps} from '../../../../../models/props/Portfolio/PortfolioScreen/TransactionMenu/SelectCoinStep/SelectCoinStep'
import SelectCoinItem from './SelectCoinItem/SelectCoinItem'

const SelectCoinStep: FC<ISelectCoinStepProps> = ({coins, coinHandle}) => {
    const [searchCoin, setSearchCoin] = useState('')
    const {baseImgUrl} = useAppSelector(state => state.converter.currentCoin)

    return (
        <div className={s.selectCoinStep}>
            <div className={s.selectCoinStep__search}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchCoin}
                    onChange={(e) => setSearchCoin(e.target.value)}
                />
            </div>

            <div className={s.selectCoinStep__list}>
                {coins.filter(coin => {
                    const {Name, FullName} = coin
                    const wrapper = (el: string) => el.toLowerCase().includes(searchCoin.toLowerCase())
                    return wrapper(`${FullName} ${Name}`) || searchCoin === ''
                }).map(coin => (
                    <SelectCoinItem
                        key={coin.Name}
                        coin={coin}
                        coinHandle={coinHandle}
                        baseImgUrl={baseImgUrl}
                    />
                ))}
            </div>
        </div>
    )
}

export default SelectCoinStep