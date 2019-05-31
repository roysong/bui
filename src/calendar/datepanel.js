/**
 * @fileOverview 独立的日期控件，直接使用而非弹出使用
 * @author roysong
 */
define('bui/calendar/datepanel', ['bui/calendar/header', 'bui/calendar/panel'], function (require) {

  var BUI = require('bui/common'),
    Header = require('bui/calendar/header'),
    Panel = require('bui/calendar/panel'),
    Component = BUI.Component,
    UIBase = BUI.Component.UIBase,
    DateUtil = BUI.Date;
  /**
   * 日期控件，独立使用直接展示在界面上，不用于各种弹出框场景；<br/>
   * 只显示日期，不显示时分秒，没有操作按钮；<br/>
   * 点击某个具体的日期抛出事件；<br/>
   * 可自定义面板大小；<br/>
   * 可根据数据变化日期单元格的颜色，注意，颜色需要用数据进行设置;<br/>
   * 经测试建议使用的颜色关键字包括：red、green、blue、black、purple、pink、navy、teal、maroon、fuchsia、olive；<br/>
   * 也可自定义RGB传入；<br/>
   * xclass:'datepanel'
   * <pre><code>
   *  BUI.use('bui/calendar',function(Calendar){
   *    // 日期对应的颜色
   *    var data = [
	 *			{date : '2019-05-13',color : 'red'},
	 *			{date : '2019-05-23',color : 'green'},
	 *		];
	 *  	var store = new Data.Store({
	 *  		data : data
	 *  	});
   *    var datepanel = new Calendar.DatePanel({
	 *  		render : '#form',
	 *  		elStyle : {'font-size' : '18px'},//设置字体大小
	 *  		store : store,//用于渲染日期背景色的数据源；当不需要渲染日期背景色时，可不用此配置项
	 *  		width : 800,
	 *  		height : 600
	 *  	});
	 *  	datepanel.render();
	 *  	datepanel.on('click',function(e){
	 *  		if(e.date)
	 *  			console.log(e.date);	
	 *  	});
   *    // 切换月份时，刷新目标月的日期背景色
	 *  	datepanel.on('monthchange',function(e){
	 *  		var year = e.year,month = e.month + 1,monthstr = month;
	 *	  	if(month < 10)
	 *	  		monthstr = '0' + '' + month;
	 *	  	store.setResult([
	 *	  		{date : year + '-' + monthstr + '-' + '01',color: 'red'},
	 *	  		{date : year + '-' + monthstr + '-' + '03',color: 'maroon'},
	 *	  		{date : year + '-' + monthstr + '-' + '05',color: 'blue'},
	 *	  		{date : year + '-' + monthstr + '-' + '07',color: 'green'},
	 *	  		{date : year + '-' + monthstr + '-' + '09',color: 'fuchsia'},
	 *	  		{date : year + '-' + monthstr + '-' + '11',color: 'navy'},
	 *	  		{date : year + '-' + monthstr + '-' + '13',color: 'black'},
	 *	  		{date : year + '-' + monthstr + '-' + '15',color: 'olive'},
	 *	  		{date : year + '-' + monthstr + '-' + '18',color: 'teal'},
	 *	  		{date : year + '-' + monthstr + '-' + '24',color: 'purple'},
	 *	  		{date : year + '-' + monthstr + '-' + '25',color: 'pink'},
	 *	  	]);
	 *  	});
   * });
   * </code></pre>
   * @class BUI.Calendar.DatePanel
   * @mixins BUI.Component.UIBase.Bindable
   * @extends BUI.Component.Controller
   */
  var datePanel = Component.Controller.extend([UIBase.Bindable], {

    //设置内容
    initializer: function () {
      var _self = this, width = _self.get('width'),
        height = _self.get('height'),
        header = new Header({ id: 'dateHeader' }),
        panel = new Panel({ id: 'datePanel' });
      //添加头
      _self.addChild(header);
      //添加panel
      _self.addChild(panel);
    },
    //绑定事件
    bindUI: function () {
      var _self = this,
        header = _self.getChild('dateHeader'),
        panel = _self.getChild('datePanel');
      panel.on('selectedchange', function (e) {
        var date = e.date;
        if (!DateUtil.isDateEquals(date, _self.get('selectedDate'))) {
          _self.set('selectedDate', date);
        }
      });
      panel.on('click', function (e) {
        var now = _self.get('selectedDate');
        if(now){
          _self.fire('click', { date: BUI.Date.format(now,'yyyy-mm-dd')});
        }
      });
      header.on('monthchange', function (e) {
        _self._setYearMonth(e.year, e.month);
      });
    },
    // 根据store加载得来的数据改变日期单元格的背景色
    _updateDayColor: function (items) {
      if (!items) return;
      var _self = this,el = _self.get('el'),
        dayEl = el.find('.x-datepicker-date');
      dayEl.each(function(idx,dayDom){
        var day = $(dayDom);
        var d = day.attr('title');
        day.css('background-color', '');//清空当月所有日期单元格的背景色
        if(day.find('a').css('color') == 'white')
          day.find('a').css('color', 'black');//将变白的日期字体颜色设为黑色
        var record = BUI.Array.find(items,function(i){return i.date == d});
        if(record){
          day.css('background-color', record.color);
          day.find('a').css('color', 'white');
        }
      });
    },
    //更改年和月
    _setYearMonth: function (year, month) {
      var _self = this,
        selectedDate = _self.get('selectedDate'),
        date = selectedDate.getDate();
      if (year !== selectedDate.getFullYear() || month !== selectedDate.getMonth()) {
        var newDate = new Date(year, month, date);
        if (newDate.getMonth() != month) { //下一个月没有对应的日期,定位到下一个月最后一天
          newDate = DateUtil.addDay(-1, new Date(year, month + 1));
        }
        _self.set('selectedDate', newDate);
      }
        },
    //设置所选日期
    _uiSetSelectedDate: function (v) {
      var _self = this,
        year = v.getFullYear(),
        month = v.getMonth();

      _self.getChild('dateHeader').setMonth(year, month);
      _self.getChild('datePanel').set('selected', v);
      _self.fire('datechange', { date: v });
    },
    //设置最大值
    _uiSetMaxDate: function (v) {
      var _self = this;
      _self.get('panel').set('maxDate', v);
      _self._updateTodayBtnAble();
    },
    //设置最小值
    _uiSetMinDate: function (v) {
      var _self = this;
      _self.get('panel').set('minDate', v);
      _self._updateTodayBtnAble();
    },
  	/**
  	 * 加载数据时改变日期的背景颜色
  	 * @protected
  	 */
    onLoad: function () {
      var _self = this,
  	    store = _self.get('store'),
  	    items = store.getResult();
      _self._updateDayColor(items);
    }
  }, {
      ATTRS:
      {
        /**
         * 日历控件头部，选择年月
         * @private
         * @type {Object}
         */
        header: {

        },
        /**
         * 日历控件选择日
         * @private
         * @type {Object}
         */
        panel: {

        },
        /**
         * 最大日期
         * <pre><code>
         *   datePanel.set('maxDate','2013-07-29');
         * </code></pre>
         * @type {Date}
         */
        maxDate: {

        },
        /**
         * 最小日期
         * <pre><code>
         *   datePanel.set('minDate','2013-07-29');
         * </code></pre>
         * @type {Date}
         */
        minDate: {

        },
        /**
         * 日期面板整体的宽度，可根据业务需要自由调节,建议宽高比保持4:3
         * @cfg {Number} [width=380]
         */
        width: {
          value: 380
        },
        /**
         * 日期面板整体的高度，可根据业务需要自由调节
         * @cfg {Number} [height=285]
         */
        height: {
          value: 285
        },
        events: {
          value: {
            /**
            * @event
            * @name BUI.Calendar.DatePanel#click
            * @param {Object} e 点击事件
            * @param {Date} e.date
            */
            'click': false,
            /**
             * @event
             * @name BUI.Calendar.DatePanel#datechange
             * @param {Object} e 选中的日期发生改变
             * @param {Date} e.date
             */
            'datechange': false,
            /**
            * @event
            * @name BUI.Calendar.DatePanel#monthchange
            * @param {Object} e 月份发生改变
            * @param {Number} e.year
            * @param {Number} e.month
            */
            'monthchange': false
          }
        },
        /**
         * 选择的日期,默认为当天
         * <pre><code>
         *  var datePanel = new Calendar.DatePanel({
         *   render:'#calendar',
         *   selectedDate : new Date('2013/07/01') //不能使用字符串
         * });
         * </code></pre>
         * @cfg {Date} [selectedDate=today]
         */
        selectedDate: {
          value: BUI.Date.today()
        },
        /**用于日期背景色渲染的数据缓冲<br/>
         * 数据格式为[{date : '2019-05-13',color : 'red'},{date : '2019-05-23',color : 'green'}]<br/>
         * 颜色关键字包括：red、green、blue、black、purple、pink、navy、teal、maroon、fuchsia、olive；<br/>
         * 如果不需要日期背景色，可不使用此配置项<br/>
         * @cfg {BUI.Data.Store} [store]
         */
        store : {},
      }
    }, {
      xclass: 'datepanel',
      priority: 0
    });

  return datePanel;
});

