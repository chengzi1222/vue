const Layout = () => import('@/components/layout/Layout');
const MainTwo = () => import('@/components/layout/MainTwo');
const _import = require('../_import_' + process.env.NODE_ENV)

const patrolRouter = [{
  name: 'patrol', path: '/biz/patrol', component: Layout,
  children: [{
    name: 'patrolTable', path: 'table', component: MainTwo, redirect: '/biz/patrol/table/list',
    children: [{
      name: 'patrolTableList', path: 'list',
      component: _import('views/patrol/project/table_list'),
    }, {
      name: 'patrolContextList', path: 'context',
      component: _import('views/patrol/project/context_list'),
    }, {
      name: 'patrolProjectList', path: 'project',
      component: _import('views/patrol/project/project_list'),
    }]
  }, {
    name: 'special', path: 'special', component: MainTwo, redirect: '/biz/patrol/special/list',
    children: [{
      name: 'specialList', path: 'list',
      component: _import('views/patrol/special/planSpecial'),
    }, {
      name: 'specialInfo', path: 'info',
      component: _import('views/patrol/special/planSpecialInfo'),
    }, {
      name: 'specialAdd', path: 'add',
      component: _import('views/patrol/special/planSpecialAdd'),
    }, {
      name: 'specialEdit', path: 'edit',
      component: _import('views/patrol/special/planSpecialAdd'),
    },{
      name: 'patrol.situation.specialStatistics', path: 'specialStatistics',
      component: _import('views/patrol/situation/specialStatistics'),
    }]
  }, {
    name: 'patrol.daily', path: 'daily',
    component: _import('views/patrol/project/tourPlan'),
  }, {
    name: 'record', path: 'record', component: MainTwo, redirect: '/biz/patrol/record/special',
    children: [{
      name: '专项巡查记录列表', path: 'special',
      component: _import('views/patrol/record/recordSpecial'),
    }, {
      name: '日常巡查记录列表', path: 'daily',
      component: _import('views/patrol/record/recordDaily'),
    }]
  }, {
    name: 'patrol.repatrol', path: 'repatrol', component: MainTwo, redirect: '/biz/patrol/repatrol/list',
    children: [{
      name: 'patrol.repatrol.list', path: 'list',
      component: _import('views/patrol/repatrol/list'),
    }, {
      name: 'patrol.repatrol.ad', path: ':curd/:repatrolRecordId',
      component: _import('views/patrol/repatrol/ad'),
    }]
  }, {
    name: 'patrol.record', path: 'record', component: MainTwo, redirect: '/biz/patrol/record/special',
    children:[
      {
        name: 'patrol.record.specialIndex', path: 'special',
        component: _import('views/patrol/record/specialIndex'),
        children:[
          {
            name: 'patrol.record.special', path: 'list',
            component: _import('views/patrol/record/recordSpecial'),
          },
          {
              name: 'patrol.record.special.add', path: 'add',
              component: _import('views/patrol/project/specialadd'),
          },
          {
              name: 'patrol.record.detail', path: 'detail',
              component: _import('views/patrol/project/dayInfo'),
          }, 
          {
            name: 'patrol.record.info', path: 'info',
            component: _import('views/cfda/details/index'),
          }, 
          {
            name: 'patrol.record.subInfo', path: 'subinfo',
            component: _import('views/sub/info/info_index'),
            children: [{
              name: 'patrol.record.entityInfo', path: 'entity',
              component: _import('views/sub/info/info'),
            }, {
              name: 'patrol.record.entityInfo_record', path: 'record',
              component: _import('views/sub/info/workflow_record'),
            }]
          }, 
        ]
      },
      {
        name: 'patrol.record.dailyIndex', path: 'daily',
        component: _import('views/patrol/record/dailyIndex'),
        children:[
          {
              name: 'patrol.record.daily', path: 'list',
              component: _import('views/patrol/record/recordDaily'),
          },
          {
              name: 'patrol.record.daily.add', path: 'add',
              component: _import('views/patrol/project/dailyadd'),
          },
          {
            name: 'patrol.record.dailyDetail', path: 'detail',
            component: _import('views/patrol/project/dayInfo'),
          }, 
          {
            name: 'patrol.record.dailyinfo', path: 'info',
            component: _import('views/cfda/details/index'),
          }, 
          {
            name: 'patrol.record.subInfo', path: 'subinfo',
            component: _import('views/sub/info/info_index'),
            children: [{
              name: 'patrol.record.dailyEntityInfo', path: 'entity',
              component: _import('views/sub/info/info'),
            }, {
              name: 'patrol.record.entityInfo_record', path: 'record',
              component: _import('views/sub/info/workflow_record'),
            }]
          }     
        ]
      }
    ]
  },{
    name: 'patrol.situation', path: 'situation', component: MainTwo, redirect: '/biz/patrol/situation/statistics',
    children:[{
      name: 'patrol.situation.statistics', path: 'statistics',
      component: _import('views/patrol/situation/statistics'),
    }]
  }]
}]

export default patrolRouter;
