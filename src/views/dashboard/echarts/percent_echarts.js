import echarts from "echarts";

let myChart
function draw(){
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
      
        series: [
            {
                name: '覆盖率:',
                type:'pie',
                radius: ['48%', '60%'],
                avoidLabelOverlap: false,
                center : ['50%', '50%'],
                color:['#0DB5EF','#F6F7F8'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            // fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:[this.entityCoverage]},
                    {value:[100 - this.entityCoverage]},
                ]
            }
        ]
    };

    myChart = echarts.init(document.getElementById("percent"));
    myChart.setOption(option);

    // 窗口变化，重绘图像
    window.addEventListener('resize',function(){
        myChart.resize();
    },false)
}


export default draw
