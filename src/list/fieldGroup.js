/**
 * @fileOverview 锚分组件中分割容器组,默认的容器为fieldset
 * @author roysong
 * @ignore
 */
define('bui/list/fieldGroup',['bui/common','bui/list/fieldItem'],function(r){
    var BUI = r('bui/common'),
        FieldItem = r('bui/list/fieldItem');
    var fieldGroup = BUI.Component.Controller.extend({
        initializer : function(){
            var _self = this,
            items = _self.get('items');
            BUI.each(items,function(item){
                var i = _self._initItem(item);
                _self.addChild(i);
            });
        },
        _initItem : function(item){
            var _self = this;
            return new FieldItem({
                id : item.uid,
                uid : item.uid,
                itemName : item.name,
                elStyle : {'margin-right' : _self.get('right')},
                children : item.children,
            });
        },
        addItem : function(item){
            var _self = this;
            var i = _self._initItem(item);
            _self.addChild(i);
        },
        removeItem : function(item){
            var _self = this,i = _self.getChild(item.uid);
            _self.removeChild(i,true);
        },
    },{
        ATTRS: {
            elTagName : {value : 'span'},
            items : {value : []},
            /**
             * 右侧离父容器右边缘的距离
             */
            right : {},
        }
    });
    return fieldGroup;
});