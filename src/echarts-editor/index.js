/**
 * @file 基于 amis 实现 ECharts 图表可视化编辑
 */

import { createHierarchy } from './form-setting/common'

import title from './form-setting/Title'
import series from './form-setting/Series'
import legend from './form-setting/Legend'
import Axis from './form-setting/Axis'
import polar from './form-setting/Polar'
import tooltip from './form-setting/Tooltip'
import toolbox from './form-setting/Toolbox'
import Global from './form-setting/Global'

const options = {
  body: [
    createHierarchy('config', [
      {
        type: 'tabs',
        mountOnEnter: true,
        // unmountOnExit: true, // 加了更慢的样子
        mode: 'vertical',
        className: 'echarts-editor',
        tabs: [
          {
            title: '图表',
            body: [series],
          },
          {
            title: '标题',
            body: [title],
          },
          {
            title: '图例',
            body: [legend],
          },
          {
            title: 'X 轴',
            body: Axis('x'),
          },
          {
            title: 'Y 轴',
            body: Axis('y'),
          },
          {
            title: '极标',
            body: [polar],
          },
          {
            title: '提示框',
            body: [tooltip],
          },
          {
            title: '工具栏',
            body: [toolbox],
          },
          {
            title: '全局',
            body: [Global],
          },
        ],
      },
    ]),
  ],
}

export default options
