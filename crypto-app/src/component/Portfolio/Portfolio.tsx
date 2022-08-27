import {FC, useEffect} from 'react'
import s from './Portfolio.module.css'
import s2 from './PortfolioLink/PortfolioLink.module.css'
import {useFetchPortfoliosQuery} from '../../store/api/portfolioBase'
import {useLazyFetchMultipriceQuery} from '../../store/api/currencies'
import {useActions, useAppSelector} from '../../hooks'
import {IPortfolioProps} from '../../models/props/Portfolio/Portfolio'
import PortfolioLink from './PortfolioLink/PortfolioLink'
import PortfolioScreen from './PortfolioScreen/PortfolioScreen'
import PortfolioCreate from './PortfolioCreate/PortfolioCreate'
import UpdateIndicator from './UpdateIndicator/UpdateIndicator'
import {IoIosAlbums} from 'react-icons/io'

const Portfolio: FC<IPortfolioProps> = ({coins}) => {
    const {data: fetchedPortfolios, isSuccess: portfoliosIsSuccess} = useFetchPortfoliosQuery()
    const [fetchMultiprice, {data: fetchedMultiprice}] = useLazyFetchMultipriceQuery()

    const {uploadPortfolios, setCurrentPortfolio, updateAssetPrices} = useActions()
    const {portfolios, currentPortfolio, updateIndicator} = useAppSelector(state => state.portfolio)

    useEffect(() => {
        portfoliosIsSuccess && uploadPortfolios(fetchedPortfolios)
    }, [fetchedPortfolios])

    useEffect(() => {
        if (portfolios.length) {
            const getParams = () => {
                const tickers = new Set(portfolios.map(portfolio => (
                    portfolio.assets.map(asset => asset.name)
                )).flat())
                const uniqueTickers: string[] = []
                tickers.forEach(ticker => uniqueTickers.push(ticker))
                return uniqueTickers.join()
            }

            fetchMultiprice(getParams())
            !currentPortfolio.length && setCurrentPortfolio(portfolios[0].id)
        }
    }, [portfolios])

    useEffect(() => {
        fetchedMultiprice && updateAssetPrices(fetchedMultiprice)
    }, [fetchedMultiprice])

    return (
        <div className={s.portfolio}>
            <div className={s.portfolio__menu}>
                <div className={`${s2.portfolio__total} ${s2.portfolio__link}`}>
                    <div className={s2.portfolio__link_icon}>
                        <IoIosAlbums/>
                    </div>
                    <div className={s2.portfolio__link_info}>
                        <h4>All portfolios</h4>
                        <h6>
                            <span>$</span>
                            {Number(portfolios.map(portfolio => portfolio.assets
                            .map(asset => asset.price * asset.totalAmount)
                            .reduce((prev, current) => prev + current, 0))
                            .reduce((prev, current) => prev + current, 0)
                            .toFixed(2))}
                        </h6>
                    </div>
                </div>

                <span/>

                <div className={s.portfolio__links}>
                    {portfolios.map(portfolio => (
                        <PortfolioLink
                            key={portfolio.id}
                            portfolio={portfolio}
                        />
                    ))}
                </div>

                <PortfolioCreate/>
            </div>

            {currentPortfolio.length ? (
                <PortfolioScreen coins={coins}/>
            ) : 'Loading...'}

            {updateIndicator && <UpdateIndicator/>}
        </div>
    )
}

export default Portfolio