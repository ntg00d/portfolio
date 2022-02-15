import ClientsBase from '../ClientsBase/ClientsBase'
import BlockContainer from '../Block/BlockContainer'
import {useEffect} from 'react'

function Content(props) {
    const {streets, houses, flats, streetValue, houseValue, flatValue, foundElement} = props.dataState
    useEffect(() => props.loadStreets(), [BlockContainer])

    const template = (id, type, placeholder, value, data) => <BlockContainer uniqId={id} blockType={type} inputPlaceholder={placeholder} inputValue={value} data={data} smoothToggle={props.smoothToggle}/>

    return <>
        <div className="content">
            <div className="inputs">
                {template(1, 'streets', 'Улица', streetValue, streets)}
                {template(2, 'houses', 'Дом', houseValue, houses)}
                {template(3, 'flats', 'Квартира / офис', flatValue, flats)}
                <button className="load-info" onClick={props.searchForMatches}>Загрузить</button>
            </div>
            
            {foundElement.length !== 0 && <ClientsBase data={foundElement} addClientSvg={props.addClientSvg} smoothToggle={props.smoothToggle}/>}
        </div>

        <div className='notice'>
            <div className='notice__title'>Адреса для теста:</div>
            <ul className='notice__ul'>
                <li className='notice__li'>2134 км, 1, 1</li>
                <li className='notice__li'>Демонстрационная, 2к1, 22</li>
                <li className='notice__li'>25 лет Октября, 34, 1</li>
                <li className='notice__li'>50 лет ВЛКСМ, 13к1, 1</li>
                <li className='notice__li'>Авторемонтная, 23, 2</li>
            </ul>
            <div className='notice__info'>
                <div className="notice__info_img">{props.warningSvg}</div>
                <div className="notice__info_text">База жильцов была создана в Redux для имитации сервера, т.к. некоторые API оказались нерабочими.</div>
            </div>
        </div>
    </>
}

export default Content