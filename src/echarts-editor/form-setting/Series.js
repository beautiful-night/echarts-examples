/**
 * @file 各种图表的配置
 */

import { buildOptions, select } from './common'

import lineOptions from './option-parts/option-series-line.js'
import barOptions from './option-parts/option-series-bar.js'
import pieOptions from './option-parts/option-series-pie.js'
import gaugeOptions from './option-parts/option-series-gauge.js'
import funnelOptions from './option-parts/option-series-funnel.js'
import radarOptions from './option-parts/option-series-radar.js'

const buildSerieOptions = (type, options) => {
  console.log({
    type: 'container',
    visibleOn: `this.type == "${type}"`,
    body: buildOptions('', options),
  })

  return {
    type: 'container',
    visibleOn: `this.type == "${type}"`,
    body: buildOptions('', options),
  }
}

export default {
  type: 'combo',
  name: 'series',
  tabsMode: true,
  tabsLabelTpl: '系列${index|plus}',
  lazyLoad: true,
  label: '',
  multiLine: true,
  multiple: true,
  addButtonText: '新增系列',
  items: [
    select('type', '图表类型', ['line', 'bar', 'pie', 'radar', 'funnel', 'gauge']),
    {
      type: 'input-array',
      name: 'data', //TODO: 目前只支持一维
      label: '数据',
      items: {
        type: 'input-number',
      },
    },
    buildSerieOptions('line', lineOptions),
    buildSerieOptions('bar', barOptions),
    buildSerieOptions('pie', pieOptions),
    buildSerieOptions('funnel', funnelOptions),
    buildSerieOptions('gauge', gaugeOptions),
    buildSerieOptions('radar', radarOptions),
  ],
}
