/**
 * @fileOverview 面包屑组件
 * @author roysong
 */
define('bui/toolbar/breadcrumb',['bui/common','bui/list/domlist'],function(require){

	var BUI = require('bui/common'),
		UIBase = BUI.Component.UIBase,
		Component = BUI.Component,
		UIBase = Component.UIBase,
		DomList = require('bui/list/domlist'),
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
	 * ## 显示静态数组的数据
   * <pre><code>
   *   BUI.use('bui/toolbar',function(Toolbar){
   *     var breadcrumb = new Toolbar.Breadcrumb({
   *       items : [{id : '-1',name : '首页'},{id : '0',name : '一级页面'},{id : '1',name : '二级页面'}],
   *       render : '#b1'
   *     });
   *
   *     breadcrumb.render();
   *   });
   * </code></pre>
	 * ## 显示动态数据源的数据
   * <pre><code>
	 *<div id="form">
	 *</div>
	 *<div>
	 *	<button id="addDic">增加一级目录</button>
	 *	<button id="deleteDic">删除一级目录</button>
	 *	<button id="resetDic">重置目录</button>
	 *</div>
	 *<script type="text/javascript">
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
	 *	});
	 *</script>
   * </code></pre>
   * @class BUI.Toolbar.Breadcrumb
   * @extends BUI.Component.Controller
   * @mixins BUI.Component.UIBase.ChildList
   */
	var Breadcrumb = Component.Controller.extend([UIBase.Bindable,DomList],	
	{
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
			/**
       * 排序的时候是否直接进行DOM的排序，不重新生成DOM，<br>
       * 在可展开的表格插件，TreeGrid等控件中不要使用此属性
       * @type {Boolean}
       * cfg {Boolean} frontSortable
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
       * @cfg {Object} [itemCl='list-item']
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
        value:'<ul class="breadcrumb"></ul>'
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
