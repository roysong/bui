/**
 * @fileOverview 日期面板容器中单周的容器
 * @author roysong
 * @ignore
 */
define('bui/calendar/week',['bui/common','bui/calendar/day'],function(r){
  var BUI = r('bui/common'),
    Component = BUI.Component,
    DateUtil = BUI.Date,
    Day = r('bui/calendar/day');
  var week = Component.Controller.extend({
    initializer : function(){
        var _self = this,startDate = _self.get('startDate');
        for(var i = 0;i < 7;i++){//一周有7天。。。俺寻思着其实这不需要注释吧
            var date = DateUtil.addDay(i,startDate);
            var oneDay = new Day({
                date : date,
                maxDate : _self.get('maxDate'),
                minDate : _self.get('minDate'),
                month : _self.get('month'),
                dateNumber: date.getDate()});
            _self.addChild(oneDay);
        }
    },
    updateColor : function(items){
        var _self = this,children = _self.get('children');
        BUI.each(children,function(c){
          c.updateColor(items);
        });
    },
  },{
      ATTRS : {
        startDate : {},
        month : {},
        maxDate : {},
        minDate: {},
        elTagName : {value : 'tr'},
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
  return week;
});