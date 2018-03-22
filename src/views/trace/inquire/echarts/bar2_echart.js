import echarts from "echarts";
function bar(data,id){
  let myChart;
  let container;
  let option = {
            title : {
                    text: '3月检测数据',
                    x:'left',
                    textStyle:{
                    color:"#393939",
                    fontSize:15,
                    fontWeight:"normal"
                    }
                },
            color: ['#3398DB',"#FFCF69"],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
                ,formatter: function(params) { 
                    // console.log(params) 
                    let rate=params[0].value/(params[0].value+params[1].value);
                        rate=(rate*100).toFixed(2)+"%"
                    let html=params[0].axisValue+"</br><span style='margin-right:5px;background: #3398DB;display: inline-block;height: 10px;width: 10px;border-radius: 50%'></span>"+
                    params[0].seriesName+":"+params[0].value+"（合格率为"+rate+")</br><span style='margin-right:5px;background: #FFCF69;display: inline-block;height: 10px;width: 10px;border-radius: 50%'></span>"+
                    params[1].seriesName+":"+params[1].value+"</br>"
                    return (html);
                }
            },
            legend: {
                icon:'circle',
                x: 'right',
                y:'top',
                align:'left',
                data: [data.resultdata.name, data.faildata.name]
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'category',
                data:data.nameArray
            },
            yAxis: {
                 type: 'value'
            },
            series: [
                {
                    name:data.resultdata.name,
                    type: 'bar',
                    stack: '总量',
                    data: data.resultdata.data
                },
                {
                    name: data.faildata.name,
                    type: 'bar',
                    stack: '总量',
                    data:data.faildata.data
                }
            ]
        };

    container = document.getElementById(id);
    myChart = echarts.init(container);
    myChart.setOption(option);
    // 窗口变化，重绘图像
    window.addEventListener('resize',function(){
      myChart.resize();
    },false)
}



export default bar
