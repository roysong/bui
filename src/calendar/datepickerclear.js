/**
 * @fileOverview 带清除功能日期选择器
 * @author luoyan
 * @ignore
 */
define('bui/calendar/datepickerclear',['bui/common','bui/calendar/datepicker','bui/calendar/clearctl'],function(require){
  
  var BUI = require('bui/common'),
  	DatePicker = require('bui/calendar/datepicker'),
  	Clearctl = require('bui/calendar/clearctl');

  /**
   * 日期选择器，在DatePicker基础上添加清除输入框数据功能
   * 
   * xclass : 'calendar-datepickerclear'
   * <pre><code>
   *   BUI.use('bui/calendar',function(Calendar){
   *      var datepickerclear = new Calendar.DatePickerClear({
   *        trigger:'.calendar',
   *        autoRender : true,
   *        showTime : true //是否显示时分秒，默认false
   *      });
   *    });
   * </code></pre>
   * @class BUI.Calendar.DatePickerClear
   * @extends BUI.Calendar.DatePicker
   */
  var datepickerclear = DatePicker.extend({
	  renderUI : function(){
	    	var _self = this;
	    	var trigger = _self.get('trigger');
	    	$(trigger).each(function (i,domEl){
	    		new Clearctl({
	    			referNode : domEl
	    		}).show()
    		});
	    },
   },{
		xclass : 'datepickerclear',
	    priority : 0
  });
  return datepickerclear;
});
