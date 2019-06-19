/**
 * @fileOverview 工具栏命名空间入口
 * @ignore
 */

define('bui/toolbar',['bui/common','bui/toolbar/baritem','bui/toolbar/breadcrumb','bui/toolbar/bar','bui/toolbar/pagingbar','bui/toolbar/numberpagingbar','bui/toolbar/portal','bui/toolbar/portalItem','bui/toolbar/steps'],function (require) {
  var BUI = require('bui/common'),
    Toolbar = BUI.namespace('Toolbar');

  BUI.mix(Toolbar,{
    BarItem : require('bui/toolbar/baritem'),
    Bar : require('bui/toolbar/bar'),
    Breadcrumb : require('bui/toolbar/breadcrumb'),
    PagingBar : require('bui/toolbar/pagingbar'),
    NumberPagingBar : require('bui/toolbar/numberpagingbar'),
    Portal : require('bui/toolbar/portal'),
    PortalItem : require('bui/toolbar/portalItem'),
    Steps : require('bui/toolbar/steps')
  });
  return Toolbar;
});
