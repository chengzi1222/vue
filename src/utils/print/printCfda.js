import {getCfda} from "api/cfda/details";
import {getLodop} from "utils/print/LodopFuncs";
import pop from "components/pop.js";

/*三小备案打印*/
      /*type:
       WORKSHOP	食品小作坊
       SALE	小经营店(食品销售)
       CFDARESTAURANT	小经营店(餐饮服务)
       VENDORS  固定食品摊贩
       */
  export function doPrint(id, type) {
    getCfda(id).then(result => {
      if (result.status) {
        //获取并初始化打印控件
        var LODOP = getLodop();

        if (LODOP && LODOP != null && LODOP != undefined) {
          let printInfo = result.data;
          if (printInfo) {
            LODOP.SET_PRINT_PAGESIZE(1,'','','A4');
            var validTo = []; //有效期
            //printInfo.validTo = "2017-5-16";		//测试数据
            if(printInfo.recordEndStr != null && printInfo.recordEndStr != '') {
              if(printInfo.recordEndStr.indexOf("-") > 0) {
                validTo = printInfo.recordEndStr.split('-');
              } else if(printInfo.recordEndStr.indexOf("/") > 0) {
                validTo = printInfo.recordEndStr.split('/');
              }
            } else {
              validTo = ['', '', ''];
            }

            var printDate = [];	//发证日期
            var printDateStr = new Date().toLocaleDateString();
            if(printDateStr.indexOf("-") > 0) {
              printDate = printDateStr.split('-');
            } else if(printDateStr.indexOf("/") > 0) {
              printDate = printDateStr.split('/');
            }

            if (type == 'WORKSHOP') {
              LODOP.SET_PRINT_PAGESIZE(1,'','','A4');
              LODOP.SET_PRINT_STYLE("FontSize","16");
              LODOP.SET_PRINT_STYLE("Bold",'1');

              //新版
              LODOP.ADD_PRINT_TEXT('76mm','55mm','180mm','6mm',printInfo.backupNo);
              LODOP.ADD_PRINT_TEXT('98mm','55mm','180mm','6mm',printInfo.entityName);
              LODOP.ADD_PRINT_TEXT('121mm','55mm','180mm','6mm',printInfo.corpName);
              LODOP.ADD_PRINT_TEXT('186mm','55mm','180mm','6mm',printInfo.address);

              //有效日期
              LODOP.ADD_PRINT_TEXT('208mm','65mm','180mm','6mm',validTo[0]);
              LODOP.ADD_PRINT_TEXT('208mm','94mm','180mm','6mm',validTo[1]);
              LODOP.ADD_PRINT_TEXT('208mm','113mm','180mm','6mm',validTo[2]);


              //打印日期
              LODOP.ADD_PRINT_TEXT('258mm','115mm','180mm','6mm',printDate[0]);
              LODOP.ADD_PRINT_TEXT('258mm','149mm','180mm','6mm',printDate[1]);
              LODOP.ADD_PRINT_TEXT('258mm','166mm','180mm','6mm',printDate[2]);

              LODOP.SET_PRINT_STYLE("FontSize","14");
              LODOP.ADD_PRINT_TEXT('143mm','69mm','120mm','60mm',printInfo.prodTypeStr);

              //var testStr = printInfo.organizeCode+"打印测试七个字";
              var organizeCodeLeft = 210 - (printInfo.syjName.length * 4 + 61) + "mm";

              LODOP.ADD_PRINT_TEXT('239mm',organizeCodeLeft,'180mm','6mm',printInfo.syjName);

              //加入二维码
              if(printInfo.id != null && printInfo.id != '') {
                LODOP.ADD_PRINT_BARCODE('232mm','25mm', '42mm', '42mm', "QRCode", `${window._base.baseUrl}/qrcode/entity/`+printInfo.id);
              }
            } else if (type == 'SALE' || type == 'CFDARESTAURANT') {

              //新版
              LODOP.SET_PRINT_PAGESIZE(1,'','','A4');
              LODOP.SET_PRINT_STYLE("FontSize","16");
              LODOP.SET_PRINT_STYLE("Bold",'1');

              LODOP.ADD_PRINT_TEXT('61mm','54mm','140mm','6mm',printInfo.backupNo);
              LODOP.ADD_PRINT_TEXT('76mm','54mm','140mm','6mm',printInfo.entityName);
              LODOP.ADD_PRINT_TEXT('91mm','54mm','140mm','6mm',printInfo.corpName);
              LODOP.ADD_PRINT_TEXT('198mm','54mm','140mm','6mm',printInfo.address);

              //有效日期
              LODOP.ADD_PRINT_TEXT('213mm','65mm','140mm','6mm',validTo[0]);
              LODOP.ADD_PRINT_TEXT('213mm','94mm','140mm','6mm',validTo[1]);
              LODOP.ADD_PRINT_TEXT('213mm','114mm','140mm','6mm',validTo[2]);

              //打印日期
              LODOP.ADD_PRINT_TEXT('259mm','117mm','140mm','6mm',printDate[0]);
              LODOP.ADD_PRINT_TEXT('259mm','149mm','140mm','6mm',printDate[1]);
              LODOP.ADD_PRINT_TEXT('259mm','166mm','140mm','6mm',printDate[2]);

              LODOP.SET_PRINT_STYLE("FontSize","13");

              LODOP.ADD_PRINT_TEXT('107mm','54mm','120mm','60mm',printInfo.projectMainStr);
              LODOP.ADD_PRINT_TEXT('153mm','54mm','120mm','60mm',printInfo.projectSidStr);

              LODOP.SET_PRINT_STYLE("FontSize","14");
              var organizeCodeLeft = 210 - (printInfo.syjName.length * 4 + 60) + "mm";
              LODOP.ADD_PRINT_TEXT('240mm',organizeCodeLeft,'180mm','6mm',printInfo.syjName);

              //加入二维码
              if(printInfo.id != null && printInfo.id != '') {
                LODOP.ADD_PRINT_BARCODE('232mm','25mm', '42mm', '42mm', "QRCode", `${window._base.baseUrl}/qrcode/entity/`+printInfo.id);
              }
            } else if (type == 'VENDORS') {

              //新版
              LODOP.SET_PRINT_PAGESIZE(2,'','','A5');
              LODOP.SET_PRINT_STYLE("FontSize","16");
              LODOP.SET_PRINT_STYLE("Bold",'1');

              LODOP.ADD_PRINT_TEXT('40mm','47mm','180mm','6mm',printInfo.backupNo);
              LODOP.ADD_PRINT_TEXT('54mm','47mm','180mm','6mm',printInfo.entityName);
              LODOP.ADD_PRINT_TEXT('68mm','60mm','180mm','6mm',printInfo.idNo);
              LODOP.ADD_PRINT_TEXT('95mm','54mm','180mm','6mm',printInfo.address);

              //打印日期
              LODOP.ADD_PRINT_TEXT('119mm','117mm','180mm','6mm',printDate[0]);
              LODOP.ADD_PRINT_TEXT('119mm','148mm','180mm','6mm',printDate[1]);
              LODOP.ADD_PRINT_TEXT('119mm','165mm','180mm','6mm',printDate[2]);

              let saleStr = printInfo.foodProdStr;
              if(saleStr) {
                if(printInfo.foodSalesStr) {
                  saleStr += ',';
                  saleStr += printInfo.foodSalesStr;
                }
              } else {
                saleStr = printInfo.foodSalesStr;
              }
              LODOP.SET_PRINT_STYLE("FontSize","12");
              LODOP.ADD_PRINT_TEXT('82mm','56mm','100mm','60mm', saleStr);

              //二维码
              if(printInfo.id != null && printInfo.id != '') {
                LODOP.ADD_PRINT_BARCODE('104mm','25mm', '29mm', '29mm', "QRCode", `${window._base.baseUrl}/qrcode/entity/`+printInfo.id);
              }
            }
            LODOP.PRINTA();
          } else {
            pop('获取打印页面数据失败')
          }
        } else {
          pop('没有安装打印控件，请安装打印控件: <a style="color: #795da3" href="http://www.lodop.net/download.html" target="_blank">下载页面</a> ！')
        }
      } else {
        pop(result.msg)
      }
    }
    );
  }

