export function getInfoFeldChange(afterSubInfo,beforeSubInfo) {
  let natureType = beforeSubInfo.natureType;
  let field = {
    based:{},//基础信息
    personCharge:{},//责任人信息
    management:{},//经营信息
    duty:{}//责任落实
  };
  if (natureType == 'YZYZ'){//有证有照
    //基础信息
    field.based = {
      entityName:beforeSubInfo.entityName == afterSubInfo.entityName ? false : true,
      creditCode:beforeSubInfo.creditCode == afterSubInfo.creditCode ? false : true,
      legalPerson:beforeSubInfo.legalPerson == afterSubInfo.legalPerson ? false : true,
      creditType:beforeSubInfo.creditType == afterSubInfo.creditType ? false : true,
      licence:beforeSubInfo.licence == afterSubInfo.licence ? false : true,
      licDate:beforeSubInfo.licBegin == afterSubInfo.licBegin &&
      beforeSubInfo.licEnd == afterSubInfo.licEnd ? false : true,
      licenceType:beforeSubInfo.licenceType == afterSubInfo.licenceType ? false : true,
      licState:beforeSubInfo.licState == afterSubInfo.licState ? false : true,
      show:true
    };
  }else if(natureType == 'YZWZ'){//有证无照
    //基础信息
    field.based = {
      entityName:beforeSubInfo.entityName == afterSubInfo.entityName ? false : true,
      creditCode:beforeSubInfo.creditCode == afterSubInfo.creditCode ? false : true,
      legalPerson:beforeSubInfo.legalPerson == afterSubInfo.legalPerson ? false : true,
      creditType:beforeSubInfo.creditType == afterSubInfo.creditType ? false : true,
      show:true
    };
  }else if(natureType == 'WZWZ'){//无证无照
    //基础信息
    field.based = {
      entityName:beforeSubInfo.entityName == afterSubInfo.entityName ? false : true,
      show:true
    };
  }


  //
  field.personCharge = {
    corpName:beforeSubInfo.corpName == afterSubInfo.corpName ? false : true,
    mobile:beforeSubInfo.mobile == afterSubInfo.mobile ? false : true,
    censusReg:beforeSubInfo.address == afterSubInfo.address ? false : true,
    idNo:beforeSubInfo.idNo == afterSubInfo.idNo ? false : true,
    show:true
  }

  //经营信息
  field.management = {
    riskRank:beforeSubInfo.riskRank == afterSubInfo.riskRank ? false : true,
    quanLevel:beforeSubInfo.quanLevel == afterSubInfo.quanLevel ? false : true,
    spaceArea:beforeSubInfo.spaceArea == afterSubInfo.spaceArea ? false : true,
    spaceDst:beforeSubInfo.spaceDst == afterSubInfo.spaceDst ? false : true,
    spaceAddr:beforeSubInfo.spaceAddr == afterSubInfo.spaceAddr ? false : true,
    empNumber:beforeSubInfo.empNumber == afterSubInfo.empNumber ? false : true,
    subType:beforeSubInfo.subType == afterSubInfo.subType ? false : true,
    econType:beforeSubInfo.econType == afterSubInfo.econType ? false : true,
    operType:beforeSubInfo.operType == afterSubInfo.operType ? false : true,
    operDetail:beforeSubInfo.operDetail == afterSubInfo.operDetail ? false : true,
    operPro:beforeSubInfo.operPro == afterSubInfo.operPro ? false : true,
    detailedEngage:beforeSubInfo.detailedEngage == afterSubInfo.detailedEngage ? false : true,
    manageState:beforeSubInfo.manageState == afterSubInfo.manageState ? false : true,
    show:true
  }

  //责任落实
  field.duty = {
    syj:beforeSubInfo.syj == afterSubInfo.syj ? false : true,
    grid:beforeSubInfo.grid == afterSubInfo.grid ? false : true,
    so:beforeSubInfo.so == afterSubInfo.so ? false : true,
    soPhone:beforeSubInfo.soPhone == afterSubInfo.soPhone ? false : true,
    infoAssi:beforeSubInfo.infoAssi == afterSubInfo.infoAssi ? false : true,
    infoAssiPhone:beforeSubInfo.infoAssiPhone == afterSubInfo.infoAssiPhone ? false : true,
    firstPl:beforeSubInfo.firstPl == afterSubInfo.firstPl ? false : true,
    firstPlTel:beforeSubInfo.firstPlTel == afterSubInfo.firstPlTel ? false : true,
    manager:beforeSubInfo.manager == afterSubInfo.manager ? false : true,
    managerTel:beforeSubInfo.managerTel == afterSubInfo.managerTel ? false : true,
    show:true
  }

  for (let group in field){
    let groupData = field[group];
    for (let data in groupData){
      if (groupData[data]){
        field[group].show = true;
        break;
      }
      field[group].show = false;
    }

  }

  return field;
}

export function reviewTab(workType,review,type) {
  if (!type) type = 'review';
  let lists = [];
  if(workType == 'CHANGE'){
    lists.push({tabName: review ? '变更申请':'变更详情',name:type + '_changeInfo'});
    lists.push({tabName: '主体信息',name:type + '_entityInfo'});
    lists.push({tabName: '工单操作记录',name:type + '_record'});
    lists.push({tabName: '巡查记录',name:'entityPatrolRecord'});
    lists.push({tabName: '处罚记录',name:'entityPunishRecord'});
  }else if(workType == 'FIRST'){
    lists.push({tabName: '主体信息',name:type + '_workInfo'});
    lists.push({tabName: '巡查记录',name:'entityPatrolRecord'});
    lists.push({tabName: '处罚记录',name:'entityPunishRecord'});
  }
  return lists;
}

export function reviewTabOpen(workType,type) {
  if (!type) type = 'review';
  let routerName = '';
  if (workType == "CHANGE") {
    routerName = type + '_changeInfo';
  }else if (workType == "FIRST") {
    routerName = type + '_workInfo';
  }
  return routerName;
}

export function getOptType(path) {
  if (!path || path.length == 0) return '';
  path = path.substring(1,path.length);
  if (path.length == 0) return '';
  let paths = path.split('/');
  if (!paths.length > 0 ) return '';
  let pathType = paths[0];
  switch (pathType){
    case 'mywork': return 'mywork';
    case 'sub':
      // return 'review';
      if (paths[1] == 'work'){
        return 'review';
      }else {
        return 'entity';
      }
  }
  return '';
}




