/**
 * @fileOverview 简单穿梭框组件
 * @author zsh
 */
define('bui/transfer/simpletransfer',
		['bui/common', 'bui/data', 'bui/list/simplelist', 'bui/transfer/transfer'],
		function(require){
	var BUI = require('bui/common'),
	Component = BUI.Component,
	Data = require('bui/data')
	Simplelist = require('bui/list/simplelist'),
	Transfer = require('bui/transfer/transfer');
	/**
	* 简单穿梭框组件 <br>
	* xclass : 'simple-transfer'
	* 
	* ##应用场景：适用于列表数据量小于或等于20条的简单业务场景。 <br>
	* <pre><code>
	* &lt;script type="text/javascript"&gt;
	*	BUI.use(['bui/transfer/simpletransfer'],function(SimpleTransfer){
	* 
	*		var data = [
	*			{id: '1', name:'张三'},
	*			{id: '2', name:'李四'},
	*			{id: '3', name:'王五'},
	*			{id: '4', name:"赵六"}
	*		];
	*		var leftStore = new Data.Store({
	*			data : data
	*		});
	*		var transfer = new Transfer({
	*			leftStore : leftStore
	*		});
	*		transfer.render();
	*	});
	* &lt;/script&gt;
	* </code></pre>
	* @class BUI.Transfer.SimpleTransfer
	* @extends BUI.Component.Controller
	*/
	var SimpleTransfer = Component.Controller.extend({
		initializer : function(){
			var _self = this;
			
			var transfer = new Transfer({
				width : _self.get('width'),
				height : _self.get('height'),
				left : _self._initLeftList(),
				right : _self._initRightList()
			});
			_self.addChild(transfer);
			_self.set('transfer', transfer);
		},
		bindUI : function(){
			var _self = this;
			var transfer = _self.get('transfer');
			var leftList = _self.get('leftList');
			var rightStore = _self.get('rightStore');
			var rightList = _self.get('rightList');

			transfer.on('moveIn', function(e) {
				rightStore.add(leftList.getSelection(), true);
			});
			transfer.on('moveOut', function() {
				rightStore.remove(rightList.getSelection());
			});
			transfer.on('moveInAll', function() {
				rightStore.add(leftList.getItems(), true);
			});
			transfer.on('moveOutAll', function() {
				rightStore.setResult([]);
			});
		},
		_initLeftList : function() {
			var _self = this;
			var leftStore = _self.get('leftStore');
			var leftList = new Simplelist(_self._initListCfg(leftStore));

			_self.set('leftStore', leftStore);
			_self.set('leftList', leftList);
			return leftList;
		},
		_initRightList : function() {
			var _self = this;
			var rightStore = new Data.Store({
				matchFunction : function(obj1, obj2) {
					return obj1.id == obj2.id;
				}
			});
			var rightList = new Simplelist(_self._initListCfg(rightStore));

			_self.set('rightList', rightList);
			_self.set('rightStore', rightStore);
			return rightList;
		},
		_initListCfg : function(store) {
			var _self = this;
			var listCfg = {
				store : store,
				multipleSelect : true,
				itemTpl : '<li class="bui-list-item"><span class="x-checkbox"></span>{name}</li>',
				elCls : 'bui-select-list',
				elStyle : {
					'overflow-y' : 'auto'
				}
			};
			return listCfg;
		},
		/**
		 * 返回右侧已选列表全部数据
		 * @return {Array}
		 */
		getSelection : function() {
			var _self = this;
			var rightList = _self.get('rightList');
			return rightList.getItems();
		}
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
				value : 'transfer simpletransfer'
			},
			/**
			 * 左侧待选列表Store配置信息
			 * @cfg {BUI.Data.Store} leftStore
			 */
			/**
			 * 左侧待选列表Store配置信息
			 * @type {BUI.Data.Store}
			 */
			leftStore : {},
			events : {
				value : {
					/**
					 * 移入左侧待选列表选中数据
					 * @event
					 * @ignore
					 */
					'moveIn' : false,
					/**
					 * 移出右侧已选列表选中数据
					 * @event
					 * @ignore
					 */
					'moveOut' : false,
					/**
					 * 移入左侧待选列表全部数据
					 * @event
					 * @ignore
					 */
					'moveInAll' : false,
					/**
					 * 移出右侧已选列表全部数据
					 * @event
					 * @ignore
					 */
					'moveOutAll' : false
				}
			}
		}
	},{
		xclass : 'simple-transfer',
		priority : 0
	});
	return SimpleTransfer;
});