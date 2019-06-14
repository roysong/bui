/**
 * @fileOverview 日历控件显示一月的日期面板容器
 * @author roysong
 * @ignore
 */
define('bui/calendar/panelcontainer',['bui/common','bui/calendar/week'],function (require) {

  var BUI = require('bui/common'),
    Component = BUI.Component,
    DateUtil = BUI.Date,
    Week = require('bui/calendar/week'),
    CLS_SELECTED = 'x-datepicker-selected',
    SHOW_WEEKS = 6//当前容器显示6周
    ;

  /**
   * 日历控件显示日期的容器
   * xclass:'calendar-panelcontainer'
   * @class BUI.Calendar.PanelContainer
   * @private
   * @extends BUI.Component.Controller
   */
  var panel = Component.Controller.extend(
  {
    /**
     * 设置默认年月
     * @protected
     */
    initializer : function(){
      var _self = this,
        now = new Date();
      if(!_self.get('year')){
        _self.set('year',now.getFullYear());
      }
      if(!_self.get('month')){
        _self.set('month',now.getMonth());
      }
      _self.updatePanel();
    },
    /**
     * 刷新显示
     */
    updatePanel : function(){
      var _self = this;
      _self.removeChildren(true);
      var startDate = _self._getFirstDate();
      for (var i = 0; i < SHOW_WEEKS; i++) {
        var weekStart = DateUtil.addWeek(i,startDate);
        var oneWeek = new Week({
          startDate : weekStart,
          maxDate : _self.get('maxDate'),
          minDate : _self.get('minDate'),
          month : _self.get('month'),
        });
        _self.addChild(oneWeek);
      };
    },
    updateColor : function(items){
      var _self = this,children = _self.get('children');
      BUI.each(children,function(c){
        c.updateColor(items);
      });
    },
    //获取当前容器的第一天
    _getFirstDate : function(year,month){
      var _self = this,
        monthFirstDate = _self._getMonthFirstDate(year,month),
        day = monthFirstDate.getDay();
      return DateUtil.addDay(day * -1,monthFirstDate);
    },
    //获取当月的第一天
    _getMonthFirstDate : function(year,month){
      var _self = this,
        year = year || _self.get('year'),
        month = month || _self.get('month');
      return new Date(year,month);
    },
    /**
     * @protected
     * @ignore
     */
    bindUI : function(){
      var _self = this,
        el = _self.get('el');
      _self.on('selectedDate',function(e){
        el.find('.'+CLS_SELECTED).removeClass(CLS_SELECTED);
        e.el.addClass(CLS_SELECTED);
        delete e.el;//由于事件会继续抛出，删除它的dom属性以免内存泄露
        _self.set('selected',e.date);
        _self.fire('selectedchange',e);
      }); 
    },
    /**
     * 设置年月
     * @param {Number} year  年
     * @param {Number} month 月
     */
    setMonth : function(year,month){
      var _self = this,
        curYear = _self.get('year'),
        curMonth = _self.get('month');
      if(year !== curYear || month !== curMonth){
        _self.set('year',year);
        _self.set('month',month);
    		_self.updatePanel();
      }
    },
  },{
    ATTRS:
    {
      /**
       * 展示的月所属年
       * @type {Number}
       */
      year : {
      },
      elCls : {
        value : 'bui-calendar-panel'
      },
      /**
       * 展示的月
       * @type {Number}
       */
      month:{
      },
      /**
       * 选中的日期
       * @type {Date}
       */
      selected : {
      },
      focusable:{
      },
      events:{
        value : {
          /**
           * @name BUI.Calendar.Panel#selectedchange
           * @param {Object} e 点击事件
           * @param {Date} e.date
           */
          'selectedchange' : false,
          'selectedDate' : false,
        }
      },
      /**
       * 最小日期
       * @type {Date | String}
       */
      maxDate : {
        setter : function(val){
          if(val){
            if(BUI.isString(val)){
              return DateUtil.parse(val);
            }
            return val;
          }
        }
      },
      /**
       * 最小日期
       * @type {Date | String}
       */
      minDate : {
        setter : function(val){
          if(val){
            if(BUI.isString(val)){
              return DateUtil.parse(val);
            }
            return val;
          }
        }
      },
      tpl:{
        value:'<table class="x-datepicker-inner" cellspacing="0">' +
                '<thead>' +
                   '<tr>' +
                    '<th  title="Sunday"><span>日</span></th>' +
                    '<th  title="Monday"><span>一</span></th>' +
                    '<th  title="Tuesday"><span>二</span></th>' +
                    '<th  title="Wednesday"><span>三</span></th>' +
                    '<th  title="Thursday"><span>四</span></th>' +
                    '<th  title="Friday"><span>五</span></th>' +
                    '<th  title="Saturday"><span>六</span></th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody class="x-datepicker-body">' +
                '</tbody>' +
              '</table>'
      },
      childContainer: {
        value : 'tbody'
      },
    }
  },{
    xclass:'calendar-panelcontainer',
    priority:0
  });

  return panel;
});