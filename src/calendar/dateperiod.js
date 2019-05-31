/**
 * @fileOverview 日期段选择控件
 * @author luoyan
 */

define('bui/calendar/dateperiod',
['bui/calendar/datepickerclear','bui/toolbar'],
function(require){

  var BUI = require('bui/common'),
    PREFIX = BUI.prefix,
	DatePicker = require('bui/calendar/datepickerclear'),
	Calendar = require('bui/calendar/calendar'),
    Component = BUI.Component,Toolbar = require('bui/toolbar'),
    DateUtil = BUI.Date;
  function today(){
    var now = new Date();
    return new Date(now.getFullYear(),now.getMonth(),now.getDate());
  }
  /**
   *日期段选择控件，包含上面的输入框以及点击触发的日期弹出选择框 
    本组件只适用于日期段的选择，不适于时间段的选择。
    返回的日期格式为：‘yyyy-mm-dd’
   * xclass:'dateperiod'
   * <pre><code>
   *  BUI.use('bui/calendar',function(Calendar){
   *    var calendar = new Calendar.DatePeriod({
   *      render:'#calendar',
   *      startDateName : 'startDate',
   *      endDateName : 'endDate'
   *    });
   *    calendar.render();
   * });
   * </code></pre>
   * @class BUI.Calendar.DatePeriod
   * @extends BUI.Component.Controller
   */
  var dateperiod = Component.Controller.extend({

    //为两个输入框初始化两个弹出日历
    renderUI : function(){
      var _self = this;
      var datePicker = new DatePicker({
          trigger : _self.get('el').find('.date-period'),
      }); 
      datePicker.render();
      _self.set('datePicker',datePicker);
    },
    bindUI : function(){
      var _self = this,datePicker = _self.get('datePicker');
      datePicker.on('show',function(e){
          var calendar = datePicker.get('calendar');
          if(!calendar) return;
          var curTrigger = datePicker.get('curTrigger');
          if(curTrigger.hasClass('end-date')){
            var startDate = _self.get('el').find('.start-date').val();
            calendar.set('minDate',startDate);
            return;
          }
          if(curTrigger.hasClass('start-date')){
            calendar.set('minDate','1970-01-01');
          }
      });
      datePicker.on('clearClick',function(e){
          var calendar = datePicker.get('calendar');
          if(!calendar) return;
          if(e.node.hasClass('start-date')){
            calendar.set('minDate','1970-01-01');
          }
      });
    },
  },{
    ATTRS :
    {
      width:{
        value:380
      },
      tpl : {
        value : '<span><input name="{startDateName}" style="width:125px" class="start-date date-period calendar" type="text"><span class="icon icon-minus"></span><input name="{endDateName}" style="width:125px" class="end-date date-period calendar" type="text"></span>'
      },
	  /**
	   * 起始时间input的名字，用于表单提交时和后端模型字段对应
	   * @cfg {String} startDateName
	   */
	  startDateName : {
		  value : 'start'
	  },
	  /**
	   * 终止时间input的名字，用于表单提交时和后端模型字段对应
	   * @cfg {String} endDateName
	   */
	  endDateName : {
		  value : 'end'
	  },
	}
  },{
    xclass : 'dateperiod',
    priority : 0
  });

  return dateperiod;
});
