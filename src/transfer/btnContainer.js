/**
 * @fileOverview 按钮容器
 * @author zsh
 */
define('bui/transfer/btnContainer',
		['bui/common', 'bui/transfer/button'],
		function(require){
	var BUI = require('bui/common'),
	Component = BUI.Component,
	Button = require('bui/transfer/button');

	var btnContainer = Component.Controller.extend({
		initializer : function(){
			var _self = this;
			_self.addChild(_self._initContainer());
		},
		renderUI : function() {
			var _self = this;
			_self.set('elStyle', {
				'display' : 'flex',
				'align-items' : 'center',
			});
		},
		_initContainer : function() {
			var _self = this;
			var events = _self.get('events');
			var div = new Component.Controller({
				elStyle : {
					'margin' : '0 auto'
				},
				children : [
					_self._initBtn('right', 'moveIn', '移入'),
					_self._initBtn('left', 'moveOut', '移出'),
					_self._initBtn('right-double', 'moveInAll', '全部移入'),
					_self._initBtn('left-double', 'moveOutAll', '全部移出')
				],
				events : _self.get('events')
			});
			return div;
		},
		_initBtn : function(typeCls, eventName, tip) {
			var _self = this;
			var btn = new Button({
				typeCls : typeCls,
				eventName : eventName,
				tip : tip
			});
			return btn;
		}
	},{
		ATTRS : {

			events : {
				value : {
					'moveIn' : true,
					'moveOut' : true,
					'moveInAll' : true,
					'moveOutAll' : true
				}
			},
		},
	});
	return btnContainer;
});