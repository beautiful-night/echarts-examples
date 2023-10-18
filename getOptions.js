const https = require('https');
const fs = require('fs');
const { DATA_LIST } = require('./src/data/chart-list-data-node');

const obj = {};

const array = [];

const ids = DATA_LIST.map((item) => item.id);
const idsOld = [];

let n = 0;

for (let index = 0; index < DATA_LIST.length; index++) {
  const element = DATA_LIST[index];
  // if (element.id !== 'line-aqi') {
  //   continue;
  // }
  array.push(
    new Promise((resolve, reject) => {
      https
        .get(
          `https://echarts.apache.org/examples/examples/ts/${element.id}.ts?_v_1696986848323`,
          (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
              data += chunk.toString();
            });
            resp.on('end', () => {
              idsOld.push(element.id);
              if (data) {
                obj[element.id] = data;
              }
              resolve();
              console.log(n + 1 + '/265');
              if (n + 1 == 265) {
                console.log(true);
              }
              if (n + 1 > 260) {
                console.log(ids.filter((e) => !idsOld.includes(e)));
              }
              n += 1;
            });
          }
        )
        .on('error', (err) => {
          reject();
          console.log(err);
        });
    })
  );
}

Promise.all(array)
  .then(() => {
    fs.writeFile(
      './options.js',
      'export default ' + JSON.stringify(obj),
      function (errInfo) {
        console.log(errInfo);
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });
