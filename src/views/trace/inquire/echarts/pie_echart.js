import echarts from "echarts";
// let colors = ['#0DB5EF','#92E6FF',
//              '#66D6A2','#FFCF69',
//              '#9C9C9C','#BF3EFF',
//              '#CD3700','#7A67EE',
//              '#698B22','#00CD00',
//              '#FFB90F','#FFB6C1'];
// let color = [];
//     if (data && data.legend){
//       color = colors.slice(0,data.legend.length);
//     }
           

function pie(data,id){
  let myChart;
  let container;
  let option = {
    title : {
      text: data.title,
      subtext:data.subtitle,
      x:'left',
      textStyle:{
        color:"#393939",
        fontSize:15,
        fontWeight:"normal"
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b}<br/>" +
      "<span style='margin-right:5px;background: #92E6FF;display: inline-block;height: 10px;width: 10px;border-radius: 50%'></span>" +
        "检测批次：{c}次 <br/> " +
      "<span style='margin-right:5px;background: #92E6FF;display: inline-block;height: 10px;width: 10px;border-radius: 50%'></span>" +
      "占比：({d}%)"
    },
   legend: {
      icon:'circle',
      orient: 'vertical',
      x: 'right',
      y:'center',
      align:'left',
      data:data.nameArray
    }, 
    series: [
      {
        type:'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        center : ['40%', '50%'],
        color:["#0DB5EF","#FFCF69"],
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
        data:data.dataArray
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



export default pie
