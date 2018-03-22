import echarts from "echarts";
//数据格式：
// useData:{
//     title:'历史溯源平台使用情况趋势图'
//     ,formatter:{
//            y:'{value} %',
//            tooltip:"%"
//        }
//     ,name:[]
//     ,value:[]
//     ,id:[]//可不填
//      ,url:''//可不填
//     ,dataZoom:false//可不填
//     ,gridB ////可不填
//     ,zoomLock //单独处理固定dataZoom，并且固定宽
// }

function bar(data,id,elenent){
    let z={
        // startValue:0,
        // endValue:0,
        zoomLock:false,
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty',
        bottom:0,
        show:data.dataZoom == false ? false : true
    }
    if(data.zoomLock){
        z= {
            startValue:0,
            endValue:20,
            zoomLock:true,
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty',
            bottom:0,
            show:data.dataZoom == false ? false : true
        }
    }
  let myChart;
  let container;
  let Ttext=data.formatter.Ttext ? data.formatter.Ttext : '数值'
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
            color: ['#3398DB'],
            tooltip: {
                trigger: 'item',
                formatter: "{b}<br/>" +
                "<span style='margin-right:5px;background: #92E6FF;display: inline-block;height: 10px;width: 10px;border-radius: 50%'></span>" +
                  ""+Ttext+"：{c}"+data.formatter.tooltip+" <br/> "
              },
            // tooltip : {
            //     trigger: 'axis',
            //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            //     }
            // },
            grid: {
                top:data.title == '' ? '8%':'15%',
                left: '3%',
                right: '4%',
                bottom:data.gridB ? data.gridB :'15%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : data.name,
                    axisTick: {
                        alignWithLabel: true
                    }
                    ,triggerEvent:true 
                    ,axisLabel: {  
                        interval:0,  
                        rotate:data.rotate ==0  ? data.rotate :40  
                     }  
                }
            ],
            yAxis : [
                {
                    type : 'value'
                    ,axisLabel: {
                        formatter: data.formatter.y
                    }
                }
            ],
            dataZoom: z,
            series : [
                {
                    name:'数值',
                    type:'bar',
                    barWidth: '60%',
                    data:data.value
                }
            ]
        };

    container = document.getElementById(id);
    if(data.name && data.value){
        myChart = echarts.init(container);
    };
    myChart.setOption(option);
    // 窗口变化，重绘图像
    window.addEventListener('resize',function(){
      myChart.resize();
    },false);
    if(data.id && data.url){
        myChart.on('click', function (params) {
            let id=data.id;
            if(params.componentType =="xAxis"){ 
                console.log(params);
                let val=params.value;
                for(let i=0;i<data.name.length;i++ ){
                    if(data.name[i]==val){
                        if(data.backtitle){
                            elenent.$router.push({name:data.url,query:{areaid:id[i],name:val,backtitle:data.backtitle}});
                        }else{
                            elenent.$router.push({name:data.url,query:{areaid:id[i],name:val}});
                        }
                       
                    }
                }
            }else{
                if(data.backtitle){//如果需要就传backtitle
                    elenent.$router.push({name:data.url,query:{areaid:id[params.dataIndex],name:params.name,backtitle:data.backtitle}});
                }else{
                    elenent.$router.push({name:data.url,query:{areaid:id[params.dataIndex],name:params.name}})
                }
            };
        });
    }
  
}



export default bar
