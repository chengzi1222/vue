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
            data:[{name:'小经营店（餐饮）',icon:'circle'},{name:'小经营店（销售）',icon:'circle'},{name:'小作坊',icon:'circle'},{name:'小摊贩',icon:'circle'}]
        },
        series: [
            {
                name:'三小主体数:',
                type:'pie',
                radius: ['30%', '50%'],
                avoidLabelOverlap: false,
                center : ['35%', '50%'],
                color:['#66D6A2','#0DB5EF','#FFCF69','#92E6FF'],
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
                    {value:this.cfdaTotalMap.CFDARESTAURANT, name:'小经营店（餐饮）'},
                    {value:this.cfdaTotalMap.SALE, name:'小经营店（销售）'},
                    {value:this.cfdaTotalMap.WORKSHOP, name:'小作坊'},
                    {value:this.cfdaTotalMap.VENDORS, name:'小摊贩'},
                ]
            }
        ]
    };

    myChart = echarts.init(document.getElementById("cfda"));
    myChart.setOption(option);

    // 窗口变化，重绘图像
    window.addEventListener('resize',function(){
        myChart.resize();
    },false)
}


export default draw
