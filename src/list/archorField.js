/**
 * @fileOverview 锚分组件。右侧是固定位置的锚点导航栏，左侧是分割容器，可放置其它组件
 * @author roysong
 */
define('bui/list/archorField',['bui/common','bui/list/archorGroup','bui/list/fieldGroup'],function(r){
    var BUI = r('bui/common'),
        ArchorGroup = r('bui/list/archorGroup'),
        FieldGroup = r('bui/list/fieldGroup'),
        AF_PREFIX = 'arfi-',
        FIELD_PREFIX = 'field-'
        ARCHOR_PREFIX = 'archor-';
    /**
     * 锚分组件
     * xclass : 'archorField'
     * <pre><code>
     * &lt;button id="add"&gt;添加&lt;/button&gt;	
	 * &lt;button id="del"&gt;删除&lt;/button&gt;	
	 * &lt;div id="container"&gt;&lt;/div&gt;
	 * &lt;script type="text/javascript"&gt;
	 * 	BUI.use(['bui/list'],function(List){
	 * 		var simpleData = [];
	 * 		for(var i = 0;i < 50;i++){
	 * 			var d = {text:'选项'+i,value:i};
	 * 			simpleData.push(d);
	 * 		}
	 * 		var lev1 = new List.SimpleList({
	 * 			items : simpleData
	 * 		});
	 * 		var lev2 = new List.SimpleList({
	 * 			items : simpleData
	 * 		});
	 * 		var data = [
	 * 			{name : '一级流程',children : [lev1]},
	 * 			{name : '二级流程',children : [lev2]},
	 * 		];
	 * 		var af = new List.ArchorField({
	 * 			render : '#container',
	 * 			//right : '200px',
	 * 			items : data
	 * 		});
	 * 		af.render();
	 * 		$('#del').click(function(){
	 * 			af.removeItem('二级流程');
	 * 		});
	 * 		$('#add').click(function(){
	 * 			var lev3 = new List.SimpleList({items : simpleData});
	 * 			af.addItem({name: '三级流程',children: [lev3]});
	 * 		});
	 * 	});
	 * &lt;/script&gt;
     *</code></pre>
     * @class BUI.List.ArchorField
     * @extends BUI.Component.Controller
     */
    var archorField = BUI.Component.Controller.extend({
        initializer : function(){
            var _self = this,items = _self.get('items');
            BUI.each(items,function(i){
                var uid = BUI.guid(AF_PREFIX);
                i.uid = uid;
            });
            var archorGroup = new ArchorGroup({
                id : 'archorGroup',
                items : items
            }),
            fieldGroup = new FieldGroup({
                id : 'fieldGroup',
                right : _self.get('right'),
                items : items
            });
            _self.addChild(archorGroup);
            _self.addChild(fieldGroup);
        },
        bindUI : function(){
            var _self = this,fieldGroup = _self.getChild('fieldGroup');
            // 页面滚动过程中根据出现在页面中的标题渲染锚点背景色
            $(window).on('scroll',function(){
                if(fieldGroup.get('height') <= BUI.viewportHeight()) return;
                // 可视区域的上边缘高度以及下边缘高度
                var visibleTop = $(window).scrollTop(),visibleBottom = visibleTop + $(window).height();
                // 计算每个fieldset目前所处的页面高度
                var itemHeights = _self._calFieldItemHeight();
                // 判断是否有某个fieldset正好位于可视区域中
                var inScreen = BUI.Array.find(itemHeights,function(i){return i.height > visibleTop && i.height < visibleBottom;})
                // 如果没有fieldset在可视范围内，则维持目前锚点的背景色不变
                if(inScreen){
                    BUI.each(itemHeights,function(i){
                        var archorTag = $(ARCHOR_PREFIX + i.uid);
                        if(i.uid == inScreen.uid) // 将位于可视区域中fieldset对应的锚点改变背景颜色，代表进入此锚点的控制范围内
                            archorTag.css('background-color','lightblue');
                        else // 将其它的锚点背景颜色取消（和整体背景色相同）
                            archorTag.css('background-color','aliceblue');
                    });
                }
            });

        },
        /**
         * 计算当前所有分割容器中对应锚点标题的文字的高度
         * @private
         */
        _calFieldItemHeight : function(){
            var _self = this, heights = [],items = _self.get('items');
            BUI.each(items,function(item){
                var itemTag = $('#' + FIELD_PREFIX + item.uid),archorTag = $('#' + ARCHOR_PREFIX + item.uid);
                heights.push({
                    uid : item.uid,
                    bc : archorTag.css('background-color'),// 锚点当前的背景色
                    height : itemTag.offset().top + itemTag.outerHeight()// 标题所在的高度
                });
            });
            return heights;
        },
        /**
         * 添加子项：
         * name同时用于锚点和分割容器的标题显示；
         * children为BUI显示组件列表，会被分割容器以addChild方式依次加入。
         * @param {Object} item: {name : '',children : [{BUI.Component.Controller},{BUI.Component.Controller}]}
         */
        addItem : function(item){
            var _self = this,items = _self.get('items'),
            archorGroup = _self.getChild('archorGroup'),
            fieldGroup = _self.getChild('fieldGroup');
            var uid = BUI.guid(AF_PREFIX);
            item.uid = uid;
            archorGroup.addItem(item);
            fieldGroup.addItem(item);
            items.push(item);
            _self.set('items',items);
        },
        /**
         * 按名称删除既有子项
         * @param {String} itemName 
         */
        removeItem : function(itemName){
            var _self = this,items = _self.get('items'),
            archorGroup = _self.getChild('archorGroup'),
            fieldGroup = _self.getChild('fieldGroup'),
            item = BUI.Array.find(items,function(i){return i.name == itemName});
            archorGroup.removeItem(item);
            fieldGroup.removeItem(item);
            BUI.Array.remove(items,item);
            _self.set('items',items);
        }
    },{
        ATTRS : {
            elStyle : {value : {'background-color' : 'aliceblue'}},
            /**
             * 分割容器离右边缘的距离。
             * 如果右侧锚标的文字太长，就应适当增大此数值。
             * @cfg {number} [right = 100px]
             */
            right : {value : '100px'},
            /**
             * 子项列表
             * <pre><code>
	         * 		var lev1 = new List.SimpleList({
	         * 			items : simpleData
	         * 		});
	         * 		var lev2 = new List.SimpleList({
	         * 			items : simpleData
	         * 		});
	         * 		var data = [
	         * 			{name : '一级流程',children : [lev1]},
	         * 			{name : '二级流程',children : [lev2]},
	         * 		];
	         * 		var af = new List.ArchorField({
	         * 			render : '#container',
	         * 			//right : '200px',
	         * 			items : data
	         * 		});
             * </code></pre>
             * @cfg {Array} [items = []]
             */
            items : {value: []}
        }
    },{
		xclass : 'archorField',
		priority : 1	
	});
    return archorField;
});