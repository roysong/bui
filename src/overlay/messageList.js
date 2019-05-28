seajs.use('bui/css/message.css');
define('bui/overlay/messageList',['bui/common','bui/list'],function(require){

	var BUI = require('bui/common'),
		UIBase = BUI.Component.UIBase,
		Component = BUI.Component,
		List = require('bui/list'),
		UIBase = Component.UIBase;
  /**
   * 消息提示
   * xclass : 'MessageList'
   * ## 后端请求响应消息提示
   * <pre><code>
   *   BUI.use('bui/messageList',function(Message){
   *     var result = {
   *     	 msg:"请求成功",
   *         status:"1",
   *     }
   *     Message.MessageList.Msg(result);
   *   });
   * </code></pre>
   * ## 普通消息提示
   * <pre><code>
   *   BUI.use('bui/messageList',function(Message){
   *     Message.MessageList.InfoMsg("普通消息提示!!");
   *   });
   * </code></pre>
   * @class messageList
   * @extends BUI.List.List
   * @mixins BUI.Component.UIBase.Bindable
   */
	var MessageList = List.List.extend([UIBase.Bindable],	
	{
		/*
		 * 消息提示    
		 * @param {object} config 数据结构为：{msg:"消息提示语句",status:"1"} 
		 * status 1.成功类型的消息 2.失败类型的消息 3.普通类型的消息
		 */
		showMsg:function(config){
			var _self = this;
			if(config.status == '1'){
				_self._sucMsg(config);
			}else if(config.status == '2'){
				_self._errorMsg(config);
			}else{
				_self._infoMsg(config);
			}
		},
		/*
		 * 成功消息
		 * @param {String} msg 消息提示语句，不传默认“操作成功！！”
		 * @param {int} showTime 消息提示展示的秒数，不传默认4s
		 */
		_sucMsg:function(config){
			var _self = this;
			var msg = config.msg?config.msg:"操作成功！！";
			config["msg"] = msg;
			config["spanType"] = "x-icon-success";
			config["iconType"] = "icon-ok";
			_self._addMsgItem(config);
		},
		/*
		 * 添加消息提示
		 */
		_addMsgItem:function(config){
			var _self = this;
			var showTime = config.showTime;
			var showTime = showTime?showTime*1000:4000;
			var item = _self.addItem(config);
			item.get('el').find('.MessageList').fadeOut(showTime);
			timeoutId = setTimeout(function () {
				_self.removeItem(_self.getFirstItem());
			}, showTime);
		},
		/*
		 * 失败消息
		 * @param {String} msg 消息提示语句，不传默认“操作失败！！”
		 * @param {int} showTime 消息提示展示的秒数，不传默认4s
		 */
		_errorMsg:function(config){
			var _self = this;
			var msg = config.msg?config.msg:"操作失败！！";
			config["msg"] = msg;
			config["spanType"] = "x-icon-error";
			config["iconType"] = "icon-bell";
			_self._addMsgItem(config);
		},
		/*
		 * 普通消息
		 * @param {String} msg 消息提示语句
		 * @param {int} showTime 消息提示展示的秒数，不传默认4s
		 */
		_infoMsg:function(config){
			var _self = this;
			config["spanType"] = "x-icon-info";
			config["iconType"] = "icon-info";
			_self._addMsgItem(config);
		}
	},{
		ATTRS:
		{	
		  elAttrs :{value:{class : 'messageBox'}},
		  /**
		   * 消息提示模板
		   */
		  itemTpl :  {value: '<div  class="tips tips-small tips-info MessageList">'+
						       '<span class="x-icon x-icon-small {spanType}"><i class="icon icon-white {iconType}"></i></span>'+
						 '<div class="tips-content" >&nbsp;&nbsp;{msg}</div></div>'
				 }
	   }
	},{
		xclass : 'MessageList',
		priority : 1	
	});
	var message;
	function showMessage(config){
	    if(!message){
	    	message = new MessageList({});
	    	message.render();
	    }
	    message.showMsg(config);
	}
	function messageFun(status){
		return function (msg,showTime){
		      showMessage({
		    	    status: status,
			        msg:msg,
			        showTime : showTime
			      });
		      return message;
	    };
	}
	function msgFun(){
		return function (config){
			showMessage(config);
			return message;
		};
	}
	var Msg = msgFun(),
	    SucMsg = messageFun("1"),
	    FailMsg = messageFun("2"),
	    InfoMsg = messageFun("3");
   /**
    * 操作消息提示静态类
    * @class BUI.Msg
    */
  /**
   * 后端请求响应消息提示
   *  <pre> <code>
   * BUI.Msg.Msg（{msg:"操作成功",status:"1"}）;
   * </code> </pre>
   * @static
   * @method
   * @param {object} result 后端返回给前端的ResultMsg,数据结构为：{msg:"消息提示语句",status:"1"} 
   */
	MessageList.Msg = Msg;
  /**
   * 操作成功消息提示
   * <pre> <code>
   * BUI.Msg.SucMsg（"操作成功！！",4）;
   * </code> </pre>
   * @static
   * @method
   * @param  {String}   msg      提示信息，不传默认“操作成功！！”
   * @param  {int}      showTime 消息提示展示的秒数，不传默认4s
   */
	MessageList.SucMsg =  SucMsg;
  /**
   * 操作失败消息提示
   * <pre> <code>
   * BUI.Msg.FailMsg（"操作失败！！",4）;
   * </code> </pre>
   * @static
   * @method
   * @param  {String}   msg      提示信息，不传默认“操作失败！！”
   * @param  {int}      showTime 消息提示展示的秒数，不传默认4s
   */
	MessageList.FailMsg = FailMsg;
  /**
   * 普通消息提示
   * <pre> <code>
   * BUI.Msg.InfoMsg（"消息提示！！",4）;
   * </code> </pre>
   * @static
   * @method
   * @param  {String}   msg      提示信息（此参数必传）
   * @param  {int}      showTime 消息提示展示的秒数，不传默认4s
   */
	MessageList.InfoMsg = InfoMsg;
	return MessageList;
});