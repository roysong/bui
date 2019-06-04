/**
 * @fileOverview Row Mark 行列数据颜色标记及其图例展示插件
 * @ignore
 * @author lilt
 * @since 2019-05-17 19:11:28
 */
define('bui/grid/plugins/rowmark',['bui/common','bui/toolbar'], function(require) {
  var Toolbar = require('bui/toolbar'), ROWNUMBER_CLS_NUMBER = 'x-grid-rownumber';
    /**
     * grid插件 
     * <pre><code>
     *   var columns = [
     *      {title : '表头1',dataIndex :'a', width:100},
     *      {id: '123',title : '表头2',dataIndex :'b', width:100},
     *      {title : '表头3',dataIndex : 'c',width:200}
     *    ],
     *   data = [{a:'123', status: 1},{a:'cdd',b:'edd', status : 0},{a:'1333',c:'eee',d:2, status:2},{a:'1232',b:'eeewe',c:'ww1231',status:3}];
     *   var rowMark = new Grid.Plugins.RowMark({
     *        statusField: 'status',
     *        items : [
     *            {name : '红色', color:'red', value : 1}, // data中对应元素 status = 1 的数据
     *            {name : '蓝色', color:'blue', value : 2},  // data中对应元素 status = 2 的数据
     *            {name : '自定义', color:'#9966ff', value : 3} // data中对应元素 status = 3的数据
     *         // {name : '默认色', color : '#000'}  data中对应元素 status < 1 或 status > 3 的数据均使用其默认色
     *        ]      
     *    });
     *  var store = new Store({
     *      data : data
     *    }),
     *    grid = new Grid.Grid({
     *      render:'#grid',
     *      columns : columns,
     *      idField : 'a',
     *      store : store,
     *       plugins : [rowMark] // 插件形式引入表格 
     *    });
     *  grid.render();
     * </code></pre>
     * 
     * Tree-grid插件
     * <pre><code>
     * var data = [ 
     *     {text : '1',id : '1',a:'a1',b:'b1',status: 0,children: [{text : '11',id : '11',a:'a11',b:'b11',status:1}]},
     *     {text : '2',id : '2',a:'a2',b:'b2',status: 1,expanded : true,children : [
     *         {text : '21',id : '21',a:'a21',b:'b21',status: 2,children : [{text : '211',id : '211',a:'a211',b:'b211',status: 0},{text : '212',id : '212',a:'a212',b:'b212',status: 2}]},
     *         {text : '22',id : '22',a:'a22',b:'b22',status: 0}
     *     ]},
     *     {text : '3',id : '3',a:'a3',b:'b3',status: 2},
     *     {text : '4',id : '4',a:'a4',b:'b4',status: 3}
     *   ];
     * var rowMark = new Grid.Plugins.RowMark({
     *     statusField: 'status',
     *     items : [
     *         {name : '红色', color:'red', value : 1}, // data中对应元素 status = 1 的数据
     *         {name : '蓝色', color:'blue', value : 2}, // data中对应元素 status = 2 的数据
     *         {name : '自定义', color:'#9966ff', value : 3} // data中对应元素 status = 3的数据
     *      // {name : '默认色', color : '#000'}  data中对应元素 status < 1 或 status > 3 的数据均使用其默认色
     *     ]      
     * });
     * var tree = new TreeGrid({
     *   render : '#t1',
     *   nodes : data,
     *   columns : [
     *     {title : '表头1',dataIndex :'text',width:300}, 
     *     {title : '表头2',dataIndex :'a',width:100}, 
     *     {title : '表头3',dataIndex : 'b',width:100}
     *   ],
     *   height:250,
     *   plugins : [rowMark] // 插件形式引入表格
     * });
     * tree.render();
     * </code></pre>
     * 
     * @class BUI.Grid.Plugins.RowMark  列表根据状态标记行列颜色及工具栏显示图例插件
     */
    function RowMark(config){
      RowMark.superclass.constructor.call(this, config);
    }

    BUI.extend(RowMark,BUI.Base);
    
    RowMark.ATTRS = 
    {
      /**
       * 根据状态值待标记颜色的grid中的data数据字段
       * @type  {String} [statusField = 'status']
       */
      statusField : {
        value : 'status'
      },
      /**
       * 状态值对应的图例标签名及颜色，value对应的statusField字段的取值，即 statusField=value;
       * grid中对应statusField的未在items中列出的值时默认为黑色
       * <p>
       *  默认情况下，行列标记的规则为grid的data数组中status为true的数据渲染为红色，其余默认为黑色。
       * </p>
       * @type {Object} item:[{name:'', color:'', value: ''}...]
       */
      items : [
        {name : '红色', color : 'red', value : true},
        {name : '默认色', color : 'black', value : false}
      ]

    };

    BUI.augment(RowMark, {
      // 创建图例
      createDom :  function(grid){
        var _self = this, items = _self.get('items');
        _self._initLegend(grid, items);
      },
      // 根据状态数据值的配置标记每行数据的颜色
      bindUI : function(grid){
        var _self = this, statusField  = _self.get('statusField'), items = _self.get('items');
        grid.on('rowcreated', function(e){
          var value = e.record[statusField], color = _self._getColorFromItems(items, value); // 获取状态值对应值的标记颜色
          if(color) { // 若获取到了该行待渲染的颜色值则为其更改成指定颜色，否则使用默认行列文字颜色：黑色
            $(e.domTarget).children(':not(.'+ ROWNUMBER_CLS_NUMBER +')').css({color : color}); // dom选择除行号外的其他数据单元格渲染颜色
          }
        });
      },
      /**
       * 初始化表格右上方工具栏中的图例展示
       * @param {*} grid 
       * @param {*} items 
       * @private
       */
      _initLegend : function(grid, items){
        var _self = this, tbar = grid.get('tbar'), legendItems = [];
        BUI.each(items, function(item){
          var color = item.color;
          // 若对象未指定颜色，则生成随机色
          if(!color) {
            color = _self.getRandomColor();
            item.color = color;
          }
          legendItems.push({
            content : '<span style="background-color: '+ color +';display:inline-block;width:10px;height:10px;margin-right:3px;"></span>--'+item.name
          });
        });
        // 封装图例创建对象
        var tbarObject = {
          elCls : 'pull-right',
          items : legendItems 
        };
        if(tbar){ // grid已存在工具栏信息，则向工具栏增加右侧图例组件
          tbar.addChild(new Toolbar.Bar(tbarObject));
        } else{ // grid不存在工具栏信息，则向grid添加工具栏配置对象
          grid.set('tbar', tbarObject);
        }
        _self.set('items', items);
      },
      // 根据状态标记字段值获取对应该行待渲染的颜色
      _getColorFromItems : function(items, value){
        var color; 
        BUI.each(items, function(item){
          if(item.value == value) color = item.color; 
        });
        return color;
      },
      /**
       * 获取一个随机色
       * @protected 
       * @return {String} ‘#000000’格式的颜色字符串
       */
      getRandomColor : function () {
        var r = Math.round(Math.random() * 255), g = Math.round(Math.random() * 255), b = Math.round(Math.random() * 255);
        var color = r << 16 | g << 8 | b;
        return "#" + color.toString(16)
      }
    });
  
    return RowMark;
});
