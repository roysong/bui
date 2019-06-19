/**
 * @fileoverview 步骤条组件
 * @author bili
 * @date 190518
 */
// seajs.use('steps.css');
define('bui/toolbar/steps', [
    'bui/common',
    'bui/list'
], function (r) {
    var BUI = r('bui/common'),
        List = r('bui/list');
    /**
	 * steps的视图类
	 * @class BUI.Toolbar.StepsView
	 * @extends BUI.List.SimpleListView
	 * @private
	 */
    var StepsView = List.SimpleListView.extend({
        renderUI: function () {
            var el = this.get('el');
            if (!el.attr('id')) {
                el.attr('id', BUI.guid('steps'));
            }
        }
    }, {
            ATTRS: {
            }
        }, {
            xclass: 'steps-view'
        });
    /**
     * 步骤条  
     * **使用了flex布局,低版本浏览器谨慎使用**  
     * xclass : 'steps'  
     * ## 静态展示，只在item中设置状态
     * 每个item设置不同的状态进行展示
     *{@img step-demo1.png demo1}
     * <pre>
     * <code>
     * BUI.use('bui/toolbar', function (Toolbar) {
            var setps = new Toolbar.Steps({
                 items:[
                    {title:'步骤1',description:'步骤1详情',status:'error'},
                    {title:'步骤2',description:'&lt;p&gt;步骤2详情&lt;/p&gt;&lt;p style="color:red;"&gt;步骤2详情&lt;/p&gt;&lt;p&gt;步骤2详情&lt;/p&gt;',status:'finish'},
                    {title:'步骤3',description:'步骤3详情',status:'process'},
                    {title:'步骤4',description:'步骤4详情',status:'wait'},
                ]
            });
            setps.render();
        });
     * </code>
     * </pre>
     * ## 设置步骤条的当前步骤和当前步骤状态
     * 不用单独设置item的状态，步骤条会根据传入的current和status进行渲染,同时不展示icon
     * {@img step-demo2.png demo2}
     * <pre>
     * <code>
     * BUI.use('bui/toolbar', function (Toolbar) {
            var setps = new Toolbar.Steps({
                items:[
                    {title:'步骤1',description:'步骤1详情'},
                    {title:'步骤2',description:'步骤2详情'},
                    {title:'步骤3',description:'步骤3详情'},
                    {title:'步骤4',description:'步骤4详情'},
                ],
                current:3,
                status:'error',
                showIcon:false
            });
            setps.render();
        });
     * </code>
     * </pre>
     * ## 自定义每个item的icon
     * 如需设置当前步骤，推荐当前步骤状态设置为finish
     * {@img step-demo3.png demo3}
     * <pre>
     * <code>
     * var setps2 = new Toolbar.Steps({
            items:[
                {title:'步骤1',description:'步骤1详情',icon:'icon-search'},
                {title:'步骤2',description:'步骤2详情',icon:'icon-camera'},
                {title:'步骤3',description:'步骤3详情',icon:'icon-user'},
                {title:'步骤4',description:'步骤4详情',icon:'icon-calendar'},
            ],
            current:3,
            status:'finish'
        });
     * </code>
     * </pre>
     * @class BUI.Toolbar.Steps
     * @extends BUI.List.SimpleList
     */
    var Steps = List.SimpleList.extend({
        initializer: function () {
            var _self = this;
            _self.set('items', _self._formatItems());
        },
        /**
         * 格式化传入的item，把string转换为所需对象
         * @private
         */
        _formatItems: function () {
            var _self = this,
                items = _self.get('items'),
                tmp = [];
            BUI.each(items, function (v, i) {
                tmp.push(_self._formatItem(v, i));
                if(v.status == 'error' && items[i-1]){//错误状态的上一步增加css,如修改连线颜色
                    items[i-1].status += ' steps-next-error';
                }
                if(v.status == 'finish' && items[i-1]){//完成状态的上一步增加css，如修改连线颜色
                    items[i-1].status += ' steps-next-finish';
                }
                if(v.status == 'process' && items[i-1]){//完成状态的上一步增加css，如修改连线颜色
                    items[i-1].status += ' steps-next-process';
                }
            });
            return tmp;
        },
        /**
         * 格式化单个string为itemObject
         * @param {string} v 需要转换的字符串
         * @param {number} i 数组索引
         * @private
         */
        _formatItem: function (v, i) {
            var _self = this,showIcon = _self.get('showIcon');
            var status = _self._getItemStatus(i,v.status);
            v.status = status;
            if(!showIcon){//不展示icon时
                v.radius = 'steps-item-icon-radius';
                v.icon = '';
            }else if(showIcon && !v.icon){
                v.radius = 'steps-item-icon-radius';
                v.icon = i+1;
            }else if(showIcon && v.icon){//需要展示icon，且item中配置了icon
                v.radius = '';
                v.icon = v.icon.indexOf('class')>=0?v.icon:'<i class="'+v.icon+'"></i>';
            }
            return v;
        },
        /**
         * 根据索引号计算item的class
         * @param {number} index 
         * @private
         */
        _getItemStatus: function (index,nowStatus) {
            var _self = this, current = _self.get('current'), status = _self.get('status');
            if (index == current - 1) {//设置了当前步骤时，当前状态
                return status ? status : 'process';
            }
            if (index < current - 1) {//设置了当前步骤时，其他状态
                return 'finish'
            }
            if(!current){//未设置当前步骤时，根据item的装态进行展示
                return nowStatus;
            }
        },
        /**
         * 修改current，重新渲染步骤条
         * @param {number} 当前步骤 
         */
        setCurrent: function (item) {
            var _self = this, current = -1;
            _self.get('items').forEach(function (v, i) {
                if (item == v) {
                    current = i+1;
                }
            });
            if (current > 0) {
                _self.set('current', current);
                _self.set('items', _self._formatItems());
                _self.get('items').forEach(function (item) {
                    _self.updateItem(item)
                });
            }
        },
        /**
         * 修改当前选中的步骤条
         * @param {Object} item 当前点击的元素，一般传入为itemclick事件的e.item
         */
        setSelected: function (item) {
            var _self = this,items = _self.get('items');
            items.forEach(function(v){
                if(v==item){
                    v.selected = 'steps-item-selected';
                }else{
                    v.selected = '';
                }
            });
            _self.set('items',items);
            _self.get('items').forEach(function (item) {
                _self.updateItem(item)
            });
        },
        /**
         * 取消选中
         * @param {Object} item 当前点击的元素，一般传入为itemclick事件的e.item
         */
        cancelSelected:function(item){
            var _self = this,items = _self.get('items');
            items.forEach(function(v){
                if(v==item){
                    v.selected = '';
                }
            });
            _self.set('items',items);
            _self.get('items').forEach(function (item) {
                _self.updateItem(item)
            });
        }
    }, {
            ATTRS: {
                /**
                 * 列表项的默认模板。
                 * @ignore
                 */
                itemTpl: {
                    view: true,
                    value: '<li class="steps-item steps-item-{status} {selected}">' +
                        '<div class="steps-item-icon {radius}">{icon}</div>' +
                        '<div class="steps-item-content">' +
                        '<div class="steps-item-title">{title}</div>' +
                        '<div class="steps-item-description">{description}</div>' +
                        '</div>' +
                        '</li>'
                },
                /**
                 *  @ignore
                 */
                idField: {
                    value: 'index'
                },
                /**
                 * 组件的默认模板。
                 * @ignore
                 */
                tpl: {
                    value: '<div class="step"><ul></ul></div>',
                    childContainer: 'ul'
                },
                /**
                 * 对象数组，单个对象属性如下：
                 * <pre>
                 * &#123; 
                 * status: 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。
                 *          可选：wait 未执行
                 *                process 处理中
                 *                finish 已完成
                 *                error 错误
                 * text: 标题, 
                 * description: 步骤的详情描述，可选, 
                 * icon: 步骤图标的类型，可选 
                 * &#125;
                 * </pre>
                 * @cfg {Object[]}
                 */
                items: {
                    view: true,
                    value: []
                },
                /**
			     * @private
                 * @ignore
			     */
                stepsOl: {
                    view: true,
                    value: 'ul'
                },
                /**
                 * 当前步骤
                 * @cfg {?number}
                 */
                current: {},
                /**
                 * 当前步骤状态,默认为process  
                 * 可选项为：  
                 *          wait 未执行  
                 *          process 处理中  
                 *          finish 已完成  
                 *          error 错误  
                 * @cfg {?string}
                 */
                status: {},
                /**
                 * 是否展示icon，默认为true
                 * @cfg{boolean}
                 */
                showIcon:{value:true},
                /**
			     * @private
                 * @ignore
			     */
                xview: {
                    value: StepsView
                }
            }
        });
    Steps.View = StepsView;
    return Steps;
});