/**
 * @fileOverview 提示的入口文件
 * @ignore
 */

define('bui/tooltip',['bui/common','bui/tooltip/tip','bui/tooltip/tips'],function (require) {
  var BUI = require('bui/common'),
    Tooltip = BUI.namespace('Tooltip'),
    Tip = require('bui/tooltip/tip'),
    Tips = require('bui/tooltip/tips');
    Badge = require('bui/tooltip/badge');

  BUI.mix(Tooltip,{
    Tip : Tip,
    Tips : Tips,
    Badge : Badge
  });
  return Tooltip;
});