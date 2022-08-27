import {ICurrency} from '..'
import {ICoin} from '../../api/coin'

export interface IConverterProps {
    coins: ICoin[]
    currencies: ICurrency[]
}