const Layout = () => import('@/components/layout/Layout');
const MainTwo = () => import('@/components/layout/MainTwo');
//import Layout from "components/layout/Layout"; // 有左边菜单
//import MainTwo from "components/layout/MainTwo"; // 有左边菜单
const _import = require('../_import_' + process.env.NODE_ENV);

const subRouter = [{
  path: '/sub', name: '主体管理', component: Layout,
  children: [{
    name: 'subject.map', path: 'map',
    component: _import('views/sub/map'),
  }, {
    name: 'subject.report', path: 'report',   // 统计报表
    component: _import('views/statistics/report_forms'),
  }, {
    name: 'record', path: ':entityType', component: MainTwo, redirect: '/sub/:entityType/list',
    children: [{
      name: 'list', path: 'list',
      component: _import('views/sub/list'),
    }, {
      name: 'subInfoIndex', path: 'info/index',
      component: _import('views/sub/info/info_index'),
      children: [{
        name: 'entityInfo', path: 'entity',
        component: _import('views/sub/info/info'),
      }, {
        name: 'entityInfo_record', path: 'record',
        component: _import('views/sub/info/workflow_record'),
      }]
    }, {
      name: 'entity', path: 'workinfo',
      component: _import('views/sub/review'),
      children: [{
        name: 'entity_changeInfo', path: 'info',
        component: _import('views/sub/info/change_info'),
      }, {
        name: 'entity_workInfo', path: 'work_info',
        component: _import('views/sub/info/workInfo'),
      }, {
        name: 'entity_record', path: 'record',
        component: _import('views/sub/info/workflow_record'),
      }, {
        name: 'entity_entityInfo', path: 'entity',
        component: _import('views/sub/info/info'),
      }]
    }, {
      name: 'change', path: 'change/:entityType',
      component: _import('views/sub/add/change_index'),
      children: [{
        name: 'change_yzyz', path: 'yzyz',
        component: _import('views/sub/add/form'),
      }, {
        name: 'change_yzwz', path: 'yzwz',
        component: _import('views/sub/add/form'),
      }, {
        name: 'change_wzwz', path: 'wzwz',
        component: _import('views/sub/add/form'),
      }, {
        name: 'change_record', path: 'record',
        component: _import('views/sub/info/workflow_record'),
      }, {
        name: 'change_entityInfo', path: 'entity',
        component: _import('views/sub/info/info'),
      }]
    }]
  }, {
    name: '生产主体录入', path: 'add/product',
    component: _import('views/sub/add/product_index'), redirect: 'add/product/yzyz',
    children: [{
      name: '生产主体录入_有证有照', path: 'yzyz',
      component: _import('views/sub/add/form'),
    }, {
      name: '生产主体录入_有照无证', path: 'yzwz',
      component: _import('views/sub/add/form'),
    }, {
      name: '生产主体录入_无照无证', path: 'wzwz',
      component: _import('views/sub/add/form'),
    }]
  }, {
    name: '流通主体录入', path: 'add/circulation',
    component: _import('views/sub/add/circulation_index'), redirect: 'add/circulation/yzyz',
    children: [{
      name: '流通主体录入_有证有照', path: 'yzyz',
      component: _import('views/sub/add/form'),
    }, {
      name: '流通主体录入_有照无证', path: 'yzwz',
      component: _import('views/sub/add/form'),
    }, {
      name: '流通主体录入_无照无证', path: 'wzwz',
      component: _import('views/sub/add/form'),
    }]
  }, {
    name: '餐饮主体录入', path: 'add/restaurant',
    component: _import('views/sub/add/restaurant_index'), redirect: 'add/restaurant/yzyz',
    children: [{
      name: '餐饮主体录入_有证有照', path: 'yzyz',
      component: _import('views/sub/add/form'),
    }, {
      name: '餐饮主体录入_有照无证', path: 'yzwz',
      component: _import('views/sub/add/form'),
    }, {
      name: '餐饮主体录入_无照无证', path: 'wzwz',
      component: _import('views/sub/add/form'),
    }]
  }, {
    name: 'work', path: 'work/:entityType', component: MainTwo, redirect: '/sub/work/:entityType/list',
    children: [{
      name: 'work_list', path: 'list',
      component: _import('views/sub/work'),
    }, {
      name: 'review', path: 'review',
      component: _import('views/sub/review'),
      children: [{
        name: 'review_changeInfo', path: 'info',
        component: _import('views/sub/info/change_info'),
      }, {
        name: 'review_workInfo', path: 'work_info',
        component: _import('views/sub/info/workInfo'),
      }, {
        name: 'review_record', path: 'record',
        component: _import('views/sub/info/workflow_record'),
      }, {
        name: 'review_entityInfo', path: 'entity',
        component: _import('views/sub/info/info'),
      }]
    },]
  }, {
    name: '生产主体录入_草稿箱', path: 'add/product/back',
    component: _import('views/sub/add/backup'),
  }, {
    name: '流通主体录入_草稿箱', path: 'add/circulation/back',
    component: _import('views/sub/add/backup'),
  }, {
    name: '餐饮主体录入_草稿箱', path: 'add/restaurant/back',
    component: _import('views/sub/add/backup'),
  }, {
    name: 'statistics', path: 'statistics/:entityType', component: MainTwo, redirect: '/sub/statistics/:entityType/index',
    children: [{
      name: 'statistics_info', path: 'index',
      component: _import('views/statistics/sub/index'),
    }]
  }, /*{
    name: 'report', path: 'statistics/:entityType', component: MainTwo, redirect: '/sub/statistics/:entityType/report',
    children: [{
      name: 'report_info', path: 'report',
      component: _import('views/statistics/entity_report_forms'),
    }]
  }*/]
}]

export default subRouter;
