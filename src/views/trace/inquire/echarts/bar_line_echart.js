import echarts from "echarts";
function barAndLine(data,id){
  let myChart;
  let container;
  let option = {
            title : {
                text: data.title,
                x:'left',
                textStyle:{
                color:"#393939",
                fontSize:15,
                fontWeight:"normal"
                }
            },
            color: ['#3398DB',"#FFCF69"],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                icon:'circle',
                x: 'right',
                align:'left',
                data:[data.bar.name,data.line.name]
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.xAxis,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    max: 185,//需要找到这个数组的最大的一个数（要处理）
                    interval: 37,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
                
            ],
            dataZoom: {
                startValue:0,
                endValue:6,
                zoomLock:true,
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'empty',
                bottom:0//控制位置
            },
            series: [
                {
                    name:data.bar.name,
                    type:'bar',
                    data:data.bar.data
                },
                {
                    name:data.line.name,
                    type:'line',
                    data: data.line.data
                }
            ]
        };

    container = document.getElementById(id);
    myChart = echarts.init(container);
    myChart.setOption(option);
    // 窗口变化，重绘图像
    window.addEventListener('resize',function(){
      myChart.resize();
    },false);
}



export default barAndLine
