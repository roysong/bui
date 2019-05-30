/**
 * @fileOverview 锚分组件中锚点组
 * @author roysong
 * @ignore
 */
define('bui/list/archorGroup',['bui/common'],function(r){
    var BUI = r('bui/common');
    var archorGroup = BUI.Component.Controller.extend({
        createDom : function(){
            var _self = this,
            el = _self.get('el'),
            tpl = _self.get('tpl'),
            itemTpl = _self.get('itemTpl'),
            itemDoms = [],
            items = _self.get('items');
            BUI.each(items,function(item){
                var i = BUI.substitute(itemTpl,{uid : item.uid,itemName : item.name});
                itemDoms.push(i);
            });
            _self.set('tpl',BUI.substitute(tpl,{items : itemDoms.join('')}));
        },
        addItem : function(item){
            var _self = this,el = _self.get('el'),itemTpl = _self.get('itemTpl');
            var itemDom = BUI.substitute(itemTpl,{uid : item.uid,itemName : item.name});
            el.find('ol').append(itemDom);
        },
        removeItem : function(item){
            var _self = this,el = _self.get('el');
            el.find('#archor-'+item.uid).remove();
        },
    },{
        ATTRS : {
            elTagName : {value : 'span'},
            elStyle : {value : {'position':'fixed','right':'25px','top':'125px','border-left':'1px solid #e8eaec'}},
            tpl : {value : '<ol style="font-size: larger;margin: 5px 0 25px 0;">{items}</ol>'},
            itemTpl : {value : 
                    '<li style="height: 25px;border-bottom: 1px dashed black;padding-top: 8px;" id="archor-{uid}">'+
                    '<a style="margin-left: 6px;" href="#{uid}">{itemName}</a>'+
                    '</li>'},
            items : {}
        }
    });
    return archorGroup;
});