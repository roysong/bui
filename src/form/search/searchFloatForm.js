/**
 * 浮动查询框 
 */
define('bui/form/search/searchFloatForm',['bui/common',
									'bui/form/horizontal',
								   ],function(r){
	var BUI = r('bui/common'),
		Component = BUI.Component,
		HForm = r('bui/form/horizontal');
	var SearchForm = HForm.extend({
		initializer:function(){
			var _self = this;
			var items = _self.get('items');
			var formItems = [];
			BUI.Array.each(_self.get('items'),function(i){
				formItems.push(_self._geItem(i.label,i.item));
			});
			var leftChild = new Component.Controller({
				id:"leftChildren",
				elCls : 'row-fluid',
				children : formItems
			})
			_self.addChild(leftChild);
			_self.addChild(_self._geButton());
		},
		/*
		 * 获取填写的查询条件数据
		 */
		_getLabelOfItems:function(){
			var _self = this;
			var labelValueArr = [];
			var leftChildren = _self.getChild('leftChildren').get('children');
			for(var i =0 ;i<leftChildren.length;i++){
				var leftChild = leftChildren[i];
				var label = leftChild.get('el').find('.control-label').text();
				var items = leftChild.get('el').find('.controls').children();
				var itemValueArr = []; 
				for(var j = 0;j<items.length;j++){
					var value = items[j].value?items[j].value.trim():"";
					value?itemValueArr.push(value):''; 
				}  
				if(itemValueArr.length==0) continue;
				var itemValue = itemValueArr.join(" ");
				labelValueArr.push({
					label:label,
					value:itemValue
				});
			}
			return labelValueArr;
		},
		bindUI : function(){
			var _self = this;
			//回车发起查询
			_self.get('el').keypress(function(ev){
				if(ev.keyCode == 13){
					ev.preventDefault();
					_self.fire('formSearch',{
						param : _self.serializeToObject(),
						labels :_self._getLabelOfItems(),
						domTarget: ev.domTarget,
				        domEvent: ev
					});
				}
			})
			//查询事件
			_self.get('el').delegate('.searchBtn','click',function(ev){
				ev.preventDefault();
				_self.fire('formSearch',{
					param : _self.serializeToObject(),
					labels :_self._getLabelOfItems(),
					domTarget: ev.domTarget,
			        domEvent: ev
				});
			});
			//重置事件
			_self.get('el').delegate('.resetBtn','click',function(ev){
				ev.preventDefault();
				_self.get('el').get(0).reset();
				_self.fire('formReset',{
					param : _self.serializeToObject(),
					labels :_self._getLabelOfItems(),
					domTarget: ev.domTarget,
			        domEvent: ev
				});
			});
		},
		/*
		 * 生成一个查询条件
		 */
		_geItem:function(label,item){
			var _self = this;
			var i = new Component.Controller({
				elCls : 'control-group pull-left',	
				tpl:'<label class="control-label">'+label+'：</label>'+
					'<div class="controls"  style="height:43px">'+
					 item +
					'</div>'
			});
			return i;
		},
		_geButton:function(){
			var b = new Component.Controller({
				tpl:'<center><button type="button" class="button button-primary searchBtn">查询</button>&nbsp;&nbsp;'
						+'<button type="button" class="button resetBtn">重置</button></center>',
			    elStyle : {margin: '0 0 15px 0'}
			});
			return b;
		},
	},{
		ATTRS:{
			elAttrs :{value:{id : 'searchFloatForm'}},
			items : {value : []},
			events: {value: {
					'formSearch': true,
					'formReset' : true
				}
			}
		}
	});
	return SearchForm;
});
