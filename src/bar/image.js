/**
 * @fileOverview 图片展示组件
 * @author zhengwm
 * @date 190520
 */
define('bui/image/image',['bui/common'],function(require){

	var BUI = require('bui/common'),
		Component = BUI.Component,
		CLS_ITEM = BUI.prefix + 'image-item';
	/**
	 * 图片展示
	 * ##创建对象
	 * <pre>
	 * <code>
	 * BUI.use(['bui/image/image'],function(Image){
		    var img = new Image({
				render : '#j_layout',
				src: 'E:/workspace/dks.png'
			});
			img.render();
		});
	 * </code>
	 * </pre>
	 * @class BUI.Image.Image
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
});