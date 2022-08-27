import {FC, useState} from 'react'
import {useFetchCoinsQuery} from './store/api/currencies'
import Converter from './component/Converter/Converter'
import Portfolio from './component/Portfolio/Portfolio'

const App: FC = () => {
  const toggleItems = ['Converter', 'Portfolio']
  const [toggle, setToggle] = useState(toggleItems[0])

  const {data: coins, isSuccess} = useFetchCoinsQuery()

  const currencies = [
    {Name: 'USD', ImageUrl: '624/yj2akvvh3r2fm7qkcuq3cxc4b19qcdxm.jpg'},
    {Name: 'EUR', ImageUrl: 'b24/ekj0umr5mixnert3px3x2pipe9vcmn1c.jpg'},
    {Name: 'RUB', ImageUrl: 'dec/1wpb075s5mw6tyzjdys61psu3cdh2fo7.jpg'},
    {Name: 'UAH', ImageUrl: 'cde/ka737dl6uj0o0r6g9mrakgvo8ul281gy.jpg'},
    {Name: 'CNY', ImageUrl: '0c4/1qe42nz566g5ef9he2g5oo1u7uxjazeu.jpg'}
  ]

  return (
    <div className="container">
      <div className="toggles">
        {toggleItems.map(item => (
          <button
            key={item}
            className="toggles__btn"
            style={{fontWeight: toggle === item ? '700' : ''}}
            onClick={() => setToggle(item)}
          >{item}</button>
        ))}
      </div>

      <div className="content">
        {isSuccess && (
          toggle === 'Converter'
          ? <Converter coins={coins} currencies={currencies}/>
          : <Portfolio coins={coins}/>
        )}
      </div>
    </div>
  )
}

export default App