/**
 * @file Echarts title 的配置
 */

import { textStyleControls, buildOptions, commonStyle, viewport, createHierarchy } from './common'

//@ts-ignore
import titleOptions from './option-parts/option-title.js'

export default {
  type: 'tabs',
  tabs: [
    {
      title: '内容',
      className: 'echarts-tab',
      body: [createHierarchy('title', buildOptions('', titleOptions))],
    },
    {
      title: '位置',
      body: [createHierarchy('legend', [viewport('', '标题')])],
    },
    {
      title: '样式',
      body: [createHierarchy('title', commonStyle('', '标题'))],
    },
    {
      title: '文字样式',
      body: [createHierarchy('title', [textStyleControls('textStyle', '主标题'), textStyleControls('subtextStyle', '副标题')])],
    },
  ],
}
