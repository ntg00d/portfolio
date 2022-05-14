import AddClientContainer from '../AddClient/AddClientContainer'
import ClientCardContainer from '../ClientsBase/ClientCard/ClientCardContainer'
import {useState} from 'react'

function ClientsBase(props) {
    const [toggle, setToggle] = useState('off')
    const address = Object.keys(props.data)[0]
    const clientsInfo = Object.values(props.data)[0]
    
    return (
        <div className="clients-base">
            <div className="clients__top">
                <div className="clients__address">{address}</div>
                <button onClick={() => toggle === 'on' ? setToggle('off') : setToggle('on')} className="clients__open-form">{props.addClientSvg}</button>
            </div>
            <div className="clients__cards">
                {clientsInfo.length !== 0
                ? clientsInfo.map(el => <ClientCardContainer key={Math.floor(Math.random() * 99999)} el={el} data={props.data}/>)
                : <div className="clients__none">Список жильцов пуст.</div>}
            </div>
            
            <AddClientContainer address={address} toggle={toggle} setToggle={setToggle} smoothToggle={props.smoothToggle}/>
        </div>
    )
}

export default ClientsBase