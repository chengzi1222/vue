const webpack = require('webpack');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  entry: {
    //你需要引入的第三方库文件
    vendor: ['vue','vuex','vue-router','element-ui','axios', 'nprogress','qs', 'js-cookie', 'vuebar'],
    echarts:['echarts/lib/echarts','echarts/lib/chart/bar','echarts/lib/chart/line','echarts/lib/chart/pie',
    'echarts/lib/component/tooltip','echarts/lib/component/title','echarts/lib/component/legend','echarts/lib/component/dataZoom','echarts/lib/component/toolbox',]
  },

  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
  ]
};
