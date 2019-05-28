/**
 * @fileOverview 锚分组件中分割容器,默认的容器为fieldset
 * @author roysong
 * @ignore
 */
define('bui/list/fieldItem',['bui/common'],function(r){
    var BUI = r('bui/common');
    var fieldItem = BUI.Component.Controller.extend({

    },{
        ATTRS : {
            elTagName : {value : 'fieldset'},
            tpl : {value : '<legend style="margin-bottom: 10px;"><a id="field-{uid}" name="{uid}">{itemName}</a></legend>'},
            uid : {},
            itemName : {},
        }
    });
    return fieldItem;
});