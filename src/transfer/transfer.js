/**
 * @fileOverview 穿梭框组件
 * @author zsh
 */
define('bui/transfer/transfer',
		['bui/common', 'bui/transfer/btnContainer'],
		function(require){
	var BUI = require('bui/common'),
	Component = BUI.Component,
	BtnContainer = require('bui/transfer/btnContainer');
	var MIDDLE_MIN_WIDTH = 50;
	var MIDDLE_MAX_WIDTH = 120;
	/**
	* 穿梭框组件 <br>
	* xclass : 'transfer'
	*
	* ##应用场景要求（针对左侧和右侧）： <br>
	* ###1、基于可视化容器Controller。<br>
	* ###2、支持列表形式的组件。<br>
	* ###3、支持组件数据的单选和多选。<br>
	*
	* ##使用样例：
	* <pre><code>
	* &lt;script type="text/javascript"&gt;
	*	BUI.use(['bui/data', 'bui/list/simplelist', 'bui/transfer/transfer'],function(Data, Simplelist, Transfer){
	*
	*		var leftData = [
	*			{id: '1', name:'张三'},
	*			{id: '2', name:'李四'},
	*			{id: '3', name:'王五'},
	*			{id: '4', name:"赵六"}
	*		];
	*		var leftStore = new Data.Store({
	*			data : leftData
	*		});
	*		var leftList = new Simplelist({
	*			store : leftStore,
	*			multipleSelect : true,
	*			itemTpl : '&lt;li&gt;&lt;span class="x-checkbox"&gt;&lt;/span&gt;{name}&lt;/li&gt;',
	*			elCls : 'bui-select-list'
	*		});
	*		var rightStore = new Data.Store({
	*			matchFunction : function(obj1, obj2) {
	*				return obj1.id == obj2.id;
	*			}
	*		});
	*		var rightList = new Simplelist({
	*			store : rightStore,
	*			multipleSelect : true,
	*			itemTpl : '&lt;li&gt;&lt;span class="x-checkbox"&gt;&lt;/span&gt;{name}&lt;/li&gt;',
	*			elCls : 'bui-select-list'
	*		});
	*		var transfer = new Transfer({
	*			left : leftList,
	*			right : rightList
	*		});
	*		transfer.render();
	*		transfer.on('moveIn', function(e) {
	*			rightStore.add(leftList.getSelection(), true);
	*		});
	*		transfer.on('moveOut', function() {
	*			rightStore.remove(rightList.getSelection());
	*		});
	*		transfer.on('moveInAll', function() {
	*			rightStore.add(leftList.getItems(), true);
	*		});
	*		transfer.on('moveOutAll', function() {
	*			rightStore.setResult([]);
	*		});
	*	});
	* &lt;/script&gt;
	* </code></pre>
	* @class BUI.Transfer.Transfer
	* @extends BUI.Component.Controller
	*/
	var Transfer = Component.Controller.extend({
		initializer : function(){
			var _self = this;
			
			_self.addChild(_self._initLeftRight(_self.get('left')));
			_self.addChild(_self._initMiddle());
			_self.addChild(_self._initLeftRight(_self.get('right')));
		},
		renderUI : function() {
			var _self = this;
			_self.set('elStyle', {display : 'flex'});
		},
		_initLeftRight : function(controller) {
			var _self = this;

			if(!controller) {
				controller = new Component.Controller({});
			}

			controller.set('width', _self._calcLeftRightWidth());
			controller.set('height', _self.get('height'));
			return controller;
		},
		_calcLeftRightWidth : function() {
			var _self = this;
			return (_self.get('width') - _self._calcMiddleWidth()) / 2;
		},
		_initMiddle : function() {
			var _self = this;
			var middleContainer = new BtnContainer({
				width : _self._calcMiddleWidth(),
				height : _self.get('height')
			});
			return middleContainer;
		},
		_calcMiddleWidth : function() {
			var _self = this;
			var middleWidth = _self.get('width') * 0.2;
			if(middleWidth < MIDDLE_MIN_WIDTH) {
				middleWidth = MIDDLE_MIN_WIDTH;
			} else if(middleWidth > MIDDLE_MAX_WIDTH) {
				middleWidth = MIDDLE_MAX_WIDTH;
			}
			return middleWidth;
		},
	},{
		ATTRS : {
			/**
			 * 控件宽度 <br>
			 * 左List宽度：(_self.get('width') - 中间按钮容器宽度) / 2 <br>
			 * 右List宽度：同左List宽度 <br>
			 * 中间按钮容器宽度：self.get('width') * 0.2   最小值：50   最大值：120
			 * @cfg {Number|String} width
			 */
			/**
			 * 控件宽度 <br>
			 * 左List宽度：(_self.get('width') - 中间按钮容器宽度) / 2 <br>
			 * 右List宽度：同左List宽度 <br>
			 * 中间按钮容器宽度：self.get('width') * 0.2   最小值：50   最大值：120
			 * @type {Number|String}
			 */
			width : {
				value : 500
			},
			/**
			 * 控件高度 <br>
			 * 左List高度：_self.get('height') <br>
			 * 右List高度：同左List高度 <br>
			 * 中间按钮容器高度：同左List高度
			 * @cfg {Number|String} [height = 400]
			 */
			/**
			 * 控件高度 <br>
			 * 左List高度：_self.get('height') <br>
			 * 右List高度：同左List高度 <br>
			 * 中间按钮容器高度：同左List高度
			 * @type {Number|String}
			 */
			height : {
				value : 400
			},
			elCls : {
				value : 'transfer'
			},
			/**
			 * 左侧容器
			 * <pre><code>
			 * 
			 *	var leftData = [
			 *		{id: '1', name:'张三'},
			 *		{id: '2', name:'李四'},
			 *		{id: '3', name:'王五'},
			 *		{id: '4', name:"赵六"}
			 *	];
			 *	var leftStore = new Data.Store({
			 *		data : leftData
			 *	});
			 *	var leftList = new Simplelist({
			 *		store : leftStore,
			 *		multipleSelect : true,
			 *		itemTpl : '&lt;li&gt;&lt;span class="x-checkbox"&gt;&lt;/span&gt;{name}&lt;/li&gt;',
			 *		elCls : 'bui-select-list'
			 *	});
			 * 
			 * </code></pre>
			 * 
			 * @cfg {BUI.Component.Controller} left
			 */
			/**
			 * 左侧容器
			 * <pre><code>
			 * 
			 *	var leftData = [
			 *		{id: '1', name:'张三'},
			 *		{id: '2', name:'李四'},
			 *		{id: '3', name:'王五'},
			 *		{id: '4', name:"赵六"}
			 *	];
			 *	var leftStore = new Data.Store({
			 *		data : leftData
			 *	});
			 *	var leftList = new Simplelist({
			 *		store : leftStore,
			 *		multipleSelect : true,
			 *		itemTpl : '&lt;li&gt;&lt;span class="x-checkbox"&gt;&lt;/span&gt;{name}&lt;/li&gt;',
			 *		elCls : 'bui-select-list'
			 *	});
			 * 
			 * </code></pre>
			 * @type {BUI.Component.Controller}
			 */
			left : {

			},
			/**
			 * 右侧容器
			 * <pre><code>
			 * 
			 *	var rightStore = new Data.Store({
			 *		matchFunction : function(obj1, obj2) {
			 *			return obj1.id == obj2.id;
			 *		}
			 *	});
			 *	var rightList = new Simplelist({
			 *		store : rightStore,
			 *		multipleSelect : true,
			 *		itemTpl : '&lt;li&gt;&lt;span class="x-checkbox"&gt;&lt;/span&gt;{name}&lt;/li&gt;',
			 *		elCls : 'bui-select-list'
			 *	});
			 * 
			 * </code></pre>
			 * 
			 * @cfg {BUI.Component.Controller} right
			 */
			/**
			 * 右侧容器
			 * <pre><code>
			 * 
			 *	var rightStore = new Data.Store({
			 *		matchFunction : function(obj1, obj2) {
			 *			return obj1.id == obj2.id;
			 *		}
			 *	});
			 *	var rightList = new Simplelist({
			 *		store : rightStore,
			 *		multipleSelect : true,
			 *		itemTpl : '&lt;li&gt;&lt;span class="x-checkbox"&gt;&lt;/span&gt;{name}&lt;/li&gt;',
			 *		elCls : 'bui-select-list'
			 *	});
			 * 
			 * </code></pre>
			 * @type {BUI.Component.Controller}
			 */
			right : {

			},
			events : {
				value : {
					/**
					 * 移入左侧待选列表选中数据
					 * @event
					 */
					'moveIn' : true,
					/**
					 * 移出右侧已选列表选中数据
					 * @event
					 */
					'moveOut' : true,
					/**
					 * 移入左侧待选列表全部数据
					 * @event
					 */
					'moveInAll' : true,
					/**
					 * 移出右侧已选列表全部数据
					 * @event
					 */
					'moveOutAll' : true
				}
			}
		}
	},{
		xclass : 'transfer',
		priority : 1
	});
	return Transfer;
});