define('bui/form/search/flotSearchText',['bui/list'],function(r){
    var List = r('bui/list');
    return List.SimpleList.extend({
        initializer: function(){
            var _self = this;
        },
    },{
        ATTRS:{
            tpl:{
                value:'<div class="row-fluid"><ul class="breadcrumb"><li><i class="icon-search"></i><span class="divider"> </span></li></ul></div>',
                childContainer: 'ul'
            },
            itemTpl:{
                value:'<li class="active"><b>{label}</b>{value}<span class="divider">/</span></li>'
            },
            items:{}
        }
    })
})