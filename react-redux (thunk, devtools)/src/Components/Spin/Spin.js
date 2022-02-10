import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Rings} from 'react-loader-spinner'

function Spin() {
    return <div className='loader-styles'>
        <Rings height={35} width={35} color='#0038D1' ariaLabel='loading'/>
    </div>
}

export default Spin