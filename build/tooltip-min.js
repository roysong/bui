/**
 * @fileOverview \u63d0\u793a\u7684\u5165\u53e3\u6587\u4ef6
 * @ignore
 */define("bui/tooltip",["bui/common","bui/tooltip/tip","bui/tooltip/tips"],function(e){var t=e("bui/common"),n=t.namespace("Tooltip"),r=e("bui/tooltip/tip"),i=e("bui/tooltip/tips");return Badge=e("bui/tooltip/badge"),t.mix(n,{Tip:r,Tips:i,Badge:Badge}),n}),define("bui/tooltip/tip",["bui/common","bui/overlay"],function(e){function s(e,t){if(e==="left")return[-1*t,-4];if(e==="right")return[t,-4];if(e.indexOf("top"))return[0,t];if(e.indexOf("bottom"))return[0,-1*t]}var t=e("bui/common"),n=e("bui/overlay"),r="x-align-",i={left:["cl","cr"],right:["cr","cl"],top:["tc","bc"],bottom:["bc","tc"],"top-left":["tl","bl"],"top-right":["tr","br"],"bottom-left":["bl","tl"],"bottom-right":["br","tr"]},o=n.OverlayView.extend({renderUI:function(){},_getTitleContainer:function(){return this.get("el")},_uiSetTitle:function(e){var n=this,r=n.get("titleTpl"),i=n._getTitleContainer(),s=n.get("titleEl"),o;s&&s.remove(),e=e||"",t.isString(e)&&(e={title:e}),o=t.substitute(r,e),s=$(o).appendTo(i),n.set("titleEl",s)},_uiSetAlignType:function(e,t){var n=this;t&&t.prevVal&&n.get("el").removeClass(r+t.prevVal),e&&n.get("el").addClass(r+e)}},{ATTRS:{title:{},titleEl:{},alignType:{}}},{xclass:"tooltip-view"}),u=n.Overlay.extend({_uiSetAlignType:function(e){var t=this,n=t.get("offset"),r=t.get("align")||{},o=i[e];o&&(r.points=o,n&&(r.offset=s(e,n)),t.set("align",r))}},{ATTRS:{delegateTrigger:{value:!0},alignType:{view:!0},title:{view:!0},showArrow:{value:!0},arrowContainer:{view:!0},autoHide:{value:!0},autoHideType:{value:"leave"},offset:{value:0},triggerEvent:{value:"mouseover"},titleTpl:{view:!0,value:"<span>{title}</span>"},xview:{value:o}}},{xclass:"tooltip"});return u.View=o,u}),define("bui/tooltip/tips",["bui/common","bui/tooltip/tip"],function(e){function t(e){return/^{.*}$/.test(e)}var n=e("bui/common"),r=e("bui/tooltip/tip"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={tip:{},defaultAlignType:{}},n.extend(i,n.Base),n.augment(i,{_init:function(){this._initDom(),this._initEvent()},_initDom:function(){var e=this,t=e.get("tip"),n;t&&!t.isController&&(n=t.alignType,t=new r(t),t.render(),e.set("tip",t),n&&e.set("defaultAlignType",n))},_initEvent:function(){var e=this,t=e.get("tip");t.on("triggerchange",function(n){var r=n.curTrigger;e._replaceTitle(r),e._setTitle(r,t)})},_replaceTitle:function(e){var t=e.attr("title");t&&(e.attr("data-title",t),e[0].removeAttribute("title"))},_setTitle:function(e,r){var i=this,s=e.attr("data-title"),o=e.attr("data-align")||i.get("defaultAlignType");t(s)&&(s=n.JSON.looseParse(s)),r.set("title",s),o&&r.set("alignType",o)},render:function(){return this._init(),this}}),i}),define("bui/tooltip/badge",["bui/common"],function(e){var t=e("bui/common"),n=t.Component,r={success:"#52c41a",error:"#f5222d","default":"#d9d9d9",processing:"#1890ff",warning:"#faad14"};return n.Controller.extend({initializer:function(){this._updateStatus()},_updateStatus:function(){var e=this;return e.set("showCount",e.get("count")),e.set("supCls","eno-badge-count eno-badge-multiple-words"),!e.get("showZero")&&!e.get("count")?e.set("supDisplay","none"):e.set("supDisplay","inline-block"),e.get("overflowCount")&&e.get("count")>e.get("overflowCount")&&e.set("showCount",e.get("overflowCount")+"+"),e.get("status")&&e.set("backgroundColorStyle","background-color:"+r[e.get("status")]+";"),e.get("color")&&e.set("backgroundColorStyle","background-color:"+e.get("color")+";"),e.get("dot")&&(e.set("supCls","eno-badge-dot"),e.set("text",""),e.set("showCount","")),{supCls:e.get("supCls"),text:e.get("text"),showCount:e.get("showCount"),supCls:e.get("supCls"),supDisplay:e.get("supDisplay"),backgroundColorStyle:e.get("backgroundColorStyle")}},renderUI:function(){var e=this,t=e.get("el"),n=t.find("#eno-badge-sup"),r=n.outerWidth(!0),i=n.height();e.set("elStyle",{marginTop:i/2,marginRight:r/2})},setStatus:function(e,n){var r=this,i=r.get("el");r.set(e,n);var s=r._updateStatus();i.find("#eno-badge-sup").remove();var o=t.substitute(r.get("tpl"),s);i.append(o)}},{ATTRS:{color:{},status:{},count:{value:0},dot:{value:!1},overflowCount:{},showZero:{value:!1},text:{},tpl:{value:'<sup class="{supCls}" id="eno-badge-sup" style="display: {supDisplay};{backgroundColorStyle}">{text}{showCount}</sup>'},elTagName:{value:"span"},elCls:{value:"eno-badge"}}})});
