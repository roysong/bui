/**
 * @fileOverview 日期面板容器中单日的容器
 * @author roysong
 * @ignore
 */
define('bui/calendar/day',['bui/common'],function(r){
  var BUI = r('bui/common'),
    Component = BUI.Component,
    DateUtil = BUI.Date,
    CLS_TODAY = 'x-datepicker-today',
    DATE_MASK = 'isoDate',
    dateTypes = {
      deactive : 'prevday',
      active : 'active',
      disabled : 'disabled'
    },
    CLS_SELECTED = 'x-datepicker-selected',
    weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = Component.Controller.extend({
    renderUI : function(){
        var _self = this,date = _self.get('date'),el = _self.get('el'),
        day = date.getDay(),
        todayCls = _self._isToday(date) ? CLS_TODAY:'',
        dayOfWeek = weekDays[day],
        //不在指定的最大最小范围内，禁止选中
        dateType = _self._isInRange(date) ? 
         //不是本月则处于不活动状态
        (_self._isCurrentMonth(date) ? dateTypes.active : dateTypes.deactive) : 
        dateTypes.disabled
        ;
        el.addClass('x-datepicker-' + dateType);
        el.addClass(todayCls);
        el.addClass('day-' + dayOfWeek);
        el.attr('title',DateUtil.format(date,DATE_MASK));
    },
    bindUI : function(){
        var _self = this,el = _self.get('el'),date = _self.get('date');
        _self.on('click',function(e){
            if(!(_self._isInRange(date))) return;
            if(!(_self._isCurrentMonth(date))) return;
            _self.fire("selectedDate",{date : _self.get('date'),el : el});
        });
    },
    //是否是今天
    _isToday : function(date){
      var tody = new Date();
      return tody.getFullYear() === date.getFullYear() && 
        tody.getMonth() === date.getMonth() && 
        tody.getDate() === date.getDate();
    },
    //是否在允许的范围内
    _isInRange : function(date){
      var _self = this,
        maxDate = _self.get('maxDate'),
        minDate = _self.get('minDate');

      if(minDate && date < minDate){
        return false;
      }
      if(maxDate && date > maxDate){
        return false;
      }
      return true;
    },
    //是否是当前显示的月
    _isCurrentMonth : function(date){
      return date.getMonth() === this.get('month');
    },
    updateColor : function(items){
        var _self = this,date = _self.get('date'),el = _self.get('el'),
            dateStr = BUI.Date.format(date,DATE_MASK);
        var item = BUI.Array.find(items,function(i){return i.date == dateStr;});
        if(item){
            el.css('background-color',item.color);
            el.find('a').css('color', 'white');
        }else{
            el.css('background-color','');
            if(el.find('a').css == 'white')
                el.find('a').css('color', 'black');
        }
    }
  },{
      ATTRS : {
        date : {},
        dateNumber : {},
        maxDate : {},
        minDate: {},
        month : {},
        elTagName : {value : 'td'},
        elCls : {value : 'x-datepicker-date'},
        tpl : {value : '<a href="#" hidefocus="on" tabindex="1">'+
                '<em><span>{dateNumber}</span></em>'+
                '</a>'
              },
        events:{
          value : {
            /**
             * @event
             * @param {Object} e 点击事件
             * @param {Date} e.date
             */
            'selectedDate' : true,
          }
        },
      }
  });
  return day;
});
