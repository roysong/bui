/**
 * @fileoverview 收缩的浮动查询
 * @author  qyy&bili 
 * @date 2019-06-02
 * @ignore
 */
define('bui/form/flotSearch',[
									'bui/common',
									'bui/form/search/searchFloatForm',
									'bui/form/search/flotSearchText'
								   ],function(r){
	var BUI = r('bui/common'),
		Component = BUI.Component,
	    SearchText = r('bui/form/search/flotSearchText');
		SearchFloatForm = r('bui/form/search/searchFloatForm');
	 /**
	   * 可收缩的浮动查询
	   * <pre><code>
	   *   BUI.use('bui/form/flotSearch',function(flotSearch){
	   *    var search = new flotSearch({
		       items : [{
			  				label : '工单名称',
			  				item : '&lt;input type="text" name="orderName" id="taskNameSerach" style="width: 157px;" /&gt;'
				  			},{
				  				label : '调度工单文号',
				  				item : '&lt;input type="text" name="orderNumber" id="orderNumberSerach" style="width: 157px;" /&gt;'
				  			}]
		     });
		     search.render();
	   *   });
	   * </code></pre>
	   * @class BUI.Form.FlotSearch
	   * @extends BUI.Component.Controller
	   */
	var flotSearch = Component.Controller.extend({
		initializer:function(){
			var _self = this;
			 //初始化查询内容回显
            var searchText = new SearchText({ id: 'searchText' });
            //初始化查询框
			var searchForm = new SearchFloatForm({
				id:'searchForm',
				items:_self.get('items')
			});
			//查询查询框遮罩层
			var searchMask = new Component.Controller({
				   id:'searchMask',
				   elCls:'searchMask'
			});
		    _self.addChild(searchText);
			_self.addChild(searchMask);
			_self.addChild(searchForm);
		},
		bindUI : function(){
			var _self = this
			,searchForm = _self.getChild('searchForm')
			,searchMask = _self.getChild('searchMask')
			,text = _self.getChild('searchText');
			searchForm.hide();
			searchMask.hide();
			//浮动查询表单查询事件，回显查询内容
            text.on('click',function(){
            	searchForm.show();
				searchMask.show();
            });
            //遮罩层点击事件，点击查询框和遮罩层消失
			searchMask.on('click',function(){
				searchForm.hide();
				searchMask.hide();
			});
			//查询框查询事件
			_self.on('formSearch',function(e){
				text.setItems(e.labels);
			});
		},
		/**
		 * 隐藏查询浮动表单
		 */
		hideSearchForm:function(){
			var _self = this
			,searchForm = _self.getChild('searchForm')
			,searchMask = _self.getChild('searchMask');
			searchForm.hide();
			searchMask.hide();
		},
	},{
		ATTRS:{
			elAttrs :{value:{class : 'flotSearch'}},
			/**
             * 查询条件对象数组，单个对象属性如下：
             * <pre>
             * &#123; 
             * label: 查询条件标题
             * item: '&lt;input type="text" name="orderName" id="taskNameSerach" style="width: 157px;" /&gt;' 查询条件表单内容, 
             * &#125;
             * </pre>
             * @cfg {Object[]}
             */
			items : {value : []},
			events: {value: {
					 /**
	                 * 查询事件，此事件会冒泡
	                 * @event
	                 * @param {Object} e 事件对象
	                 * @param {Object} e.param 查询表单的序列化对象
	                 * @param {jQuery.Event} e.domEvent DOM触发的事件
	                 * @param {HTMLElement} e.domTarget 触发事件的DOM节点
	                 */
					'formSearch': true,
					 /**
	                 * 查询条件重置事件，此事件会冒泡
	                 * @event
	                 * @param {Object} e 事件对象
	                 * @param {Object} e.param 查询表单的序列化对象
	                 * @param {jQuery.Event} e.domEvent DOM触发的事件
	                 * @param {HTMLElement} e.domTarget 触发事件的DOM节点
	                 */
					'formReset' : true,
				}
			}
		}
	});
	return flotSearch;
});
