import {FC, useState} from 'react'
import s from './PortfolioCreate.module.css'
import {useCreatePortfolioMutation} from '../../../store/api/portfolioBase'
import {AiFillPlusCircle} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'

const PortfolioCreate: FC = () => {
    const [toggle, setToggle] = useState(false)
    const [name, setName] = useState('')
    const [createPortfolio] = useCreatePortfolioMutation()

    const menuHandle = () => {
        setToggle(!toggle)
    }

    return <>
        <button className={s.portfolio__create} onClick={menuHandle}>
            <AiFillPlusCircle/>
            <p>Create portfolio</p>
        </button>

        {toggle && (
            <div className="menu__container">
                <div className="menu__transparentBg"/>

                <div className={s.portfolio__createMenu}>
                    <div className={s.portfolio__createMenu_title}>
                        <p>Create portfolio</p>
                        <button onClick={menuHandle}>
                            <GrClose/>
                        </button>
                    </div>

                    <div className={s.portfolio__createMenu_enter}>
                        <p>Portfolio name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter your portfolio name...'
                            minLength={1}
                            maxLength={15}
                        />
                        <span>{name.length}/15 characters</span>
                    </div>

                    <button className={s.portfolio__createMenu_confirm} onClick={() => {
                        if (name.length > 0) {
                            createPortfolio(name)
                            menuHandle()
                        }
                    }}>
                        Create portfolio
                    </button>
                </div>
            </div>
        )}
    </>
}

export default PortfolioCreate