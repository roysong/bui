/**
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
				_self.set('width',_self.get('el').css('width'));
				_self.set('height',_self.get('el').css('height'));
			}
			if(_self.get('item').width != undefined){
				_self.set('width', _self.get('item').width);
			}
			if(_self.get('item').height != undefined){
				_self.set('height', _self.get('item').height);
			}			
			
			if(imgContainer && labelContainer){
				//计算图片的高度和文字的高度
				imgContainer.set('height', _self.get('height')/3*2);
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
});