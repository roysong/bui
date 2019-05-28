/**
 * @fileOverview 带清除功能的控件
 * @author luoyan
 * @ignore
 */
define('bui/calendar/clearctl',['bui/common'],function(require){
  
  var BUI = require('bui/common'),
    Component = BUI.Component,
  	UIBase = Component.UIBase;

  var ClearctlView = Component.View.extend([
      UIBase.PositionView
  ]);
  /**
   * 带清除功能的控件，显示为“×”
   * 
   * xclass : 'calendar-clearctl'
   * <pre><code>
   *   BUI.use('bui/calendar',function(Calendar){
   *      var clearctl = new Calendar.Clearctl({
   *        referNode:'.calendar',
   *      });
   *      clearctl.show();
   *    });
   * </code></pre>
   * @class BUI.Calendar.Clearctl
   * @extends BUI.Component.Controller UIBase.Position UIBase.Align
   * @ignore
   */
  var Clearctl = Component.Controller.extend([UIBase.Position,UIBase.Align],{
	  initializer : function(){
		  var _self = this;
		  var uid = BUI.guid('clearctl');
		  _self.set('id',uid);
		  _self.set('align',{
			  node: _self.get('referNode'),
			  points : ['cr', 'cr'],
			  offset: [-1, 0]
		  });
		  _self.set('zIndex',$(_self.get('referNode')).css('z-index')+1);
	  },
	  bindUI : function(){
		  var _self = this,referNode=_self.get('referNode');
		  _self.on('click',function(){
			  $(referNode).val('');
		  })
	  }
  },{
    ATTRS : {
    	/**
         * 需要清除数据的文本框的选择器
         * @type {String}
         */
    	referNode : {},
    	/**
    	 * 控件的dom元素类型
    	 * @type {String}
    	 * @ignore
    	 */
    	elTagName : {value : 'span'},
    	/**
    	 * 控件样式
    	 * @type {Object}
    	 * @ignore
    	 */
    	elStyle : {value : {border:0}},
    	/**
    	 * 控件class
    	 * @type {String}
    	 * @ignore
    	 */
    	elCls : {value : 'x-icon x-icon-normal'},
    	/**
    	 * 控件显示内容
    	 * @type {String}
    	 * @ignore
    	 */
    	content : {value : '×'},
        xview : {
            value : ClearctlView
        },
    }
  },{
    xclass:'clearctl'
  });
  Clearctl.View = ClearctlView;
  return Clearctl;
});
