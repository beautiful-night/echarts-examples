import { objectOrArray, buildOptions } from './common'

//@ts-ignore
import xAxisOptions from './option-parts/option.xAxis.js'
//@ts-ignore
import yAxisOptions from './option-parts/option.yAxis.js'

export default (axis = 'x') => {
  return objectOrArray(axis === 'x' ? 'xAxis' : 'yAxis', '多轴模式', buildOptions('', axis === 'x' ? xAxisOptions : yAxisOptions))
}
