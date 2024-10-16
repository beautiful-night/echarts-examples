<template>
  <div>
    <div id="kkk"></div>
    <button @click="setFormValues()">set</button>
    <button @click="getFormValues()">get</button>
  </div>
</template>

<script>
// "amis": "^3.5.3",
import 'amis/sdk/sdk.js';
import 'amis/sdk/sdk.css';
import 'amis/sdk/iconfont.css';
import 'amis/sdk/helper.css';
import options from './index';

export default {
  name: 'AMISRenderer',
  components: {},
  data() {
    return {
      schema: {
        type: 'page',
        title: 'page',
        name: 'page',
        body: [
          {
            type: 'form',
            name: 'form',
            controls: [options.body]
          }
        ]
      },
      amisInstance: null
    };
  },

  mounted() {
    const scoped = amisRequire('amis/embed');
    const instance = scoped.embed(
      '#kkk',
      this.schema,
      {
        data: {
          title: {
            itemGap: 10,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            link: '111'
          },
          legend: {}
        }
      },
      {
        tracker: ({ eventType, eventData }) => {
          if (eventType === 'formItemChange') {
            this.getFormValues(eventData.value);
          }
        }
      }
    );
    this.amisInstance = instance;
  },

  methods: {
    getFormValues(option) {
      setTimeout(() => {
        console.log(
          this.amisInstance.getComponentByName('page.form').getValues()
        );
      }, 300);
    },
    setFormValues(option) {
      this.amisInstance.getComponentByName('page.form').setValues({
        config: {
          title: {
            text: 'Stacked Line',
            link: 'cqk',
            textStyle: {
              color: '#eeeeee'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      });
    },
    updateProps() {
      this.amisInstance.updateProps({
        data: {
          ...this.locals
        },
        context: this.context,
        ...this.props
      });
    }
  },

  destroyed() {
    this.amisInstance.unmount();
  }
};
</script>
