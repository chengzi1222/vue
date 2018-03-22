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
            data:[{name:'三小主体',icon:'circle'},{name:'餐饮主体',icon:'circle'},{name:'生产主体',icon:'circle'},{name:'流通主体',icon:'circle'}]
        },
        series: [
            {   
                name:'主体数:',
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
                    {value:this.entityTotalMap.CFDA, name:'三小主体'},
                    {value:this.entityTotalMap.RESTAURANT, name:'餐饮主体'},
                    {value:this.entityTotalMap.PRODUCT, name:'生产主体'},
                    {value:this.entityTotalMap.CIRCULATION, name:'流通主体'},
                ]
            }
        ]
    };


    myChart = echarts.init(document.getElementById("mainbody"));
    myChart.setOption(option);

    // 窗口变化，重绘图像
    window.addEventListener('resize',function(){
        myChart.resize();
    },false)
}


export default draw
