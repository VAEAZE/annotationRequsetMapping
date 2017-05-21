/**
 *  通用图表实例 bar(柱状图)|pie(饼状图)|line(折线图)
 *  data数据格式 [{name:'棉花',col0:20,col1:27,col2:27,col3:87},
 *              {name:'水稻',col0:23,col1:25,col2:26,col3:89}] 服务器端数据
 *   legend_data ['棉花','水稻'] 图例
 *   xData ['棉花','水稻']  x轴数据
 * @type {Object}
 */
/**通用图表对象*/
var commEcharts = {
    /**通用图表结构对象*/
    option : {},
    /**通用数据*/
    dataMap:[],
    /**饼状图数据*/
    childData:[],
    /**x轴数据*/
    xData:[],
    /**清除数据，初始化的时候清除数据
     *避免多次初始化时上一次数据的影响
     */
    clearData:function(){
        this.option={};
        this.dataMap=[];
        this.childData=[];
        this.xData=[];
    },
    /**
     * 将数据格式化为echart3所需要的格式
     * @param data
     * @param type
     * @param description
     */
    formatter: function(data,legend_data,type,description){
        if(type=='pie'||'pie_ring'==type){
            for(var i=0;i<data.length;i++) {
                var obj = {};
                obj.name = data[i].name;
                obj.value = data[i].col0;
                this.dataMap.push(obj);
                this.xData.push(data[i].name);
                this.legend_data=this.xData;
            }
        }else {
            for(var i=0;i<legend_data.length;i++){
                var str='col'+i;
                this.childData=[];
                var obj = {};
                obj.name = legend_data[i];
                obj.type= type;
                if(type=='line_stack'){
                    obj.type= 'line';
                    obj.stack=description;
                    obj.areaStyle={normal: {}};
                }
                for(var j=0;j<data.length;j++){
                    this.childData.push(data[j][str]);
                    this.xData.push(data[j].name);
                }
                obj.data=this.childData;
                this.dataMap.push(obj);

            }
        }
    },

    /**
     * 初始化图表
     * @param id 页面存放图表的容器id
     * @param data 需要显示的数据
     * @param legend_data 图例数据
     * @param xData x坐标上显示的对象
     * @param type 图表类型 bar(柱状图)|pie(饼状图)|line(折线图)
     * @param displayTile 图表标题
     * @param description 图表项描述
     */
    init:function(id,type,displayTile,description,chartData){
        var myChart = echarts.init(document.getElementById(id));
        var data=chartData.data;
        var legend_data=chartData.legend_data;
        this.clearData();
        //格式化数据
        this.formatter(data,legend_data,type,description);
        if(chartData.option){
            myChart.setOption(this.option);
            return myChart;
        }
        this.createOption(data,legend_data,this.xData,type,displayTile,description);
        myChart.setOption(this.option);
        return myChart;
    },

    createOption:function(data,legend_data,xData,type,displayTile,description){
        this.initTitle(displayTile);
        this.initTooltip(type);
       /* this.initToolbox();*/
        this.initLegend(legend_data,type);
        this.initXAxis(xData,type);
        this.initYAxis(type);
        this.initSeries(data,type,description);
        this.initGrid(type);
    },

    /**设置图表标题*/
    initTitle:function(displayTitle){
        this.option.title={
            text:displayTitle,
            left:'center'
        }
    },

    /**设置图表工具箱 鼠标经过的提示信息*/
    initTooltip:function(type){
        if('bar'==type){
            this.option.tooltip ={
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            }
        }else if('pie'==type||'pie_ring'==type){
            this.option.tooltip ={
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            }
        }else if('line'==type||'line_stack'==type){
            this.option.tooltip ={
                trigger: 'axis'
            }
        }

    },

    /**设置图表工具箱*/
    initToolbox:function(){
        this.option.toolbox ={
            show : true,
            top:'30',
            feature : {
                dataView : {show: true, readOnly: false},
                //magicType : {show : true, type : ['line', 'bar', 'stack', 'tiled']},
                magicType : {show : true, type : ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
                //dataZoom :{show:true}
            }
        }

    },

    /**设置图表 图例对象*/
    initLegend:function(legend_data,type){
        if('pie'==type||'pie_ring'==type){
            this.option.legend= {
                orient: 'vertical',
                x: 'left',
                data: legend_data
            }
        }else{
            this.option.legend= {
                show:true,
                top:'16',
                data: legend_data
            }
        }
    },


    /**设置图表X轴信息*/
    initXAxis:function(xData,type){
        if('bar'==type){
            this.option.xAxis = [
                {
                    type : 'category',
                    data : xData
                }

            ]
        }else if('line'==type||'line_stack'==type){
            this.option.xAxis =[
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xData
                }
            ]
        }
    },

    /**设置图表Y轴信息*/
    initYAxis:function(type){
        if('bar'==type||'line'==type||'line_stack'==type) {
            this.option.yAxis = [
                {
                    type: 'value'
                }

            ];
        }
    },



    /**设置图表需要显示的数据*/
    initSeries:function(data,type,description){
        if('bar'==type||'line'==type||'line_stack'==type){
            this.option.series =this.dataMap;
        }else if('pie'==type){
            this.option.series =[
                {
                    name: description,
                    type: type,
                    radius: '60%',
                    center: ['50%', '60%'],
                    itemStyle:{
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX:0,
                            shadowColor:'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: this.dataMap
                }
            ]
        }else if('pie_ring'==type){
            this.option.series =[
                {
                    name: description,
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.dataMap
                }
            ]
        }
    },

    /**设置图表网格信息*/
    initGrid:function(type){
        if('bar'==type||'line'==type||'line_stack'==type){
            this.option.grid ={
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            }
        }
    }
};