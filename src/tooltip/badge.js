/**
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
                    value:'eno-badge-content'
                }
            }
        });
});