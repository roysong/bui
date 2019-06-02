/**
 * 文字描述组件
 * @author zhengwm
 * @date 190520
 */
define('bui/label/commonLabel',	['bui/common'], function(require){
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
});