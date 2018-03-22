const Layout = () => import('@/components/layout/Layout');
const _import = require('../_import_' + process.env.NODE_ENV);

const myworkRouter = [{
  path: '/mywork', component: Layout,
  children: [{
    name: 'mywork', path: '',
    component: _import('views/mywork/mywork'),
    children: [{
      name: 'mywork.cfda', path: 'cfda',
      component: _import('views/mywork/cfda/list'),
    }, {
      name: 'mywork.sub', path: ':entityType',
      component: _import('views/mywork/sub/list'),
    }]
  }, {
    name: 'mywork.cfda.detail', path: 'cfda/detail',
    component: _import('views/cfda/workflow/info/index'),
  }, {
    name: 'mywork.cfda.workflow', path: 'cfda/workflow',
    component: _import('views/cfda/workflow/change/change_index')
  }, {
    name: 'mywork_info', path: 'mywork/info',
    component: _import('views/sub/review'),
    children: [{
      name: 'mywork_changeInfo', path: 'change',
      component: _import('views/sub/info/change_info'),
    }, {
      name: 'mywork_workInfo', path: 'workInfo',
      component: _import('views/sub/info/workInfo'),
    }, {
      name: 'mywork_record', path: 'record',
      component: _import('views/sub/info/workflow_record'),
    }, {
      name: 'mywork_entityInfo', path: 'entity',
      component: _import('views/sub/info/info'),
    }]
  }, {
    name: 'reapply_change', path: 'mywork/change/:entityType',
    component: _import('views/sub/add/reapply_index'),
    children: [{
      name: 'reapply_change_yzyz', path: 'yzyz',
      component: _import('views/sub/add/form'),
    }, {
      name: 'reapply_change_yzwz', path: 'yzwz',
      component: _import('views/sub/add/form'),
    }, {
      name: 'reapply_change_wzwz', path: 'wzwz',
      component: _import('views/sub/add/form'),
    }]
  }, {
    name: 'reapply_first', path: 'mywork/edit/:entityType',
    component: _import('views/sub/add/reapply_index'),
    children: [{
      name: 'reapply_first_yzyz', path: 'yzyz',
      component: _import('views/sub/add/form'),
    }, {
      name: 'reapply_first_yzwz', path: 'yzwz',
      component: _import('views/sub/add/form'),
    }, {
      name: 'reapply_first_wzwz', path: 'wzwz',
      component: _import('views/sub/add/form'),
    }]
  }]
}]

export default myworkRouter;
