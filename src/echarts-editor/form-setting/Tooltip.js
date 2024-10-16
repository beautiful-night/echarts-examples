/**
 * @file Echarts title 的配置
 */

import { textStyleControls, buildOptions, commonStyle, viewport, createHierarchy } from './common'

//@ts-ignore
import tooltipOptions from './option-parts/option.tooltip.js'

// 给其他组件里的 tooltip 使用的
export const buildTooltip = scope => {
  return buildOptions(scope, tooltipOptions)
}

export default {
  type: 'tabs',
  tabs: [
    {
      title: '基础',
      body: buildOptions('tooltip.', tooltipOptions),
    },
  ],
}
