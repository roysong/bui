/**
 * @fileOverview badge 徽标
 * @author bili
 * @ignore
 */
define('bui/grid/plugins/badge', ['bui/common'], function (require) {
    var BUI = require('bui/common'),
        UA = BUI.UA;
    /**
     * 根据 HSB 色彩模型进行设计，平衡了可读性、美感以及可用性得出
     */
    STATUS = {
        success: '#52c41a',
        error: '#f5222d',
        default: '#d9d9d9',
        processing: '#1890ff',
        warning: '#faad14'
    };
    /**
     * ## 徽标插件
     * 只能用于BUI.Component.Controller及其子类
     * ### 基本使用
     * {@img badge1.png}
     * <pre><code>
     * BUI.use(['bui/common','bui/grid'], function (BUI,Grid) {
            var button = new BUI.Component.Controller({
                id:'button',
                width:90,
                plugins: [Grid.Plugins.Badge],
                badgeCfg: {
                    count: 10,
                },
                content:"&lt;button class='button button-success'&gt;测试按钮&lt;/button&ge;"
            });
            button.render();
        });
     * </code></pre>
     * ### 超过一定数量的展示为设定数量+
     * {@img badge2.png}
     * <pre><code>
     * BUI.use(['bui/common','bui/grid'], function (BUI,Grid) {
            var button = new BUI.Component.Controller({
                id:'button',
                width:90,
                plugins: [Grid.Plugins.Badge],
                badgeCfg: {
                    count: 10,
                    overflowCount:5
                },
                content:"&lt;button class='button button-success'&gt;测试按钮&lt;/button&ge;"
            });
            button.render();
        });
     * </code></pre>
     * ### 设置不同状态
     * {@img badge3.png}
     * <pre><code>
     * BUI.use(['bui/common','bui/grid'], function (BUI,Grid) {
            var button = new BUI.Component.Controller({
                id:'button',
                width:90,
                plugins: [Grid.Plugins.Badge],
                badgeCfg: {
                    count: 10,
                    status:'warning'
                },
                content:"&lt;button class='button button-success'&gt;测试按钮&lt;/button&ge;"
            });
            button.render();
        });
     * </code></pre>
     * ### 不展示数字，只展示小圆点
     * {@img badge4.png}
     * <pre><code>
     * BUI.use(['bui/common','bui/grid'], function (BUI,Grid) {
            var button = new BUI.Component.Controller({
                id:'button',
                width:90,
                plugins: [Grid.Plugins.Badge],
                badgeCfg: {
                    count: 10,
                    status:'warning',
                    dot:true
                },
                content:"&lt;button class='button button-success'&gt;测试按钮&lt;/button&ge;"
            });
            button.render();
        });
     * </code></pre>
     * ### 自定义背景色
     * {@img badge5.png}
     * <pre><code>
     * BUI.use(['bui/common','bui/grid'], function (BUI,Grid) {
            var button = new BUI.Component.Controller({
                id:'button',
                width:90,
                plugins: [Grid.Plugins.Badge],
                badgeCfg: {
                    count: 10,
                    color: '#ff00ff'
                },
                content:"&lt;button class='button button-success'&gt;测试按钮&lt;/button&ge;"
            });
            button.render();
        });
     * </code></pre>
     * ### 带有文字提示的徽标
     * {@img badge6.png}
     * <pre><code>
     * BUI.use(['bui/common','bui/grid'], function (BUI,Grid) {
            var button = new BUI.Component.Controller({
                id:'button',
                width:90,
                plugins: [Grid.Plugins.Badge],
                badgeCfg: {
                    count: 10,
                    text: '消息'
                },
                content:"&lt;button class='button button-success'&gt;测试按钮&lt;/button&ge;"
            });
            button.render();
        });
     * </code></pre>
     *  @class BUI.Grid.Plugins.Badge
     *  @extends BUI.Base
     */ 
    var Badge = function (cfg) {
        Badge.superclass.constructor.call(this, cfg);
    };
    BUI.extend(Badge, BUI.Base);
    Badge.ATTRS = {
        /**
         * ## 使用徽标插件的组件需传入的参数列表
         * 
         * ---
         * ###  color: {string} 
         * 自定义小圆点颜色  
         * 与status同时设置时，color的优先级高于status  
         * 支持以下两种定义方式  
         * *** Presets: html内置颜色 ***
         * 
         *  - <span style="background-color:pink">pink</span>
         *  - <span style="background-color:red">red</span>
         *  - <span style="background-color:yellow">yellow</span>
         *  - <span style="background-color:orange">orange</span>
         * 
         * *** Custom: 十六进制html颜色 ***
         * 
         *  - <span style="background-color:#f50">'#f50'</span>
         *  - <span style="background-color:#2db7f5">'#2db7f5'</span>
         *  - <span style="background-color:#87d068">'#87d068'</span>
         *  - <span style="background-color:#108ee9">'#108ee9'</span>
         * 
         * ---
         * ### status: {string}  default error 
         * *** 状态,根据不同状态展示不同颜色的徽标 ***
         * 
         * - <span style="background-color:#52c41a">success</span>
         * - <span style="background-color:#f5222d">error</span>
         * - <span style="background-color:#1890ff">processing</span>
         * - <span style="background-color:#faad14">warning</span>
         * 
         * ---
         * ### count: {number} default 0  
         * 展示的数字   
         * 如果设置了overflowCount参数，大于 overflowCount 时显示为 ${overflowCount}+  
         * 
         * ---
         * ### dot: {boolean} default false 
         * 为true时只显示有一个圆点  
         * 
         * ---
         * ### overflowCount {number} 
         * 展示封顶的数字值     
         * ${count}超过此值时，显示为${overflowCount}+  
         * 
         * ---
         * ### showZero {boolean} default false 
         * ${count}为0时，是否展示徽标  
         * 默认不展示  
         * 
         * --- 
         * ### text {string} 
         * 设置数字前的文本   
         * 
         * @cfg {Object}
         */
        badgeCfg: {
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
             * {?string}
             * @ignore
             */
            color: {},
            /**
             * ### 状态,根据不同状态展示不同颜色的徽标
             * - <span style="background-color:#52c41a">success</span>
             * - <span style="background-color:#f5222d">error</span>
             * - <span style="background-color:#1890ff">processing</span>
             * - <span style="background-color:#faad14">warning</span>
             *   
             * default error
             * {?string}
             * @ignore
             * 
             */
            status: {},
            /**
             * 展示的数字  
             * 如果设置了overflowCount参数，大于 overflowCount 时显示为 ${overflowCount}+  
             * default 0  
             * {number} 
             * @ignore
             * 
             */
            count: { value: 0 },
            /**
             * 为true时只显示有一个圆点  
             * default false  
             * {?boolean}
             * @ignore
             * 
             */
            dot: { value: false },
            /**
             * 展示封顶的数字值  
             * ${count}超过此值时，显示为${overflowCount}+  
             * {?number}
             * @ignore
             * 
             */
            overflowCount: {},
            /**
             * ${count}为0时，是否展示徽标  
             * 默认不展示  
             * default false  
             * {?boolean}
             * @ignore
             * 
             */
            showZero: { value: false },
            /**
             * 设置数字前的文本
             * {?string}
             * @ignore
             * 
             */
            text: {}
        },
        badgeTpl: {
            value: '<sup class="{badgeSupCls} eno-badge-sup" style="display: {badgeSupDisplay};{badgeBackgroundColorStyle}">{text}{badgeShowCount}</sup>'
        }
    };
    BUI.augment(Badge, {
        initializer:function(controller){
            controller.updateBadge=this.updateBadge.bind(this);
            this.set('controller',controller);
        },
        renderUI: function (controller) {
            var _self = this;
            _self.updateBadge();
        },
        /**
         * 根据配置计算需要展示的值
         * @private
         */
        _initStatus: function (controller) {
            var item = controller.get('badgeCfg');
            var result = {
                badgeShowCount: item.count,
                badgeSupCls: 'eno-badge-count eno-badge-multiple-words',
                badgeSupDisplay :'inline-block',
                badgeBackgroundColorStyle:'',
                text:item.text
            }

            //count为0时是否展示
            if (!(item.showZero || item.count)) {
                result.badgeSupDisplay = 'none';
            }
            //判断overflowCount来修改展示的count值
            if (item.overflowCount && item.count > item.overflowCount) {
                result.badgeShowCount = item.overflowCount + "+";
            }
            //status修改sup背景色
            if (item.status) {
                result.badgeBackgroundColorStyle = 'background-color:' + STATUS[item.status];
            }
            //color修改sup背景色
            if (item.color) {
                result.badgeBackgroundColorStyle = 'background-color:' + item.color;
            }
            //根据是否展示红点{dot}判断sup的class
            if (item.dot) {
                result.badgeSupCls = 'eno-badge-dot';
                result.text = '';
                result.badgeShowCount = '';
            }
            return result;
        },
        /**
         * 更新徽标，重新渲染徽标内容
         * <pre><code>
         * button.on('click',function(){
         *    button.set('badgeCfg',{count:11,status:'warning'})
         *    button.updateBadge()
         * })
         * </code></pre>
         */
        updateBadge: function () {
            var _self = this,controller = _self.get('controller'), el = controller.get('el');
            try {
                //计算每一项item应该添加的徽标
                var param = _self._initStatus(controller);
                var suphtml = BUI.substitute(_self.get('badgeTpl'), param);
                el.find(".eno-badge-sup").remove();
                el.addClass('eno-badge');
                el.append(suphtml);
                //根据添加的徽标，计算每一个item的margin
                var sup = el.find('.eno-badge-sup'),
                    supWidth = sup.outerWidth(true), supHeight = sup.height();
                controller.set('elStyle', { marginTop: supHeight / 2, marginRight: supWidth / 2 });
            } catch (e) {
                console.log(e)
            }
        }
        
    });
    return Badge;
});