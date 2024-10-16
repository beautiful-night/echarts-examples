/**
 * @file Echarts title 的配置
 */

import { textStyleControls, buildOptions, commonStyle, viewport, createHierarchy } from './common'

//@ts-ignore
import polarOptions from './option-parts/option.polar.js'
//@ts-ignore
import radiusAxisOptions from './option-parts/option.radiusAxis.js'
//@ts-ignore
import angleAxisOptions from './option-parts/option.angleAxis.js'

export default {
  type: 'tabs',
  tabs: [
    {
      title: '坐标系',
      body: buildOptions('polar.', polarOptions),
    },
    {
      title: '径向轴',
      body: buildOptions('radiusAxis.', radiusAxisOptions),
    },
    {
      title: '角度轴',
      body: buildOptions('angleAxis.', angleAxisOptions),
    },
  ],
}
