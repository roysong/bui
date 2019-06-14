/**
 * @fileOverview 分类入口组件
 * @author zhengwm
 * @date 190520
 */
define('bui/toolbar/portal',['bui/common', 'bui/toolbar/portalItem'],function(require){

	var BUI = require('bui/common'),
		Component = BUI.Component,
		PortalItem = require('bui/toolbar/portalItem');
	/**
	 * 分类入口
	 * ##创建对象
	 * <pre>
	 * <code>
	 * BUI.use(['bui/toolbar/portal'],function(Protal){
			var portal = new Protal({
				render : '#j_toolbar',
				items: [
					{type:'0', singleText:{text:'段科室用户'}},
					{type:'1', elStyle:{'width':200}, singleText:{text:'车间用户', elStyle:{'color':'red'}}},
					{type:'2',  multiText: [{text:'星期三'},{text:'21', elStyle:{'font-size':40}}]},
					{type:'2',  multiText: [{text:'星期三'},{text:'21', elStyle:{'font-size':40}},{text:'农历十二', elStyle:{'font-size':20, 'color':'#54FF9F'}}]},
					{type:'3',src:'E:/bui/55/cj.png', elStyle:{'background-color':'red'}},
					{type:'4',src:'E:/bui/55/gq.png', singleText:{text: '工区用户'}}
				]
			});
			portal.on('itemClick', function(e){
				console.log(e.item);
			});
			portal.render();
	  });
	 * </code>
	 * </pre>
	 * @class BUI.toolbar.Protal
	 * @extends BUI.Component.Controller
	 */
	var Portal = Component.Controller.extend({
		initializer:function(){
			var _self = this;
			var items = _self.get('items');
			BUI.Array.each(items,function(item){
				//增加上图片下文字描述的容器
				_self.addChild(new PortalItem({
					item : item
				}));
			});
		}
	},
	{
		ATTRS : {
			/**
			 * 选择的数据集合
			 * <pre><code>
			 * var portal = new Protal({
					render : '#j_toolbar',
					items: [
						{type:'0', singleText:{text:'段科室用户', elStyle:{'font-size':40}}},
						{type:'1', elStyle:{'width':200}, singleText:{text:'车间用户', elStyle:{'color':'red'}}},
						{type:'2',  multiText: [{text:'星期三'},{text:'21', elStyle:{'font-size':40}}]},
						{type:'2',  multiText: [{text:'星期三'},{text:'21', elStyle:{'font-size':40}},{text:'农历十二', elStyle:{'font-size':20, 'color':'#54FF9F'}}]},
						{type:'3',src:'E:/bui/55/cj.png', elStyle:{'background-color':'red'}},
						{type:'4',src:'E:/bui/55/gq.png', singleText:{text: '工区用户'}}
					]
				});				
				portal.render();
			 * </code></pre>
			 * @cfg {Array} items
			 */
			/**
			 * 选择的数据集合
			 * <pre><code>
			 *  portal.set('items',items); //列表会直接替换内容
			 *  //等同于 
			 *  portal.clearItems();
			 *  portal.addItems(items);
			 * </code></pre>
			 * @type {Array}
			 */
			items : {value : []},
			events : {
				value :{
				  /**点击分类图标，获取对应的类型对象，并抛出此事件
		           * @event
		           * @name BUI.toolbar.Portal#itemClick
		           * @param {Object} e 点击事件
		           * @param {Object} e.item 类型对象
		           */
					itemClick : true
				}
			}
		}
	}
	);
	return Portal;
});