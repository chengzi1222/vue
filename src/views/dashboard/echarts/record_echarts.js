import echarts from "echarts";

    

let myChart
function draw(){

    let option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y:'center',
            align:'left',
            data:[{name:'基本符合',icon:'circle'},{name:'符合',icon:'circle'},{name:'不符合',icon:'circle'}]
        },
        series: [
            {
                name:"日常巡查结果:",
                type:'pie',
                radius: ['30%', '50%'],
                avoidLabelOverlap: false,
                center : ['35%', '50%'],
                color:['#66D6A2','#0DB5EF','#FFCF69'],
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
                    {value:[this.patrolResult.PASSED], name:'基本符合'},
                    {value:[this.patrolResult.QUALIFIED], name:'符合'},
                    {value:[this.patrolResult.DISQUALIFIED], name:'不符合'},
                ]
            }
        ]
    };

    myChart = echarts.init(document.getElementById("record"));
    myChart.setOption(option);

    // 窗口变化，重绘图像
    window.addEventListener('resize',function(){
        myChart.resize();
    },false)
}

export default draw
