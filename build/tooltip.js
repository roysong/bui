/**
 * @fileOverview 提示的入口文件
 * @ignore
 */

define('bui/tooltip',['bui/common','bui/tooltip/tip','bui/tooltip/tips'],function (require) {
  var BUI = require('bui/common'),
    Tooltip = BUI.namespace('Tooltip'),
    Tip = require('bui/tooltip/tip'),
    Tips = require('bui/tooltip/tips');
    Badge = require('bui/tooltip/badge');

  BUI.mix(Tooltip,{
    Tip : Tip,
    Tips : Tips,
    Badge : Badge
  });
  return Tooltip;
});/**
 * @fileOverview 简单易用的提示信息
 * @ignore
 */

define('bui/tooltip/tip',['bui/common','bui/overlay'],function (require) {
  var BUI = require('bui/common'),
    Overlay = require('bui/overlay'),
    CLS_ALIGN_PREFIX = 'x-align-',
    MAP_TYPES = {
      left : ['cl','cr'], //居左
      right : ['cr','cl'], //居右
      top : ['tc','bc'], //居上
      bottom : ['bc','tc'], //居下
      'top-left' : ['tl','bl'],
      'top-right' : ['tr','br'],
      'bottom-left' : ['bl','tl'],
      'bottom-right' : ['br','tr']
    };
  //获取距离
  function getOffset(type,offset){
    if(type === 'left'){
      return [-1 * offset,-4];
    }
    if(type === 'right'){
      return [offset,-4];
    }
    if(type.indexOf('top')){
      return [0,offset];
    }

    if(type.indexOf('bottom')){
      return [0,-1 * offset];
    }
  }

  var TipView = Overlay.OverlayView.extend({
    renderUI : function(){

    },
    //获取显示文本的容器
    _getTitleContainer : function(){
      return  this.get('el');
    },
    //设置文本
    _uiSetTitle : function(title){
      var _self = this,
        titleTpl = _self.get('titleTpl'),
        container = _self._getTitleContainer(),
        titleEl = _self.get('titleEl'),
        tem;
      if(titleEl){
        titleEl.remove();
      }
      title = title || '';
      if(BUI.isString(title)){
        title = {title : title};
      }
      tem = BUI.substitute(titleTpl,title);
      titleEl = $(tem).appendTo(container);
      _self.set('titleEl',titleEl);
    },
    //设置对齐样式
    _uiSetAlignType : function(type,ev){
      var _self = this;
      if(ev && ev.prevVal){
        _self.get('el').removeClass(CLS_ALIGN_PREFIX + ev.prevVal);
      }
      if(type){
        _self.get('el').addClass(CLS_ALIGN_PREFIX + type);
      }
    }
  },{
    ATTRS : {
      title : {},
      titleEl : {},
      alignType : {}
    }
  },{
    xclass : 'tooltip-view'
  });
  
  /**
   * @class BUI.Tooltip.Tip
   * @extends BUI.Overlay.Overlay
   * 简易的提示信息
   * 
   * ** 你可以简单的使用单个tip **
   * <pre><code>
   * BUI.use('bui/tooltip',function (Tooltip) {
   *  //不使用模板的，左侧显示
   *   var t1 = new Tooltip.Tip({
   *     trigger : '#t1',
   *     alignType : 'left', //方向
   *     showArrow : false, //不显示箭头
   *     offset : 5, //距离左边的距离
   *     title : '无任何样式，<br>左边的提示信息'
   *   });
   *   t1.render();
   *  });
   * </code></pre>
   *
   * ** 也可以配置模板 **
   * <pre><code>
   * BUI.use('bui/tooltip',function (Tooltip) {
   *  //使用模板的，左侧显示
   *   var t1 = new Tooltip.Tip({
   *     trigger : '#t1',
   *     alignType : 'left', //方向
   *     titleTpl : '&lt;span class="x-icon x-icon-small x-icon-success"&gt;&lt;i class="icon icon-white icon-question"&gt;&lt;/i&gt;&lt;/span&gt;\
   *     &lt;div class="tips-content"&gt;{title}&lt;/div&gt;',
   *     offset : 5, //距离左边的距离
   *     title : '无任何样式，&lt;br&gt;左边的提示信息'
   *   });
   *   t1.render();
   *  });
   * </code></pre>
   */
  var Tip = Overlay.Overlay.extend({
    //设置对齐方式
    _uiSetAlignType : function(type){
      var _self = this,
        offset = _self.get('offset'),
        align = _self.get('align') || {},
        points = MAP_TYPES[type];
      if(points){
        align.points = points;
        if(offset){
          align.offset = getOffset(type,offset);
        }
        _self.set('align',align);
      }
    }
  },{
    ATTRS : {
      //使用委托的方式显示提示信息
      delegateTrigger : {
        value : true
      },
      /**
       * 对齐类型，包括： top,left,right,bottom四种常用方式，其他对齐方式，可以使用@see{BUI.Tooltip.Tip#property-align}属性
       * 
       * @type {String}
       */
      alignType : {
        view : true
      },
      /**
       * 显示的内容，文本或者键值对
       * <pre><code>
       *     var tip =  new Tip({
       *        title : {a : 'text a',b:'text b'}, //属性是对象
       *        titleTpl : '<p>this is {a},because {b}</p>' // <p>this is text a,because text b</p>
       *      });
       * </code></pre>
       * @cfg {String|Object} title
       */
      /**
       * 显示的内容
       * <pre><code>
       *  //设置文本
       *  tip.set('title','new title');
       *
       *  //设置对象
       *  tip.set('title',{a : 'a',b : 'b'})
       * </code></pre>
       * @type {Object}
       */
      title : {
        view : true
      },
      /**
       * 显示对齐箭头
       * @override
       * @default true
       * @cfg {Boolean} [showArrow = true]
       */
      showArrow : {
        value : true
      },
      /**
       * 箭头放置在的位置，是一个选择器，例如 .arrow-wraper
       * <pre><code>
       *     new Tip({ //可以设置整个控件的模板
       *       arrowContainer : '.arrow-wraper',
       *       tpl : '<div class="arrow-wraper"></div>'
       *     });
       *     
       *     new Tip({ //也可以设置title的模板
       *       arrowContainer : '.arrow-wraper',
       *       titleTpl : '<div class="arrow-wraper">{title}</div>'
       *     });
       * </code></pre>   
       * @cfg {String} arrowContainer
       */
      arrowContainer : {
        view : true
      },
      //自动显示
      autoHide : {
        value : true
      },
      //覆盖自动隐藏类型
      autoHideType : {
        value : 'leave'
      },
      /**
      * 显示的tip 距离触发器Dom的距离
      * <pre><code>
      *  var tip =  new Tip({
      *    title : {a : 'text a',b:'text b'}, //属性是对象
      *    offset : 10, //距离
      *    titleTpl : '<p>this is {a},because {b}</p>' // <p>this is text a,because text b</p>
      *  });
      * </code></pre>
      * @cfg {Number} offset
      */
      offset : {
        value : 0
      },
      /**
       * 触发显示tip的事件名称，默认为mouseover
       * @type {String}
       * @protected
       */
      triggerEvent : {
        value : 'mouseover'
      },
      /**
       * 显示文本的模板
       * <pre><code>
       *  var tip =  new Tip({
       *    title : {a : 'text a',b:'text b'}, //属性是对象
       *    offset : 10, //距离
       *    titleTpl : '<p>this is {a},because {b}</p>' // <p>this is text a,because text b</p>
       *  });
       * </code></pre>
       * @type {String}
       */
      titleTpl : {
        view : true,
        value : '<span>{title}</span>'
      },
      xview : {
        value : TipView
      }
    }
  },{
    xclass : 'tooltip'
  });

  Tip.View = TipView;

  return Tip;
});/**
 * @fileOverview 批量显示提示信息
 * @ignore
 */

define('bui/tooltip/tips',['bui/common','bui/tooltip/tip'],function(require) {

  //是否json对象构成的字符串
  function isObjectString(str){
    return /^{.*}$/.test(str);
  }

  var BUI = require('bui/common'),
    Tip = require('bui/tooltip/tip'),
    /**
     * @class BUI.Tooltip.Tips
     * 批量显示提示信息
     *  <pre><code>
     * BUI.use('bui/tooltip',function(){
     *   var tips = new Tooltip.Tips({
     *     tip : {
     *       trigger : '#t1 a', //出现此样式的元素显示tip
     *       alignType : 'top', //默认方向
     *       elCls : 'tips tips-no-icon tip1',
     *       titleTpl : '&lt;span class="x-icon x-icon-small x-icon-success"&gt;&lt;i class="icon icon-white icon-question"&gt;&lt;/i&gt;&lt;/span&gt;\
   *           &lt;div class="tips-content"&gt;{title}&lt;/div&gt;',
     *       offset : 10 //距离左边的距离
     *     }
     *   });
     *   tips.render();
     * })
     * 
     * </code></pre>
     */
    Tips = function(config){
      Tips.superclass.constructor.call(this,config);
    };

  Tips.ATTRS = {

    /**
     * 使用的提示控件或者配置信息 @see {BUI.Tooltip.Tip}
     * <pre><code>
     *    //不使用模板的，左侧显示
     * var tips = new Tooltip.Tips({
     *   tip : {
     *     trigger : '#t1 a', //出现此样式的元素显示tip
     *     alignType : 'top', //默认方向
     *     elCls : 'tips tips-no-icon tip1',
     *     offset : 10 //距离左边的距离
     *   }
     * });
     * tips.render();
     * </code></pre>
     * @cfg {BUI.Tooltip.Tip|Object} tip
     */
    /**
     * 使用的提示控件 @see {BUI.Tooltip.Tip}
     * <pre><code>
     *    var tip = tips.get('tip');
     * </code></pre>
     * @type {BUI.Tooltip.Tip}
     * @readOnly
     */
    tip : {

    },
    /**
     * 默认的对齐方式,如果不指定tip的对齐方式，那么使用此属性
     * <pre><code>
     * //不使用模板的，左侧显示
     * var tips = new Tooltip.Tips({
     *   tip : {
     *     trigger : '#t1 a', //出现此样式的元素显示tip
     *     defaultAlignType : 'top', //默认方向
     *     elCls : 'tips tips-no-icon tip1',
     *     offset : 10 //距离左边的距离
     *   }
     * });
     * tips.render();
     * </code></pre>
     * @cfg {Object} defaultAlignType
     */
    defaultAlignType : {

    }
  };

  BUI.extend(Tips,BUI.Base);

  BUI.augment(Tips,{
    //初始化
    _init : function(){
      this._initDom();
      this._initEvent();
    },
    //初始化DOM
    _initDom : function(){
      var _self = this,
        tip = _self.get('tip'),
        defaultAlignType;
      if(tip && !tip.isController){
        defaultAlignType = tip.alignType; //设置默认的对齐方式
        tip = new Tip(tip);
        tip.render();
        _self.set('tip',tip);
        if(defaultAlignType){
          _self.set('defaultAlignType',defaultAlignType);
        }
      }
    },
    //初始化事件
    _initEvent : function(){
      var _self = this,
        tip = _self.get('tip');
      tip.on('triggerchange',function(ev){
        var curTrigger = ev.curTrigger;
        _self._replaceTitle(curTrigger);
        _self._setTitle(curTrigger,tip);
      });
    },
    //替换掉title
    _replaceTitle : function(triggerEl){
      var title = triggerEl.attr('title');
      if(title){
        triggerEl.attr('data-title',title);
        triggerEl[0].removeAttribute('title');
      }
    },
    //设置title
    _setTitle : function(triggerEl,tip){
      var _self = this,
        title = triggerEl.attr('data-title'),
        alignType = triggerEl.attr('data-align') || _self.get('defaultAlignType');

      if(isObjectString(title)){
        title = BUI.JSON.looseParse(title);
      }
      tip.set('title',title);
      if(alignType){
        tip.set('alignType',alignType);
      }
    },
    /**
     * 渲染提示信息
     * @chainable
     */
    render : function(){
      this._init();
      return this;
    }
  });

  return Tips;
});/**
 * @fileoverview 徽标组件
 * @author bili
 * @date 190524
 */
define('bui/tooltip/badge', ['bui/common'], function (r) {
    var BUI = r('bui/common'), Component = BUI.Component,
    STATUS={
        success :'#52c41a',
        error   :'#f5222d',
        default :'#d9d9d9',
        processing :'#1890ff',
        warning :'#faad14'
    };
    /**
     * ## 徽标组件
     * ### 基本使用
     * {@img badge1.png demo1}
     * <pre><code>
     * BUI.use('bui/tooltip', function (Tooltip) {
            var badge = new Tooltip.Badge({
                count: 10,//徽标上显示的数量
                children: [
                    //需要显示徽标的组件
                    {xclass:'controller',content:'&lt;button class="button button-success"&gt;测试按钮&lt;/button&gt;'},
                ]
            });
            badge.render();
        });
     * </code></pre>
     * ***
     * ### 超过一定数量的展示为设定数量+
     * {@img badge2.png demo2}
     * <pre><code>
     * BUI.use('bui/tooltip', function (Tooltip) {
            var badge = new Tooltip.Badge({
                count: 10,//徽标上显示的数量
                overflowCount:5, //超出此数量的展示为5+
                children: [
                    //需要显示徽标的组件
                    {xclass:'controller',content:'&lt;button class="button button-success"&gt;测试按钮&lt;/button&gt;'},
                ]
            });
            badge.render();
        });
     * </code></pre>
     * ***
     * ### 设置不同状态
     * {@img badge3.png demo2}
     * <pre><code>
     * BUI.use('bui/tooltip', function (Tooltip) {
            var badge = new Tooltip.Badge({
                count: 10,//徽标上显示的数量
                status:'warning',
                children: [
                    //需要显示徽标的组件
                    {xclass:'controller',content:'&lt;button class="button button-success"&gt;测试按钮&lt;/button&gt;'},
                ]
            });
            badge.render();
        });
     * </code></pre>
     * ***
     * ### 不展示数字，只展示小圆点
     * {@img badge4.png demo2}
     * <pre><code>
     * BUI.use('bui/tooltip', function (Tooltip) {
            var badge = new Tooltip.Badge({
                count: 10,//徽标上显示的数量
                status:'warning',
                dot:true,
                children: [
                    //需要显示徽标的组件
                    {xclass:'controller',content:'&lt;button class="button button-success"&gt;测试按钮&lt;/button&gt;'},
                ]
            });
            badge.render();
        });
     * </code></pre>
     * ***
     * ### 自定义背景色
     * {@img badge5.png demo2}
     * <pre><code>
     * BUI.use('bui/tooltip', function (Tooltip) {
            var badge = new Tooltip.Badge({
                count: 10,//徽标上显示的数量
                status:'warning',
                color:'#ff00ff',
                children: [
                    //需要显示徽标的组件
                    {xclass:'controller',content:'&lt;button class="button button-success"&gt;测试按钮&lt;/button&gt;'},
                ]
            });
            badge.render();
        });
     * </code></pre>
     * ***
     * @class BUI.Tooltip.Badge
     * @extends BUI.Component.Controller
     */
    return Component.Controller.extend({
        initializer:function(){
            this._updateStatus();
        },
        /**
         * 根据配置计算需要展示的值
         * @private
         */
        _updateStatus:function(){
            var _self = this;
            _self.set('showCount',_self.get('count'));
            _self.set('supCls','eno-badge-count eno-badge-multiple-words')
            //count为0时是否展示
            if(!(_self.get('showZero') || _self.get('count'))){
                _self.set('supDisplay','none');
            }else{
                _self.set('supDisplay','inline-block');
            }
            //判断overflowCount来修改展示的count值
            if(_self.get('overflowCount')&&_self.get('count')>_self.get('overflowCount')){
                _self.set('showCount',_self.get('overflowCount')+"+");
            }
            //status修改sup背景色
            if(_self.get('status')){
                _self.set('backgroundColorStyle','background-color:'+STATUS[_self.get('status')]+';')
            }
            //color修改sup背景色
            if(_self.get('color')){
                _self.set('backgroundColorStyle','background-color:'+_self.get('color')+';')
            }
            //根据是否展示红点{dot}判断sup的class
            if(_self.get('dot')){
                _self.set('supCls','eno-badge-dot');
                _self.set('text','');
                _self.set('showCount','');
            }
            return {
                supCls:_self.get('supCls'),
                text:_self.get('text'),
                showCount:_self.get('showCount'),
                supCls:_self.get('supCls'),
                supDisplay:_self.get('supDisplay'),
                backgroundColorStyle:_self.get('backgroundColorStyle'),
            }
        },
        renderUI:function(){
            var _self = this,el = _self.get('el'),sup = el.find('#eno-badge-sup'),
            supWidth = sup.outerWidth(true),supHeight = sup.height();
            _self.set('elStyle',{marginTop:supHeight/2,marginRight:supWidth/2});
        },
        /**
         * 修改属性，根据修改的属性重新渲染徽标内容  
         * @param {string} 修改属性的key 参照config
         * @param {string} 修改属性的值
         */
        setStatus:function(key,value){
            var _self = this,el = _self.get('el');
            _self.set(key,value);
            var showParam = _self._updateStatus();
            el.find("#eno-badge-sup").remove();
            var html = BUI.substitute(_self.get('tpl'),showParam)
            el.append(html);
        }
    }, {
            ATTRS: {
                /**
                 * 自定义小圆点颜色  
                 * 与status同时设置时，color的优先级高于status  
                 * 支持以下两种定义方式  
                 * ### Presets: html内置颜色
                 *  - <span style="background-color:pink">pink</span>
                 *  - <span style="background-color:red">red</span>
                 *  - <span style="background-color:yellow">yellow</span>
                 *  - <span style="background-color:orange">orange</span>
                 * 
                 * ### Custom: 十六进制html颜色
                 *  - <span style="background-color:#f50">'#f50'</span>
                 *  - <span style="background-color:#2db7f5">'#2db7f5'</span>
                 *  - <span style="background-color:#87d068">'#87d068'</span>
                 *  - <span style="background-color:#108ee9">'#108ee9'</span>
                 * @cfg {?string}
                 */
                color:{},
                /**
                 * ### 状态,根据不同状态展示不同颜色的徽标
                 * - <span style="background-color:#52c41a">success</span>
                 * - <span style="background-color:#f5222d">error</span>
                 * - <span style="background-color:#1890ff">processing</span>
                 * - <span style="background-color:#faad14">warning</span>
                 *   
                 * default error
                 * @cfg {?string}
                 */
                status:{},
                /**
                 * 展示的数字  
                 * 如果设置了overflowCount参数，大于 overflowCount 时显示为 ${overflowCount}+  
                 * default 0  
                 * @cfg {number} 
                 */
                count:{value:0},
                /**
                 * 为true时只显示有一个圆点  
                 * default false  
                 * @cfg {?boolean}
                 */
                dot:{value:false},
                /**
                 * 展示封顶的数字值  
                 * ${count}超过此值时，显示为${overflowCount}+  
                 * @cfg {?number}
                 */
                overflowCount:{},
                /**
                 * ${count}为0时，是否展示徽标  
                 * 默认不展示  
                 * default false  
                 * @cfg {?boolean}
                 */
                showZero:{value:false},
                /**
                 * 设置数字前的文本
                 * @cfg {?string}
                 */
                text:{},
                tpl:{
                    value:'<sup class="{supCls}" id="eno-badge-sup" style="display: {supDisplay};{backgroundColorStyle}">{text}{showCount}</sup>'
                },
                elTagName:{
                    value:'span'
                },
                elCls:{
                    // value:'eno-badge-content'
                    value:'eno-badge'
                }
            }
        });
});