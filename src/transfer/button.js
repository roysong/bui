/**
 * @fileOverview 按钮
 * @author zsh
 */
define('bui/transfer/button',
		['bui/common'],
		function(require){
	var BUI = require('bui/common'),
	Component = BUI.Component;
	var button = Component.Controller.extend({
		initializer : function() {
			var _self = this,
			elCls = _self.get('elCls'),
			typeCls = _self.get('typeCls'),
			eventName = _self.get('eventName'),
			events = _self.get('events');
			elCls += ' ' + typeCls;
			_self.set('elCls', elCls);

			events[eventName] = true;
			_self.set('events', events);

			_self.set('elAttrs', {title : _self.get('tip')})
		},
		renderUI : function() {
			var _self = this;

			_self.set('elStyle', {
				'cursor' : 'pointer',
				'margin' : '0 0 20px',
				'display' : 'block'
			});
		},
		bindUI : function() {
			var _self = this,
			eventName = _self.get('eventName');
			_self.on('click', function() {
				_self.fire(eventName);
			});
		}
	},{
		ATTRS : {
			elTagName  : {value : 'span'},
			elCls : {value : 'x-icon x-icon-info'},
			typeCls : {},
			eventName : {},
			tip : {}
		}
	});
	return button;
});