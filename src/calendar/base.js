/**
 * @fileOverview 日历命名空间入口
 * @ignore
 */

define('bui/calendar',['bui/common','bui/calendar/calendar','bui/calendar/monthpicker','bui/calendar/datepicker',
	'bui/calendar/datepickerclear','bui/calendar/monthpickerclear','bui/calendar/clearctl'],function (require) {
  var BUI = require('bui/common'),
    Calendar = BUI.namespace('Calendar');
  BUI.mix(Calendar,{
    Calendar : require('bui/calendar/calendar'),
    MonthPicker : require('bui/calendar/monthpicker'),
    DatePicker : require('bui/calendar/datepicker'),
    Clearctl : require('bui/calendar/clearctl'),
    DatePickerClear : require('bui/calendar/datepickerclear'),
    MonthPickerClear : require('bui/calendar/monthpickerclear'),
  });

  return Calendar;
});