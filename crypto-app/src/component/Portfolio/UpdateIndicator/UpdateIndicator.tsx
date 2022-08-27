import {FC} from 'react'
import {FiLoader} from 'react-icons/fi'

const UpdateIndicator: FC = () => {
    return (
        <div className='menu__container'>
            <div className='menu__transparentBg'/>

            <div className='option__container'>
                <FiLoader
                    size={90}
                    style={{marginBottom: '110px'}}
                />
            </div>
        </div>
    )
}

export default UpdateIndicator