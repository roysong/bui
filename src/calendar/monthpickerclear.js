/**
 * @fileOverview 带清除功能的月份选择器
 * @author luoyan
 * @ignore
 */
define('bui/calendar/monthpickerclear',['bui/common','bui/calendar/monthpicker','bui/calendar/clearctl'],function(require){
  
  var BUI = require('bui/common'),
  	MonthPicker = require('bui/calendar/monthpicker'),
  	Clearctl = require('bui/calendar/clearctl');

  /**
   * 月份选择器，在MonthPicker基础上添加默认选中当前年月、回显年月、清除输入框数据功能
   * 
   * xclass : 'calendar-monthpickerclear'
   * <pre><code>
   *   BUI.use('bui/calendar',function(Calendar){
   *		var monthpickerclear = new Calendar.MonthPickerClear({
   *		    trigger:'.calendar',
   *	    	autoHide : true,
   *	        align : {
   *	           	points:['bl','tl']
   *	        }
   *		});
   *		monthpickerclear.render();
   *   });
   * </code></pre>
   * @class BUI.Calendar.MonthPickerClear
   * @extends BUI.Calendar.MonthPicker
   */
  var monthpickerclear = MonthPicker.extend({
	  renderUI : function(){
	    	var _self = this;
	    	var trigger = _self.get('trigger');
	    	$(trigger).each(function (i,domEl){
	    		new Clearctl({
	    			referNode : domEl
	    		}).show()
	    	});
	  },
	  bindUI : function(){
		  //设置默认选中当前年月，由于通过触发itemselected来实现，所以方法需要在itemselected绑定事件之后调用
		  this.setSelectedValue();
	  },
	  /**
		* 设置选中的值
		* <pre><code>
		*   monthPickerClear.setSelectedValue(2019,4);
		* </code></pre>
		* @param {Number} year 年份
		* @param {Number} month 月份
		* @protected
		*/
	  setSelectedValue : function(year,month){
		  var _self = this;
		  var yearPanel = _self.get('yearPanel'),
		  	 monthPanel = _self.get('monthPanel'),
		  	 year = year || _self.get('selectedDate').getFullYear(),
		  	month = month || _self.get('selectedDate').getMonth();
	      if(yearPanel){
	    	  yearPanel.setSelectedByField(year);
	      }
	      if(monthPanel){
	    	  monthPanel.setSelectedByField(month);
	      }
	  },
   },{
		ATTRS : {
			  /**
			   * 默认选中的日期
			   * @type {Date}
			   * @ignore
			   */
			  selectedDate: {
			      value: new Date()
			  },
			   /**
			    * 成功的回调函数，默认回显“年-月”
			    * <pre><code>
			    * BUI.use('bui/calendar',function(Calendar){
				* 	var monthpickerclear = new Calendar.MonthPickerClear({
				* 	    trigger:'.calendar',
				* 	    autoHide : true,
				*         align : {
				*            	points:['bl','tl']
				*         },
				*       success : function(){
				*       	$('#echoMonth').val(this.get('year')+'年'+(this.get('month')+1)+'月')
				*       }
				* 	});
				* 	monthpickerclear.render();
				* });
			    * </code></pre>
			    * @type {Function}
			    */
			  success:{
			     value : function(){
			    	 this.get('curTrigger').val(this.get('year')+'-'+(this.get('month')+1));
			    	 this.hide();
			     }
			  },
			  /**
		       * 取消的回调函数，默认隐藏组件
		       * @type {Function}
		       */
		      cancel :{
		    	  value : function(){
		    		  this.hide();
		    	  } 
		      },
			/**
			 * 设置对齐属性
			 * 对齐配置，详细说明请参看： <a href="http://www.cnblogs.com/zaohe/archive/2013/04/09/3010651.html">JS控件 对齐</a>
			 * @type {Object}
			 * @field
			 * <code>
			 *   var align =  {
			 *        node: null,         // 参考元素, falsy 或 window 为可视区域, 'trigger' 为触发元素, 其他为指定元素
			 *        points: ['cc','cc'], // ['tr', 'tl'] 表示 overlay 的 tl 与参考节点的 tr 对齐
			 *        offset: [0, 0]      // 有效值为 [n, m]
			 *     };
			 * </code>
			 */
			align:{
			    value:{}
			}
		}
	},{
		xclass : 'monthpickerclear',
  });
  return monthpickerclear;
});
