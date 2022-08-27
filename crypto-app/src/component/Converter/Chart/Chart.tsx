import {FC} from 'react'
import s from './Chart.module.css'
import {Chart as ChartJS, registerables} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {IChartProps} from '../../../models/props/Converter/Chart/Chart'

const Chart: FC<IChartProps> = ({caps, currentCoin, currentCurrency}) => {
  ChartJS.register(...registerables)

  const data = {
    labels: caps.map(cap => {
      const time = new Date(cap.time * 1000)
      const day = time.getDate()
      const month = time.getMonth() + 1
      const year = time.getFullYear()
      const wrapper = (value: number) => value < 10 ? '0' + value : value
      return `${wrapper(month)}.${wrapper(day)}.${year}`
    }),
    datasets: [{
      label: `Rate ${currentCoin} in ${currentCurrency}`,
      data: caps.map(cap => cap.close),
      backgroundColor: ['#cf0064'],
      borderColor: ['#db396a'],
      borderWidth: 1,
      tension: .2,
      pointRadius: .6,
    }]
  }

  return (
    <div className={s.chart}>
      <Line data={data} options={{responsive: true}}/>
    </div>
  )
}

export default Chart