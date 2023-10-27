const https = require('https');
const fs = require('fs');

const CDN_ROOT = 'https://fastly.jsdelivr.net/npm/';

const SCRIPT_URLS = {
  echartsDir: `${CDN_ROOT}echarts@{{version}}`,
  echartsNightlyDir: `${CDN_ROOT}echarts-nightly@{{version}}`,
  echartsJS: '/dist/echarts.min.js',

  localEChartsDir: 'http://localhost/echarts',
  localEChartsGLDir: 'http://localhost/echarts-gl',

  prPreviewEChartsDir: 'https://echarts-pr-{{PR_NUMBER}}.surge.sh',

  echartsWorldMapJS: `${CDN_ROOT}echarts@4.9.0/map/js/world.js`,
  echartsStatJS: `${CDN_ROOT}echarts-stat@latest/dist/ecStat.min.js`,
  echartsGLJS: `${CDN_ROOT}echarts-gl@2/dist/echarts-gl.min.js`,
  datGUIMinJS: `${CDN_ROOT}dat.gui@0.6.5/build/dat.gui.min.js`,
  monacoDir: `${CDN_ROOT}monaco-editor@0.27.0/min/vs`,
  aceDir: `${CDN_ROOT}ace-builds@1.4.12/src-min-noconflict`,
  prettierDir: `${CDN_ROOT}prettier@2.3.2`,
  highlightjsDir: `https://fastly.jsdelivr.net/gh/highlightjs/cdn-release@11.8.0/build`,
  seedrandomJS: `${CDN_ROOT}seedrandom@3.0.5/seedrandom.min.js`,
  jQueryJS: `${CDN_ROOT}jquery@3.7.1/dist/jquery.min.js`,
  acornJS: `${CDN_ROOT}acorn@8.7.1/dist/acorn.min.js`,

  bmapLibJS:
    'https://api.map.baidu.com/api?v=3.0&ak=KOmVjPVUAey1G2E8zNhPiuQ6QiEmAwZu',
  echartsBMapJS: '/dist/extension/bmap.min.js'
};

const array = [
  'bootstrap@3.4.1/dist/css/bootstrap.min.css',
  'element-ui@2.15.14/lib/theme-chalk/index.css',
  'vue@2.6.14/dist/vue.min.js',
  'jquery@3.7.1/dist/jquery.min.js',
  'bootstrap@3.4.1/dist/js/bootstrap.min.js',
  'element-ui@2.15.14/lib/index.js'
];

const files = [
  'bootstrap.min.css',
  'element-ui.css',
  'vue.min.js',
  'jquery.min.js',
  './bootstrap.min.js',
  'element-ui.js'
];

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  console.log(`${CDN_ROOT}${element}`);
  https
    .get(`${CDN_ROOT}${element}`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk.toString();
      });
      resp.on('end', () => {
        console.log(element);
        fs.writeFile('./' + files[index], data, function (errInfo) {
          console.log(errInfo);
        });
      });
    })
    .on('error', (err) => {
      reject();
      console.log(err, `${CDN_ROOT}${element}`);
    });
}
