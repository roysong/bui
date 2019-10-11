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
/**
 * @fileOverview buttons or controls of toolbar
 * @author dxq613@gmail.com, yiminghe@gmail.com
 * @ignore
 */
define('bui/toolbar/baritem',function(){

  /**
   * @name BUI.Toolbar
   * @namespace 工具栏命名空间
   * @ignore
   */
  var PREFIX = BUI.prefix,
    Component = BUI.Component,
    UIBase = Component.UIBase;
    
  /**
   * barItem的视图类
   * @class BUI.Toolbar.BarItemView
   * @extends BUI.Component.View
   * @mixins BUI.Component.UIBase.ListItemView
   * @private
   */
  var BarItemView = Component.View.extend([UIBase.ListItemView]);
  /**
     * 工具栏的子项，包括按钮、文本、链接和分隔符等
     * @class BUI.Toolbar.BarItem
     * @extends BUI.Component.Controller
     */
  var BarItem = Component.Controller.extend([UIBase.ListItem],{
    
    /**
    * render baritem 's dom
    * @protected
    */
    renderUI:function() {
        var el = this.get('el');
        el.addClass(PREFIX + 'inline-block');
        if (!el.attr('id')) {
            el.attr('id', this.get('id'));
        }
    }
  },{
    ATTRS:
    {
      elTagName :{
          view : true,
          value : 'li'
      },
      /**
       * 是否可选择
       * <pre><code>
       * 
       * </code></pre>
       * @cfg {Object} [selectable = false]
       */
      selectable : {
        value : false
      },
      /**
      * 是否获取焦点
      * @default {boolean} false
      */
      focusable : {
        value : false
      },
      xview: {
        value : BarItemView
      }
    }
  },{
    xclass : 'bar-item',
    priority : 1  
  });

  /**
     * 工具栏的子项，添加按钮
     * xclass : 'bar-item-button'
     * @extends  BUI.Toolbar.BarItem
     * @class BUI.Toolbar.BarItem.Button
     */
  var ButtonBarItem = BarItem.extend({
    
    _uiSetDisabled : function(value){
      var _self = this,
        el = _self.get('el'),
        method = value ? 'addClass' : 'removeClass';
      
      el.find('button').attr('disabled',value)[method](PREFIX + 'button-disabled');
    },
    _uiSetChecked: function(value){
      var _self = this,
        el = _self.get('el'),
        method = value ? 'addClass' : 'removeClass';

        el.find('button')[method](PREFIX + 'button-checked');
    },
    _uiSetText : function(v){
      var _self = this,
        el = _self.get('el');
      el.find('button').text(v);
    },
    _uiSetbtnCls : function(v){
      var _self = this,
        el = _self.get('el');
      el.find('button').addClass(v);
    }
    
  },{
    ATTRS:
    {
      /**
       * 是否选中
       * @type {Boolean}
       */
      checked : {
        value :false
      },
      /**
       * 模板
       * @type {String}
       */
      tpl : {
        view : true,
        value : '<button type="button" class="{btnCls}">{text}</button>'
      },
      /**
       * 按钮的样式
       * @cfg {String} btnCls
       */
      /**
       * 按钮的样式
       * @type {String}
       */
      btnCls:{
        sync:false
      },
      /**
      * The text to be used as innerHTML (html tags are accepted).
      * @cfg {String} text
      */
      /**
      * The text to be used as innerHTML (html tags are accepted).
      * @type {String} 
      */
      text : {
        sync:false,
        value : ''
      }
    }
  },{
    xclass : 'bar-item-button',
    priority : 2  
  });
  
  /**
     * 工具栏项之间的分隔符
     * xclass:'bar-item-separator'
     * @extends  BUI.Toolbar.BarItem
     * @class BUI.Toolbar.BarItem.Separator
     */
  var SeparatorBarItem = BarItem.extend({
    /* render separator's dom
    * @protected
        *
    */
    renderUI:function() {
            var el = this.get('el');
            el .attr('role', 'separator');
        }
  },
  {
    xclass : 'bar-item-separator',
    priority : 2  
  });

  
  /**
     * 工具栏项之间的空白
     * xclass:'bar-item-spacer'
     * @extends  BUI.Toolbar.BarItem
     * @class BUI.Toolbar.BarItem.Spacer
     */
  var SpacerBarItem = BarItem.extend({
    
  },{
    ATTRS:
    {
      /**
      * 空白宽度
      * @type {Number}
      */
      width : {
        view:true,
        value : 2
      }
    }
  },{
    xclass : 'bar-item-spacer',
    priority : 2  
  });
  

  /**
     * 显示文本的工具栏项
     * xclass:'bar-item-text'
     * @extends  BUI.Toolbar.BarItem
     * @class BUI.Toolbar.BarItem.Text
     */
  var TextBarItem = BarItem.extend({
    _uiSetText : function(text){
      var _self = this,
        el = _self.get('el');
      el.html(text);
    }
  },{
    ATTRS:
    {
      
      /**
      * 文本用作 innerHTML (html tags are accepted).
      * @cfg {String} text
      */
      /**
      * 文本用作 innerHTML (html tags are accepted).
      * @default {String} ""
      */
      text : {
        value : ''
      }
    }
  },{
    xclass : 'bar-item-text',
    priority : 2  
  });
  
  /**
  * 工具栏的子项，上图下文字的组件<br/>
  * 在使用本组件时，注意：组件的高度 = 图片的高度 + 文本的高度 + 20；即 height = imgHeight + textHeight + 20px;<br/>
  * <pre><code>
  * &lt;div id="bar"&gt;
  * &lt;/div&gt;
  * &lt;script type="text/javascript"&gt;
	*	BUI.use(['bui/toolbar'],function(Toolbar){
	*		var bar = new Toolbar.Bar({
	*			render: '#bar',
	*			elCls: 'toolbar',
	*			height: 90,
	*			elStyle: {'background-color':'blue'},
	*			children: [
	*				{
	*					xtype: 'img',
	*					imgPath: 'D:/server/nginx-1.16.0/html/img/data.png',
	*					text: '数据网资源管理',
	*					imgHeight: '50px',
	*					textHeight: '20px',
	*				},
	*				{
	*					xtype: 'img',
	*					imgPath: 'D:/server/nginx-1.16.0/html/img/sim.png',
	*					text: 'SIM卡管理',
	*					imgHeight: '50px',
	*					textHeight: '20px',
	*				},
	*				{
	*					xtype: 'img',
	*					imgPath: 'D:/server/nginx-1.16.0/html/img/trans.png',
	*					text: '传输资源管理',
	*					imgHeight: '50px',
	*					textHeight: '20px',
	*				},
	*			],
	*		});
	*		bar.render();
	*		bar.on('imgItemClick',function(e){
	*			var item = e.item;
	*			// 将所有图片的选中状态取消掉
	*			BUI.each(bar.get('children'),function(c){
	*				c.set('checked',false);
	*			});
	*			// 设置点击的图片为选中状态
	*			item.set('checked',true);
	*		});
	*	});
	*&lt;/script&gt;
  * </code></pre>
  * xclass : 'bar-item-img'
  * @extends  BUI.Toolbar.ImgItem
  * @class BUI.Toolbar.BarItem.Img
  */
  var ImgBarItem = BarItem.extend({
    _uiSetChecked: function(value){
      var _self = this,
        el = _self.get('el'),
        method = value ? 'addClass' : 'removeClass';
        el[method](PREFIX + 'itemimg-checked');
    },
    _uiSetText : function(v){
      var _self = this,
        el = _self.get('el');
      el.find('p').text(v);
    },
    bindUI: function(){
      var _self = this,data = _self.get('data');
      _self.on('click',function(){
        _self.fire('imgItemClick',{item:_self,data:data});
      });
    },
  },{
    ATTRS:
    {
      /**
       * 是否选中，默认为false
       * @type {Boolean}
       */
      checked : {
        value :false
      },
      /**
       * 模板
       * @cfg {String} tpl
       */
      tpl : {
        view : true,
        value : '<div><img src="{imgPath}" style="height:{imgHeight}"/></div>'
          +'<div style="line-height:1;"><p style="margin:5px;font-weight:bold;overflow:hidden;height:{textHeight}">{text}</p></div>'
      },
      elStyle: {
        value: {'text-align':'center','line-height':'50%','margin':'5px','padding-top':'8px','cursor':'pointer'}
      },
      /**
       * 图片的高度，格式为'50px'，不能为空
       * @cfg {String} imgHeight
       */
      imgHeight:{
      },
      /**
       * 文字的高度，格式为'30px'，不能为空
       * @cfg {String} textHeight
       */
      textHeight:{
      },
      /**
       * 图片的路径，不能为空
       * @cfg {String} imgPath
       */
      imgPath:{
      },
      /**
       * 本子项对应的业务数据，可以为空
       * @cfg {Object} data
       */
      data:{
      },
      /**
      * 图片下文字的内容，不能为空
      * @cfg {String} text
      */
      /**
      * 图片下文字的内容，不能为空
      * @type {String} 
      */
      text : {
      },
			events : {
				value :{
				  /**点击图标，获取对应的业务数据，并抛出此事件
		      * @event
		      * @name BUI.toolbar.ImgBarItem#imgItemClick
		      * @param {Object} e.item 点击的图标对象
		      * @param {Object} e.data 对应的业务数据
		      */
          imgItemClick : true,
				}
			}

    }
  },{
    xclass : 'bar-item-img',
    priority : 2  
  });

  BarItem.types = {
    'button' : ButtonBarItem,
    'separator' : SeparatorBarItem,
    'spacer' : SpacerBarItem,
    'text'  : TextBarItem,
    'img' : ImgBarItem,
  };
  

  return BarItem;
});/**
 * @fileOverview A collection of commonly used function buttons or controls represented in compact visual form.
 * @author dxq613@gmail.com, yiminghe@gmail.com
 * @ignore
 */
define('bui/toolbar/bar',function(){

	var Component = BUI.Component,
    UIBase = Component.UIBase;
		
	/**
	 * bar的视图类
	 * @class BUI.Toolbar.BarView
	 * @extends BUI.Component.View
	 * @private
	 */
	var barView = Component.View.extend({

		renderUI:function() {
        var el = this.get('el');
        el.attr('role', 'toolbar');
           
        if (!el.attr('id')) {
            el.attr('id', BUI.guid('bar'));
        }
    }
	});

	/**
	 * 工具栏
   * 可以放置按钮、文本、链接等，是分页栏的基类
   * xclass : 'bar'
   * <p>
   * <img src="../assets/img/class-toolbar.jpg"/>
   * </p>
   * ## 按钮组
   * <pre><code>
   *   BUI.use('bui/toolbar',function(Toolbar){
   *     var buttonGroup = new Toolbar.Bar({
   *       elCls : 'button-group',
   *       defaultChildCfg : {
   *         elCls : 'button button-small'
   *       },
   *       children : [{content : '增加'},{content : '修改'},{content : '删除'}],
   *       
   *       render : '#b1'
   *     });
   *
   *     buttonGroup.render();
   *   });
   * </code></pre>
   * @class BUI.Toolbar.Bar
   * @extends BUI.Component.Controller
   * @mixins BUI.Component.UIBase.ChildList
   */
	var Bar = Component.Controller.extend([UIBase.ChildList],	
	{
		/**
		* 通过id 获取项
		* @param {String|Number} id the id of item 
		* @return {BUI.Toolbar.BarItem}
		*/
		getItem : function(id){
			return this.getChild(id);
		}
	},{
		ATTRS:
		{
      elTagName :{
          view : true,
          value : 'ul'
      },
      /**
       * 默认子项的样式
       * @type {String}
       * @override
       */
      defaultChildClass: {
        value : 'bar-item'
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
			* @private
      * @ignore
			*/
			xview : {
				value : barView	
			}
		}
	},{
		xclass : 'bar',
		priority : 1	
	});

	return Bar;
});/**
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
});/**
 * @fileoverview 步骤条组件
 * @author bili
 * @date 190518
 */
// seajs.use('steps.css');
define('bui/toolbar/steps', [
    'bui/common',
    'bui/list'
], function (r) {
    var BUI = r('bui/common'),
        List = r('bui/list');
    /**
	 * steps的视图类
	 * @class BUI.Toolbar.StepsView
	 * @extends BUI.List.SimpleListView
	 * @private
	 */
    var StepsView = List.SimpleListView.extend({
        renderUI: function () {
            var el = this.get('el');
            if (!el.attr('id')) {
                el.attr('id', BUI.guid('steps'));
            }
        }
    }, {
            ATTRS: {
            }
        }, {
            xclass: 'steps-view'
        });
    /**
     * 步骤条  
     * **使用了flex布局,低版本浏览器谨慎使用**  
     * xclass : 'steps'  
     * ## 静态展示，只在item中设置状态
     * 每个item设置不同的状态进行展示
     *{@img step-demo1.png demo1}
     * <pre>
     * <code>
     * BUI.use('bui/toolbar', function (Toolbar) {
            var setps = new Toolbar.Steps({
                 items:[
                    {title:'步骤1',description:'步骤1详情',status:'error'},
                    {title:'步骤2',description:'&lt;p&gt;步骤2详情&lt;/p&gt;&lt;p style="color:red;"&gt;步骤2详情&lt;/p&gt;&lt;p&gt;步骤2详情&lt;/p&gt;',status:'finish'},
                    {title:'步骤3',description:'步骤3详情',status:'process'},
                    {title:'步骤4',description:'步骤4详情',status:'wait'},
                ]
            });
            setps.render();
        });
     * </code>
     * </pre>
     * ## 设置步骤条的当前步骤和当前步骤状态
     * 不用单独设置item的状态，步骤条会根据传入的current和status进行渲染,同时不展示icon
     * {@img step-demo2.png demo2}
     * <pre>
     * <code>
     * BUI.use('bui/toolbar', function (Toolbar) {
            var setps = new Toolbar.Steps({
                items:[
                    {title:'步骤1',description:'步骤1详情'},
                    {title:'步骤2',description:'步骤2详情'},
                    {title:'步骤3',description:'步骤3详情'},
                    {title:'步骤4',description:'步骤4详情'},
                ],
                current:3,
                status:'error',
                showIcon:false
            });
            setps.render();
        });
     * </code>
     * </pre>
     * ## 自定义每个item的icon
     * 如需设置当前步骤，推荐当前步骤状态设置为finish
     * {@img step-demo3.png demo3}
     * <pre>
     * <code>
     * var setps2 = new Toolbar.Steps({
            items:[
                {title:'步骤1',description:'步骤1详情',icon:'icon-search'},
                {title:'步骤2',description:'步骤2详情',icon:'icon-camera'},
                {title:'步骤3',description:'步骤3详情',icon:'icon-user'},
                {title:'步骤4',description:'步骤4详情',icon:'icon-calendar'},
            ],
            current:3,
            status:'finish'
        });
     * </code>
     * </pre>
     * @class BUI.Toolbar.Steps
     * @extends BUI.List.SimpleList
     */
    var Steps = List.SimpleList.extend({
        initializer: function () {
            var _self = this;
            _self.set('items', _self._formatItems());
        },
        /**
         * 格式化传入的item，把string转换为所需对象
         * @private
         */
        _formatItems: function () {
            var _self = this,
                items = _self.get('items'),
                tmp = [];
            BUI.each(items, function (v, i) {
                tmp.push(_self._formatItem(v, i));
                if(v.status == 'error' && items[i-1]){//错误状态的上一步增加css,如修改连线颜色
                    items[i-1].status += ' steps-next-error';
                }
                if(v.status == 'finish' && items[i-1]){//完成状态的上一步增加css，如修改连线颜色
                    items[i-1].status += ' steps-next-finish';
                }
                if(v.status == 'process' && items[i-1]){//完成状态的上一步增加css，如修改连线颜色
                    items[i-1].status += ' steps-next-process';
                }
            });
            return tmp;
        },
        /**
         * 格式化单个string为itemObject
         * @param {string} v 需要转换的字符串
         * @param {number} i 数组索引
         * @private
         */
        _formatItem: function (v, i) {
            var _self = this,showIcon = _self.get('showIcon');
            var status = _self._getItemStatus(i,v.status);
            v.status = status;
            if(!showIcon){//不展示icon时
                v.radius = 'steps-item-icon-radius';
                v.icon = '';
            }else if(showIcon && !v.icon){
                v.radius = 'steps-item-icon-radius';
                v.icon = i+1;
            }else if(showIcon && v.icon){//需要展示icon，且item中配置了icon
                v.radius = '';
                v.icon = v.icon.indexOf('class')>=0?v.icon:'<i class="'+v.icon+'"></i>';
            }
            return v;
        },
        /**
         * 根据索引号计算item的class
         * @param {number} index 
         * @private
         */
        _getItemStatus: function (index,nowStatus) {
            var _self = this, current = _self.get('current'), status = _self.get('status');
            if (index == current - 1) {//设置了当前步骤时，当前状态
                return status ? status : 'process';
            }
            if (index < current - 1) {//设置了当前步骤时，其他状态
                return 'finish'
            }
            if(!current){//未设置当前步骤时，根据item的装态进行展示
                return nowStatus;
            }
        },
        /**
         * 选中item去修改current，重新渲染步骤条
         * @param {item} 当前步骤 
         */
        setCurrent: function (item) {
            var _self = this, current = -1;
            _self.get('items').forEach(function (v, i) {
                if (item == v) {
                    current = i+1;
                }
            });
            if (current > 0) {
                _self.set('current', current);
                _self.set('items', _self._formatItems());
                _self.get('items').forEach(function (item) {
                    _self.updateItem(item)
                });
            }
        },
        /**
         * 下一步
         */
        nextCurrent: function(){
            var _self = this,current = _self.get('current');
            if(current+1<=_self.get("items").length){
                _self.set('current', current+1);
                _self.set('items', _self._formatItems());
                _self.get('items').forEach(function (item) {
                    _self.updateItem(item)
                });
            }
        },
         /**
         * 上一步
         */
        prevCurrent: function(){
            var _self = this,current = _self.get('current');
            if(current-1>0){
                _self.set('current', current-1);
                _self.set('items', _self._formatItems());
                _self.get('items').forEach(function (item) {
                    _self.updateItem(item)
                });
            }
        },
        /**
         * 修改当前选中的步骤条
         * @param {Object} item 当前点击的元素，一般传入为itemclick事件的e.item
         */
        setSelected: function (item) {
            var _self = this,items = _self.get('items');
            items.forEach(function(v){
                if(v==item){
                    v.selected = 'steps-item-selected';
                }else{
                    v.selected = '';
                }
            });
            _self.set('items',items);
            _self.get('items').forEach(function (item) {
                _self.updateItem(item)
            });
        },
        /**
         * 取消选中
         * @param {Object} item 当前点击的元素，一般传入为itemclick事件的e.item
         */
        cancelSelected:function(item){
            var _self = this,items = _self.get('items');
            items.forEach(function(v){
                if(v==item){
                    v.selected = '';
                }
            });
            _self.set('items',items);
            _self.get('items').forEach(function (item) {
                _self.updateItem(item)
            });
        }
    }, {
            ATTRS: {
                /**
                 * 列表项的默认模板。
                 * @ignore
                 */
                itemTpl: {
                    view: true,
                    value: '<li class="steps-item steps-item-{status} {selected}">' +
                        '<div class="steps-item-icon {radius}">{icon}</div>' +
                        '<div class="steps-item-content">' +
                        '<div class="steps-item-title">{title}</div>' +
                        '<div class="steps-item-description">{description}</div>' +
                        '</div>' +
                        '</li>'
                },
                /**
                 *  @ignore
                 */
                idField: {
                    value: 'index'
                },
                /**
                 * 组件的默认模板。
                 * @ignore
                 */
                tpl: {
                    value: '<div class="step"><ul></ul></div>',
                    childContainer: 'ul'
                },
                /**
                 * 对象数组，单个对象属性如下：
                 * <pre>
                 * &#123; 
                 * status: 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。
                 *          可选：wait 未执行
                 *                process 处理中
                 *                finish 已完成
                 *                error 错误
                 * text: 标题, 
                 * description: 步骤的详情描述，可选, 
                 * icon: 步骤图标的类型，可选 
                 * &#125;
                 * </pre>
                 * @cfg {Object[]}
                 */
                items: {
                    view: true,
                    value: []
                },
                /**
			     * @private
                 * @ignore
			     */
                stepsOl: {
                    view: true,
                    value: 'ul'
                },
                /**
                 * 当前步骤
                 * @cfg {?number}
                 */
                current: {},
                /**
                 * 当前步骤状态,默认为process  
                 * 可选项为：  
                 *          wait 未执行  
                 *          process 处理中  
                 *          finish 已完成  
                 *          error 错误  
                 * @cfg {?string}
                 */
                status: {},
                /**
                 * 是否展示icon，默认为true
                 * @cfg{boolean}
                 */
                showIcon:{value:true},
                /**
			     * @private
                 * @ignore
			     */
                xview: {
                    value: StepsView
                }
            }
        });
    Steps.View = StepsView;
    return Steps;
});/**
 * @fileOverview  a specialized toolbar that is bound to a Grid.Store and provides automatic paging control.
 * @author dxq613@gmail.com, yiminghe@gmail.com
 * @ignore
 */
define('bui/toolbar/pagingbar',['bui/toolbar/bar'],function(require) {

    var Bar = require('bui/toolbar/bar'),
        Component = BUI.Component,
        Bindable = Component.UIBase.Bindable;

    var PREFIX = BUI.prefix,
		ID_FIRST = 'first',
        ID_PREV = 'prev',
        ID_NEXT = 'next',
        ID_LAST = 'last',
        ID_SKIP = 'skip',
        ID_REFRESH = 'refresh',
        ID_TOTAL_PAGE = 'totalPage',
        ID_CURRENT_PAGE = 'curPage',
        ID_TOTAL_COUNT = 'totalCount',
        ID_BUTTONS = [ID_FIRST,ID_PREV,ID_NEXT,ID_LAST,ID_SKIP,ID_REFRESH],
        ID_TEXTS = [ID_TOTAL_PAGE,ID_CURRENT_PAGE,ID_TOTAL_COUNT];

    /**
     * 分页栏
     * xclass:'pagingbar'
     * @extends BUI.Toolbar.Bar
     * @mixins BUI.Component.UIBase.Bindable
     * @class BUI.Toolbar.PagingBar
     */
    var PagingBar = Bar.extend([Bindable],
        {
            /**
             * From Bar, Initialize this paging bar items.
             *
             * @protected
             */
            initializer:function () {
                var _self = this,
                    children = _self.get('children'),
                    items = _self.get('items'),
                    store = _self.get('store');
                if(!items){
                    items = _self._getItems();
                    BUI.each(items, function (item) {
                        children.push(item);//item
                    });
                }else{
                    BUI.each(items, function (item,index) { //转换对应的分页栏
                        if(BUI.isString(item)){
                            if(BUI.Array.contains(item,ID_BUTTONS)){
                                item = _self._getButtonItem(item);
                            }else if(BUI.Array.contains(item,ID_TEXTS)){
                            
                                item = _self._getTextItem(item);
                            }else{
                                item = {xtype : item};
                            }

                        }
                        children.push(item);
                    }); 
                }
                
                if (store && store.get('pageSize')) {
                    _self.set('pageSize', store.get('pageSize'));
                }
            },
            /**
             * bind page change and store events
             *
             * @protected
             */
            bindUI:function () {
                var _self = this;
                _self._bindButtonEvent();
                //_self._bindStoreEvents();

            },
            /**
             * skip to page
             * this method can fire "beforepagechange" event,
             * if you return false in the handler the action will be canceled
             * @param {Number} page target page
             */
            jumpToPage:function (page) {
                if (page <= 0 || page > this.get('totalPage')) {
                    return;
                }
                var _self = this,
                    store = _self.get('store'),
                    pageSize = _self.get('pageSize'),
                    index = page - 1,
                    start = index * pageSize;
                var result = _self.fire('beforepagechange', {from:_self.get('curPage'), to:page});
                if (store && result !== false) {
                    store.load({ start:start, limit:pageSize, pageIndex:index });
                }
            },
            //after store loaded data,reset the information of paging bar and buttons state
            _afterStoreLoad:function (store, params) {
                var _self = this,
                    pageSize = _self.get('pageSize'),
                    start = 0, //页面的起始记录
                    end, //页面的结束记录
                    totalCount, //记录的总数
                    curPage, //当前页
                    totalPage;//总页数;

                start = store.get('start');
                
                //设置加载数据后翻页栏的状态
                totalCount = store.getTotalCount();
                end = totalCount - start > pageSize ? start + store.getCount() - 1: totalCount;
                totalPage = parseInt((totalCount + pageSize - 1) / pageSize, 10);
                totalPage = totalPage > 0 ? totalPage : 1;
                curPage = parseInt(start / pageSize, 10) + 1;

                _self.set('start', start);
                _self.set('end', end);
                _self.set('totalCount', totalCount);
                _self.set('curPage', curPage);
                _self.set('totalPage', totalPage);

                //设置按钮状态
                _self._setAllButtonsState();
                _self._setNumberPages();
            },

            //bind page change events
            _bindButtonEvent:function () {
                var _self = this;

                //first page handler
                _self._bindButtonItemEvent(ID_FIRST, function () {
                    _self.jumpToPage(1);
                });

                //previous page handler
                _self._bindButtonItemEvent(ID_PREV, function () {
                    _self.jumpToPage(_self.get('curPage') - 1);
                });

                //previous page next
                _self._bindButtonItemEvent(ID_NEXT, function () {
                    _self.jumpToPage(_self.get('curPage') + 1);
                });

                //previous page next
                _self._bindButtonItemEvent(ID_LAST, function () {
                    _self.jumpToPage(_self.get('totalPage'));
                });
                //skip to one page
                _self._bindButtonItemEvent(ID_SKIP, function () {
                    handleSkip();
                });

                //refresh
                _self._bindButtonItemEvent(ID_REFRESH, function () {
                    _self.jumpToPage(_self.get('curPage'));
                });
                //input page number and press key "enter"
                var curPage = _self.getItem(ID_CURRENT_PAGE);
                if(curPage){
                    curPage.get('el').on('keyup', function (event) {
                        event.stopPropagation();
                        if (event.keyCode === 13) {
                            handleSkip();
                        }
                    });
                }
                
                //when click skip button or press key "enter",cause an action of skipping page
                /**
                 * @private
                 * @ignore
                 */
                function handleSkip() {
                    var value = parseInt(_self._getCurrentPageValue(), 10);
                    if (_self._isPageAllowRedirect(value)) {
                        _self.jumpToPage(value);
                    } else {
                        _self._setCurrentPageValue(_self.get('curPage'));
                    }
                }
            },
            // bind button item event
            _bindButtonItemEvent:function (id, func) {
                var _self = this,
                    item = _self.getItem(id);
                if (item) {
                    item.on('click', func);
                }
            },
            onLoad:function (params) {
                var _self = this,
                    store = _self.get('store');
                _self._afterStoreLoad(store, params);
            },
            //get the items of paging bar
            _getItems:function () {
                var _self = this,
                    items = _self.get('items');
                if (items && items.length) {
                    return items;
                }
                //default items
                items = [];
                //first item
                items.push(_self._getButtonItem(ID_FIRST));
                //previous item
                items.push(_self._getButtonItem(ID_PREV));
                //separator item
                items.push(_self._getSeparator());
                //total page of store
                items.push(_self._getTextItem(ID_TOTAL_PAGE));
                //current page of store
                items.push(_self._getTextItem(ID_CURRENT_PAGE));
                //button for skip to
                items.push(_self._getButtonItem(ID_SKIP));
                //separator item
                items.push(_self._getSeparator());
                //next item
                items.push(_self._getButtonItem(ID_NEXT));
                //last item
                items.push(_self._getButtonItem(ID_LAST));
                //separator item
                items.push(_self._getSeparator());
                //current page of store
                items.push(_self._getTextItem(ID_TOTAL_COUNT));
                return items;
            },
            //get item which the xclass is button
            _getButtonItem:function (id) {
                var _self = this;
                return {
                    id:id,
                    xclass:'bar-item-button',
                    text:_self.get(id + 'Text'),
                    disabled:true,
                    elCls:_self.get(id + 'Cls')
                };
            },
            //get separator item
            _getSeparator:function () {
                return {xclass:'bar-item-separator'};
            },
            //get text item
            _getTextItem:function (id) {
                var _self = this;
                return {
                    id:id,
                    xclass:'bar-item-text',
                    text:_self._getTextItemTpl(id)
                };
            },
            //get text item's template
            _getTextItemTpl:function (id) {
                var _self = this,
                    obj = _self.getAttrVals();
                return BUI.substitute(this.get(id + 'Tpl'), obj);
            },
            //Whether to allow jump, if it had been in the current page or not within the scope of effective page, not allowed to jump
            _isPageAllowRedirect:function (value) {
                var _self = this;
                return value && value > 0 && value <= _self.get('totalPage') && value !== _self.get('curPage');
            },
            //when page changed, reset all buttons state
            _setAllButtonsState:function () {
                var _self = this,
                    store = _self.get('store');
                if (store) {
                    _self._setButtonsState([ID_PREV, ID_NEXT, ID_FIRST, ID_LAST, ID_SKIP], true);
                }

                if (_self.get('curPage') === 1) {
                    _self._setButtonsState([ID_PREV, ID_FIRST], false);
                }
                if (_self.get('curPage') === _self.get('totalPage')) {
                    _self._setButtonsState([ID_NEXT, ID_LAST], false);
                }
            },
            //if button id in the param buttons,set the button state
            _setButtonsState:function (buttons, enable) {
                var _self = this,
                    children = _self.get('children');
                BUI.each(children, function (child) {
                    if (BUI.Array.indexOf(child.get('id'), buttons) !== -1) {
                        child.set('disabled', !enable);
                    }
                });
            },
            //show the information of current page , total count of pages and total count of records
            _setNumberPages:function () {
                var _self = this,
                    items = _self.getItems();/*,
                    totalPageItem = _self.getItem(ID_TOTAL_PAGE),
                    totalCountItem = _self.getItem(ID_TOTAL_COUNT);
                if (totalPageItem) {
                    totalPageItem.set('content', _self._getTextItemTpl(ID_TOTAL_PAGE));
                }
                _self._setCurrentPageValue(_self.get(ID_CURRENT_PAGE));
                if (totalCountItem) {
                    totalCountItem.set('content', _self._getTextItemTpl(ID_TOTAL_COUNT));
                }*/
                BUI.each(items,function(item){
                    if(item.__xclass === 'bar-item-text'){
                        item.set('content', _self._getTextItemTpl(item.get('id')));
                    }
                });

            },
            _getCurrentPageValue:function (curItem) {
                var _self = this;
                curItem = curItem || _self.getItem(ID_CURRENT_PAGE);
                if(curItem){
                    var textEl = curItem.get('el').find('input');
                    return textEl.val();
                }
                
            },
            //show current page in textbox
            _setCurrentPageValue:function (value, curItem) {
                var _self = this;
                curItem = curItem || _self.getItem(ID_CURRENT_PAGE);
                if(curItem){
                    var textEl = curItem.get('el').find('input');
                    textEl.val(value);
                }
                
            }
        }, {
            ATTRS:
     
            {
               
                /**
                 * the text of button for first page
                 * @default {String} "首 页"
                 */
                firstText:{
                    value:'首 页'
                },
                /**
                 * the cls of button for first page
                 * @default {String} "bui-pb-first"
                 */
                firstCls:{
                    value:PREFIX + 'pb-first'
                },
                /**
                 * the text for previous page button
                 * @default {String} "前一页"
                 */
                prevText:{
                    value:'上一页'
                },
                /**
                 * the cls for previous page button
                 * @default {String} "bui-pb-prev"
                 */
                prevCls:{
                    value: PREFIX + 'pb-prev'
                },
                /**
                 * the text for next page button
                 * @default {String} "下一页"
                 */
                nextText:{
                    value:'下一页'
                },
                /**
                 * the cls for next page button
                 * @default {String} "bui-pb-next"
                 */
                nextCls:{
                    value: PREFIX + 'pb-next'
                },
                /**
                 * the text for last page button
                 * @default {String} "末 页"
                 */
                lastText:{
                    value:'末 页'
                },
                /**
                 * the cls for last page button
                 * @default {String} "bui-pb-last"
                 */
                lastCls:{
                    value:PREFIX + 'pb-last'
                },
                /**
                 * the text for skip page button
                 * @default {String} "跳 转"
                 */
                skipText:{
                    value:'确定'
                },
                /**
                 * the cls for skip page button
                 * @default {String} "bui-pb-last"
                 */
                skipCls:{
                    value:PREFIX + 'pb-skip'
                },
                refreshText : {
                    value : '刷新'
                },
                refreshCls : {
                    value:PREFIX + 'pb-refresh'
                },
                /**
                 * the template of total page info
                 * @default {String} '共 {totalPage} 页'
                 */
                totalPageTpl:{
                    value:'共 {totalPage} 页'
                },
                /**
                 * the template of current page info
                 * @default {String} '第 &lt;input type="text" autocomplete="off" class="bui-pb-page" size="20" name="inputItem"&gt; 页'
                 */
                curPageTpl:{
                    value:'第 <input type="text" '+
                        'autocomplete="off" class="'+PREFIX+'pb-page" size="20" value="{curPage}" name="inputItem"> 页'
                },
                /**
                 * the template of total count info
                 * @default {String} '共{totalCount}条记录'
                 */
                totalCountTpl:{
                    value:'共{totalCount}条记录'
                },
                autoInitItems : {
                    value : false
                },
                /**
                 * current page of the paging bar
                 * @private
                 * @default {Number} 0
                 */
                curPage:{
                    value:0
                },
                /**
                 * total page of the paging bar
                 * @private
                 * @default {Number} 0
                 */
                totalPage:{
                    value:0
                },
                /**
                 * total count of the store that the paging bar bind to
                 * @private
                 * @default {Number} 0
                 */
                totalCount:{
                    value:0
                },
                /**
                 * The number of records considered to form a 'page'.
                 * if store set the property ,override this value by store's pageSize
                 * @private
                 */
                pageSize:{
                    value:30
                },
                /**
                 * The {@link BUI.Data.Store} the paging toolbar should use as its data source.
                 * @protected
                 */
                store:{

                }
            },
            ID_FIRST:ID_FIRST,
            ID_PREV:ID_PREV,
            ID_NEXT:ID_NEXT,
            ID_LAST:ID_LAST,
            ID_SKIP:ID_SKIP,
            ID_REFRESH: ID_REFRESH,
            ID_TOTAL_PAGE:ID_TOTAL_PAGE,
            ID_CURRENT_PAGE:ID_CURRENT_PAGE,
            ID_TOTAL_COUNT:ID_TOTAL_COUNT
        }, {
            xclass:'pagingbar',
            priority:2
        });

    return PagingBar;

});/**
 * @fileOverview  a specialized toolbar that is bound to a Grid.Store and provides automatic paging control.
 * @author 
 * @ignore
 */
define('bui/toolbar/numberpagingbar',['bui/toolbar/pagingbar'],function(require) {

    var Component = BUI.Component,
        PBar = require('bui/toolbar/pagingbar');

    var PREFIX = BUI.prefix,
        NUMBER_CONTAINER = 'numberContainer',
        CLS_NUMBER_BUTTON = PREFIX + 'button-number';

    /**
     * 数字分页栏
     * xclass:'pagingbar-number'
     * @extends BUI.Toolbar.PagingBar
     * @class BUI.Toolbar.NumberPagingBar
     */
    var NumberPagingBar = PBar.extend(
        {
        /**
        * get the initial items of paging bar
        * @protected
        *
        */
        _getItems : function(){
            var _self = this,
                items = _self.get('items');

            if(items){
                return items;
            }
            //default items
            items = [];
            //previous item
            items.push(_self._getButtonItem(PBar.ID_PREV));
            //next item
            items.push(_self._getButtonItem(PBar.ID_NEXT));
            return items;
        },
        _getButtonItem : function(id){
          var _self = this;

          return {
              id:id,
              content:'<a href="javascript:;">'+_self.get(id + 'Text')+'</a>',
              disabled:true
          };
        },
        /**
        * bind buttons event
        * @protected
        *
        */
        _bindButtonEvent : function(){
            var _self = this,
                cls = _self.get('numberButtonCls');
            _self.constructor.superclass._bindButtonEvent.call(this);
            _self.get('el').delegate('a','click',function(ev){
              ev.preventDefault();
            });
            _self.on('click',function(ev){
              var item = ev.target;
              if(item && item.get('el').hasClass(cls)){
                var page = item.get('id');
                _self.jumpToPage(page);
              }
            });
        },
        //设置页码信息，设置 页数 按钮
        _setNumberPages : function(){
            var _self = this;

            _self._setNumberButtons();
        },
        //设置 页数 按钮
        _setNumberButtons : function(){
            var _self = this,
                curPage = _self.get('curPage'),
                totalPage = _self.get('totalPage'),
                numberItems = _self._getNumberItems(curPage,totalPage),
                curItem;

            _self._clearNumberButtons();

            BUI.each(numberItems,function(item){
                _self._appendNumberButton(item);
            });
            curItem = _self.getItem(curPage);
            if(curItem){
                curItem.set('selected',true);
            }
               
        },
        _appendNumberButton : function(cfg){
          var _self = this,
            count = _self.getItemCount();
          var item = _self.addItemAt(cfg,count - 1);
        },
        _clearNumberButtons : function(){
          var _self = this,
            items = _self.getItems(),
            count = _self.getItemCount();

          while(count > 2){
            _self.removeItemAt(count-2);  
            count = _self.getItemCount();          
          }
        },
        //获取所有页码按钮的配置项
        _getNumberItems : function(curPage, totalPage){
            var _self = this,
                result = [],
                maxLimitCount = _self.get('maxLimitCount'),
                showRangeCount = _self.get('showRangeCount'),
                maxPage;

            function addNumberItem(from,to){
                for(var i = from ;i<=to;i++){
                    result.push(_self._getNumberItem(i));
                }
            }

            function addEllipsis(){
                result.push(_self._getEllipsisItem());
            }

            if(totalPage < maxLimitCount){
                maxPage = totalPage;
                addNumberItem(1,totalPage);
            }else{
                var startNum = (curPage <= maxLimitCount) ? 1 : (curPage - showRangeCount),
                    lastLimit = curPage + showRangeCount,
                    endNum = lastLimit < totalPage ? (lastLimit > maxLimitCount ? lastLimit : maxLimitCount) : totalPage;
                if (startNum > 1) {
                    addNumberItem(1, 1);
                    if(startNum > 2){
                        addEllipsis();
                    }
                }
                maxPage = endNum;
                addNumberItem(startNum, endNum);
            }

            if (maxPage < totalPage) {
                if(maxPage < totalPage -1){
                    addEllipsis();
                }
                addNumberItem(totalPage, totalPage);
            }

            return result;
        },
        //获取省略号
        _getEllipsisItem : function(){
            var _self = this;
            return {
                disabled: true,           
                content : _self.get('ellipsisTpl')
            };
        },
        //生成页面按钮配置项
        _getNumberItem : function(page){
            var _self = this;
            return {
                id : page,
                elCls : _self.get('numberButtonCls')
            };
        }
        
    },{
        ATTRS:{
            itemStatusCls : {
              value : {
                selected : 'active',
                disabled : 'disabled'
              }
            },
            itemTpl : {
              value : '<a href="">{id}</a>'
            },
            prevText : {
              value : '<<'
            },
            nextText : {
              value : '>>'
            },
            /**
            * 当页码超过该设置页码时候显示省略号
            * @default {Number} 4
            */
            maxLimitCount : {
                value : 4
            },
            showRangeCount : {
                value : 1   
            },
            /**
            * the css used on number button
            */
            numberButtonCls:{
                value : CLS_NUMBER_BUTTON
            },
            /**
            * the template of ellipsis which represent the omitted pages number
            */
            ellipsisTpl : {
                value : '<a href="#">...</a>'
            }
        }
    },{
        xclass : 'pagingbar-number',
        priority : 3    
    });

    return NumberPagingBar;

});/**
 * @fileOverview 图片展示组件
 * @author zhengwm
 * @date 190520
 */
define('bui/toolbar/image',['bui/common'],function(require){

	var BUI = require('bui/common'),
		Component = BUI.Component,
		CLS_ITEM = BUI.prefix + 'image-item';
	/**
	 * 图片展示
	 * ##创建对象
	 * <pre>
	 * <code>
	 * BUI.use(['bui/toolbar/image'],function(Image){
		    var img = new Image({
				render : '#j_layout',
				src: 'E:/workspace/dks.png'
			});
			img.render();
		});
	 * </code>
	 * </pre>
	 * @class BUI.Toolbar.Image
	 * @extends BUI.Component.Controller
	 */
	var Image = Component.Controller.extend({
		initializer : function(){
			var _self = this;
			_self.set('elAttrs', {src: _self.get('src')});
		}
	},
	{
		ATTRS : {
			/**
			 * 图片路径
			 * @type {string}
			 */
			src : {value:''},	
			 /**
             * 控件宽度
             * <pre><code>
             * new Control({
             *   width : 100 // 100,'100px','10%'
             * });
             * </code></pre>
             * @cfg {Number|String} width
             */
			 /**
             * 控件宽度
             * <pre><code>
             *  control.set('width',100);
             *  control.set('width','100px');
             *  control.set('width','10%');
             * </code></pre>
             * @type {Number|String}
             */
			width : {value : 100},
			 /**
             * 控件高度
             * <pre><code>
             * new Control({
             *   height : 100 // 100,'100px','20%'
             * });
             * </code></pre>
             * @cfg {Number|String} height
             */
            /**
             * 控件高度
             * <pre><code>
             *  control.set('height',100);
             *  control.set('height','100px');
             *  control.set('height','10%');
             * </code></pre>
             * @type {Number|String}
             */
			height : {value : 100},
			/**
			 * 控件根节点使用的标签为img
			 * @protected
			 */
			elTagName : {
				value : 'img'
			},
			/**
             * 控件根节点应用的样式
             * <pre><code>
             *  new Control({
             *   elCls : 'test',
             *   src: 'E:/workspace/dks.png',
             *   render : '#t1'   
             *  });
             * </code></pre>
             * @cfg {String} elCls
             */
            /**
             * 控件根节点应用的样式 css class
             * @type {String}
             */
			elCls : CLS_ITEM			
		}
	}
	);
	return Image;
});/**
 * 文字描述组件
 * @author zhengwm
 * @date 190520
 */
define('bui/toolbar/commonLabel',	['bui/common'], function(require){
	var BUI = require('bui/common'),
	ELC_LABEL =  BUI.prefix + "common-label";
	var CommonLabel = BUI.Component.Controller.extend({
	},{
		ATTRS : {
			/**
			 * 控件根节点使用的标签为img
			 * @protected
			 */
			elTagName  : {value : 'span'},
			 /**
             * @cfg {Object} elStyle
			 * 控件根节点应用的css属性
             *  <pre><code>
             *    var cfg = {elStyle : {width:'100px', height:'200px'}};
             *  </code></pre>
             */
            /**
             * 控件根节点应用的css属性，以键值对形式
             * @type {Object}
			 *  <pre><code>
             *	 control.set('elStyle',	{
             *		width:'100px',
             *		height:'200px'
             *   });
             *  </code></pre>
             */
			elStyle : {value : {}},
			/**
             * 控件根节点应用的样式
             * <pre><code>
             *  new Control({
             *   elCls : 'test',
             *   content : '内容',
             *   render : '#t1'   //&lt;div id='t1'&gt;&lt;div class="test"&gt;内容&lt;/div&gt;&lt;/div&gt;
             *  });
             * </code></pre>
             * @cfg {String} elCls
             */
            /**
             * 控件根节点应用的样式 css class
             * @type {String}
             */
			elCls : {value : ELC_LABEL},
			/**
			* 控件的模版，用于初始化
			* <pre><code>
			* var label = new CommonLabel({
			*   tpl : '&lt;span &gt;{text}&lt/div&gt;',
			*   text : 'test'
			* });
			* list.render();
			* </code></pre>
			* @cfg {String} tpl
			*/
			/**
			 * 控件的模板
			 * <pre><code>
			 *   list.set('tpl','&lt;span &gt;{text}&lt/div&gt;')
			 * </code></pre>
			 * @type {String}
			 */
			tpl : {value : '{text}'},
			/**
			 * 文本描述
			 * @type {string}
			 * @cfg {String} text
			 */
			text : {}
		}
	});
	return CommonLabel;
});/**
 * @fileOverview 上图片下文字展示组件
 * @author zhengwm
 * @date 190520
 */
define('bui/toolbar/portalItem',['bui/common', 'bui/list', 'bui/toolbar/image', 'bui/toolbar/commonLabel'],function(require){

	var BUI = require('bui/common'),
		Component = BUI.Component,
		List = require('bui/list'),
		Image = require('bui/toolbar/image'),
		CommonLabel = require('bui/toolbar/commonLabel'),
		ELC_ITEM = BUI.prefix + 'portal-item';
	/**
	 * 上图片下文字描述
	 * ##单文字显示
	 * <pre>
	 * <code>
	 * BUI.use(['bui/toolbar/portalItem'],function(PortalItem){
			var pi = new PortalItem({
				render : '#j_toolbar',
				item : {type:'1', elStyle:{'width':200}, singleText:{text:'车间用户', elStyle:{'color':'red'}}}
			});
			pi.render();
			pi.on('itemClick', function(e){
				console.log(e.item);
			});
		});
	 * </code>
	 * </pre>
	 * ##多行文字显示
	 * <pre>
	 * <code>
	 * BUI.use(['bui/toolbar/portalItem'],function(PortalItem){
			var pi = new PortalItem({
				render : '#j_toolbar',
				item : {type:'2',  multiText: [{text:'星期三'},{text:'21', elStyle:{'font-size':40}}]}
			});
			pi.render();
			pi.on('itemClick', function(e){
				console.log(e.item);
			});
		});
	 * </code>
	 * </pre>
	 * ##单图片显示
	 * <pre>
	 * <code>
	 * BUI.use(['bui/toolbar/portalItem'],function(PortalItem){
			var pi = new PortalItem({
				render : '#j_toolbar',
				item : {type:'3',src:'E:/bui/55/cj.png', elStyle:{'background-color':'red'}}
			});
			pi.render();
			pi.on('itemClick', function(e){
				console.log(e.item);
			});
		});
	 * </code>
	 * </pre>
	 * ##图片和文字显示
	 * <pre>
	 * <code>
	 * BUI.use(['bui/toolbar/portalItem'],function(PortalItem){
			var pi = new PortalItem({
				render : '#j_toolbar',
				item : {type:'4',src:'E:/bui/55/gq.png', singleText:{text: '工区用户'}}
			});
			pi.render();
			pi.on('itemClick', function(e){
				console.log(e.item);
			});
		});
	 * </code>
	 * </pre>
	 * @class BUI.Toolbar.PortalItem
	 * @extends BUI.Component.Controller
	 */
	var PortalItem = Component.Controller.extend({
		initializer : function(){
			var _self = this;
			var item = _self.get('item');
			if(item.src !=undefined && item.src !='' ) {
				//添加图片
				_self.addChild(_self._createImage());
			}
			if((item.singleText !=undefined && item.singleText != null) || (item.multiText !=undefined && item.multiText !=null)) {
				//添加文字描述
				_self.addChild(_self._createLabel());
			}
		},
		/**
		 * 创建图片容器
		 * @protected
		 */
		_createImage : function() {
			var _self = this;
			var image =  new Image({
				id : 'portal_image',
				src : _self.get('item').src
			});
			var imgContainer  = new Component.Controller({
				id : 'imgContainer',
				width : '100%'
			});
			imgContainer.addChild(image);
			return imgContainer;
		},	
		/**
		 * 创建文字描述容器
		 * @protected
		 */
		_createLabel : function() {
			var _self = this, item = _self.get('item');
			var labelContainer  = new Component.Controller({
				id : 'labelContainer',
				width : '100%'
			});
			var singleText = item.singleText;
			var multiText = item.multiText;
			if(singleText){//单行文字直接new一个文本对象
				var label = new CommonLabel({
					text : singleText.text,
					elStyle : singleText.elStyle
				});
				labelContainer.addChild(label);
			} else {//多行文字通过list容器对文本对象进行加载
				var list = new List.List();
				BUI.Array.each(multiText,function(mt){
					var listItem = new List.ListItem({
						elStyle : {'margin-bottom' : '10px'},
						tpl:''
					});
					var label = new CommonLabel({
						text : mt.text,
						elStyle : mt.elStyle
					});
					listItem.addChild(label);
					list.addChild(listItem);					
				});
				labelContainer.addChild(list);
			}
			return labelContainer;
		},
		renderUI : function() {
			var _self = this,imgContainer=_self.getChild('imgContainer', true),labelContainer=_self.getChild('labelContainer', true),
			portal_image = _self.getChild('portal_image', true);
			//将数据中设定的样式与本身样式进行绑定
			if(_self.get('item').elStyle != undefined){
				_self.set('elStyle', _self.get('item').elStyle);
				_self.set('width',  _self.get('item').elStyle.width);
				_self.set('height', _self.get('item').elStyle.height);
			}
			if(_self.get('item').width != undefined){
				_self.set('width', _self.get('item').width);
			}
			if(_self.get('item').height != undefined){
				_self.set('height', _self.get('item').height);
			}			
			
			if(imgContainer && labelContainer){
				//计算图片的高度和文字的高度				
				imgContainer.set('height', parseFloat(_self.get('height'))/3*2);
				labelContainer.set('height', _self.get('height') - imgContainer.get('height'));
				portal_image.set('height', imgContainer.get('height'));
				portal_image.set('width', imgContainer.get('width'));
				_self._redefineDisplay(imgContainer);
				_self._redefineDisplay(labelContainer);
			} else if(imgContainer) {
				//图片容器高度与主容器高度一致
				imgContainer.set('height', _self.get('height'));
				portal_image.set('height', imgContainer.get('height'));
				portal_image.set('width', imgContainer.get('width'));
				_self._redefineDisplay(imgContainer);
			} else {
				//文字容器高度与主容器高度一致
				labelContainer.set('height',_self.get('height'));
				_self._redefineDisplay(labelContainer);
			}
			
		},		
		/**
		 * 重定义容器为flex布局，并居中显示
		 * @protected
		 */
		_redefineDisplay : function(container) {
			container.set('elStyle', {'display': 'flex','justify-content': 'center', 'align-items':'Center'});
		},
		bindUI : function() {
			var _self = this;
			//监听自身的点击事件
			_self.on('click', function(e){
				///自定义抛出事件
				_self.fire('itemClick',{
					item : _self.get('item')
				});
			});
			//监听鼠标移入时间，并改变边框的颜色
			_self.on('mouseenter', function(e){
				var color = _self.get('el').css('backgroundColor');
				var colorNum = color.split('rgb(')[1].split(')')[0].split(',');
				colorNum[0] = parseInt(colorNum[0]) +15;
				colorNum[1] = parseInt(colorNum[1]) +25;
				colorNum[2] = parseInt(colorNum[2]) +35;
				color = 'rgb('+ colorNum.join(',') + ')';			
				_self.set('elStyle', {'border-color': color});
			});
			//监听鼠标移出时间，并恢复边框改变前的颜色
			_self.on('mouseleave', function(e){
				_self.set('elStyle', {'border-color':'white'});
			});
	}
	},
	{
		ATTRS : {
			 /**
             * 控件宽度
             * <pre><code>
             * new Control({
             *   width : 100 // 100,'100px','10%'
             * });
             * </code></pre>
             * @cfg {Number|String} width
             */
			 /**
             * 控件宽度
             * <pre><code>
             *  control.set('width',100);
             *  control.set('width','100px');
             *  control.set('width','10%');
             * </code></pre>
             * @type {Number|String}
             */
			width : {value : 100},
			 /**
             * 控件高度
             * <pre><code>
             * new Control({
             *   height : 100 // 100,'100px','20%'
             * });
             * </code></pre>
             * @cfg {Number|String} height
             */
            /**
             * 控件高度
             * <pre><code>
             *  control.set('height',100);
             *  control.set('height','100px');
             *  control.set('height','10%');
             * </code></pre>
             * @type {Number|String}
             */
			height : {value : 100},
			 /**
             * @cfg {Object} elStyle
			 * 控件根节点应用的css属性
             *  <pre><code>
             *    var cfg = {elStyle : {width:'100px', height:'200px'}};
             *  </code></pre>
             */
            /**
             * 控件根节点应用的css属性，以键值对形式
             * @type {Object}
			 *  <pre><code>
             *	 control.set('elStyle',	{
             *		width:'100px',
             *		height:'200px'
             *   });
             *  </code></pre>
             */
			elStyle : {value : {width:100,height:100}},
			/**
             * 控件根节点应用的样式
             * <pre><code>
             *  new Control({
             *   elCls : 'test',
             *   content : '内容',
             *   render : '#t1'   //&lt;div id='t1'&gt;&lt;div class="test"&gt;内容&lt;/div&gt;&lt;/div&gt;
             *  });
             * </code></pre>
             * @cfg {String} elCls
             */
            /**
             * 控件根节点应用的样式 css class
             * @type {String}
             */
			elCls : {value : ELC_ITEM},
			/**
             * 控件的数据对象
             * <pre><code>
             *  new Control({
             *     item : {type:'0', singleText:{text:'段科室用户', elStyle:{'font-size':40}}},
             *     render : '#c1'
             *  });
             * </code></pre>
             * @cfg {Object} item
             */
            /**
             * 控件的数据对象
             * @type {Object}
             */
			item : {},
			events : {
				value :{
				  /**点击分类图标，获取对应的类型对象，并抛出此事件
		           * @event
		           * @name BUI.toolbar.PortalItem#itemClick
		           * @param {Object} e 点击事件
		           * @param {Object} e.item 类型对象
		           */
					itemClick : true
				}
			}
		}
	}
	);
	
	return PortalItem;
});/**
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
	 * @class BUI.Toolbar.Protal
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