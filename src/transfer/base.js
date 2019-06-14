/**
 * @fileOverview 自定义容器命名空间入口文件
 * @ignore
 */

define('bui/transfer',['bui/common','bui/transfer/transfer'],function (require) {
  var BUI = require('bui/common'),
  Transfer = BUI.namespace('Transfer');

  BUI.mix(Transfer,{
    Transfer : require('bui/transfer/transfer')
  });
  return Transfer;
});