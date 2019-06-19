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
});