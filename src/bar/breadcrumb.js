/**
 * @fileOverview 面包屑组件
 * @author roysong
 */
define('bui/toolbar/breadcrumb',['bui/common','bui/list'],function(require){

	var BUI = require('bui/common'),
		UIBase = BUI.Component.UIBase,
		Component = BUI.Component,
		UIBase = Component.UIBase,
		DomList = require('bui/list').DomList,
		CLS_ITEM = BUI.prefix + 'breadcrumb-item';
		
	/**
	 * breadcrumb的视图类
	 * @class BUI.Toolbar.BreadcrumbView
	 * @extends BUI.Component.View
	 * @private
	 */
	var breadcrumbView = Component.View.extend([DomList.View],{

		renderUI:function() {
			var el = this.get('el');
      if (!el.attr('id')) {
          el.attr('id', BUI.guid('breadcrumb'));
      }
		}
	},{
    ATTRS : {
      itemContainer : {
        valueFn : function(){
          return this.get('el').find(this.get('breadcrumSelector'));
        }
      }
    }
  },{
    xclass:'breadcrum-view'
  });

	/**
	 * 面包屑
   * xclass : 'breadcrumb'
	 * ## 显示动态数据源的数据
   * <pre><code>
	 *&lt;div id="form"&gt;
	 *&lt;/div&gt;
	 *&lt;div&gt;
	 *	&lt;button id="addDic"&gt;增加一级目录&lt;/button&gt;
	 *	&lt;button id="deleteDic"&gt;删除一级目录&lt;/button&gt;
	 *	&lt;button id="resetDic"&gt;重置目录&lt;/button&gt;
	 *&lt;/div&gt;
	 *&lt;script type="text/javascript"&gt;
	 *	BUI.use(['bui/toolbar/breadcrumb','bui/data'],function(Breadcrumb,Data){
	 *		var defaultDicData = {id : '-3954',name : '主目录'};
	 *		var store = new Data.Store({
	 *			data : [defaultDicData]
	 *		});
	 *		var bc = new Breadcrumb({
	 *			render : '#form',
	 *			store : store
	 *		});
	 *		bc.render();
	 *		var index = 1;
	 *		$('#addDic').click(function(){
	 *			store.add({id : index,name : '目录' + index});
	 *			index++;
	 *		});
	 *		$('#deleteDic').click(function(){
	 *			store.remove(store.findByIndex(store.getCount() - 1));
	 *		});
	 *		$('#resetDic').click(function(){
	 *			store.setResult([defaultDicData]);	
	 *		})
	 *		bc.on('jumpToDirectory',function(e){
	 *			console.log(e.dic)
	 *		})
	 *	});
	 *&lt;/script&gt;
   * </code></pre>
   * @class BUI.Toolbar.Breadcrumb
   * @extends BUI.Component.Controller
   * @mixins BUI.Component.UIBase.Bindable BUI.List.DomList
   */
	var Breadcrumb = Component.Controller.extend([UIBase.Bindable,DomList],	
	{
		bindUI : function(){
			var _self = this,
				store = _self.get('store');
				_self.on('itemclick',function(e){
					var item = e.item,
						itemIdx = _self.indexOfItem(item);
					// 点击某个子项时，干掉此子项以后的所有子项	
					if((itemIdx + 1) < store.getCount()){//当点击的子项不是最后一项时，才执行干掉后面子项的操作
						var	records = store.getResult(),
							newRecords = records.slice(0,itemIdx + 1);
						store.setResult(newRecords);
					}
					// 抛出自定义事件
					_self.fire("jumpToDirectory",{					
						dic : item
					});
				});
		},
		/**
		* 添加
  	* @protected
  	*/
  	onAdd : function(e){
  	  var _self = this,
  	    store = _self.get('store'),
  	    item = e.record;
  	  if(_self.getCount() == 0){ //初始为空时，列表跟Store不同步
  	    _self.setItems(store.getResult());
  	  }else{
  	    _self.addItemToView(item,e.index);
  	  }
  	},
  	/**
  	 * 删除
  	* @protected
  	*/
  	onRemove : function(e){
  	  var _self = this,
  	    item = e.record;
  	  _self.removeItem(item);
  	},
  	/**
  	 * 加载数据
  	 * @protected
  	 */
  	onLoad:function(){
  	  var _self = this,
  	    store = _self.get('store'),
  	    items = store.getResult();
  	  _self.set('items',items);
  	}
	},{
		ATTRS:
		{
			events : {
				value : {
					/**点击面包屑中某子项，其后子项全部消失，并抛出此事件
           * @event
           * @name BUI.Toolbar.Breadcrumb#jumpToDirectory
           * @param {Object} e 点击事件
           * @param {Object} e.dic store中的单项数据
           */
          'jumpToDirectory' : true
				}
			},
			/**
       * 排序的时候是否直接进行DOM的排序，不重新生成DOM，<br>
       * 在可展开的表格插件，TreeGrid等控件中不要使用此属性
       * @type {Boolean}
       * cfg {Boolean} frontSortable
       * @ignore
       */
      frontSortable : {
        value : false
      },
			/**
			* 获取焦点
      * @protected
      * @ignore
			*/
			focusable : {
				value : false
			},
			/**
       * 选项集合
       * @protected
       * @type {Array}
       * @cfg {Object} [items='[]']
       */
      items : {
        view:true,
        value : []
      },
			/**
       * 选项的样式，用来获取子项
       * <pre><code>
       * var breadcrumb = new Toolbar.Breadcrumb({
       *   render : '#t1',
       *   itemCls : 'my-item', //自定义样式名称
       *   items : [{id : '1',name : '1'},{id : '2',name : '2'}]
       * });
       * breadcrumb.render();
       * </code></pre>
       * @cfg {Object} [itemCls='breadcrumb-item']
       */
      itemCls : {
        view:true,
        value : CLS_ITEM
			},
			/**
       * 选项的默认id字段
       * <pre><code>
       * var breadcrumb = new Toolbar.Breadcrumb({
       *   render : '#t1',
       *   idField : 'id', //自定义选项 id 字段
       *   items : [{id : '1',name : '1'},{id : '2',name : '2'}]
       * });
       * breadcrumb.render();
       *
       * breadcrumb.getItem('1'); //使用idField指定的字段进行查找
       * </code></pre>
       * @cfg {String} [idField = 'id']
       */
      idField : {
        value : 'id'
      },
      /**
       * 面包屑的选择器，将面包屑子项附加到此节点
       * @protected
       * @type {Object}
       */
      breadcrumSelector:{
        view:true,
        value:'ul'
      },
      /**
       * 列表项的默认模板。
       * @ignore
       */
      
      itemTpl :{
        view : true,
        value : '<li class="' + CLS_ITEM + '"><a href="#">{name}</a> <span class="divider">/</span></li>'
			},
			tpl : {
        value:'<ul class="breadcrumb" style="margin:0;"></ul>'
      },
			/**
			* @private
      * @ignore
			*/
			xview : {
				value : breadcrumbView	
			}
		}
	},{
		xclass : 'breadcrumb',
		priority : 1	
	});
	Breadcrumb.view = breadcrumbView;
	return Breadcrumb;
});