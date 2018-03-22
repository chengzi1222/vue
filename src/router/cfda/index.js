const Layout = () => import('@/components/layout/Layout');
const MainTwo = () => import('@/components/layout/MainTwo');
const _import = require('../_import_' + process.env.NODE_ENV);

const cfdaRouter = [{
  path: '/cfda', name: 'cfda', component: Layout,
  children: [{
    name: 'cfda.archives', path: 'archives',
    component: _import('views/cfda/entity_record_list'),
  }, {
    name: 'cfda.archives.detail', path: 'archives/detail',
    component: _import('views/cfda/details/index'),
  }, {
    name: 'cfda.archives.change', path: 'archives/change',
    component: _import('views/cfda/workflow/change/change_index'),
  }, {
    name: 'cfda.add', path: 'add',
    component: _import('views/cfda/add/index'),
    children: [{
      name: 'cfda.add.restaurant', path: 'restaurant',
      component: _import('views/cfda/add/restaurant'),
    }, {
      name: 'cfda.add.sale', path: 'sale',
      component: _import('views/cfda/add/sale'),
    }, {
      name: 'cfda.add.vendors', path: 'vendors',
      component: _import('views/cfda/add/vendors'),
    }, {
      name: 'cfda.add.workshop', path: 'workshop',
      component: _import('views/cfda/add/workshop'),
    }]
  }, {
    name: 'cfda.add.draft', path: 'add/draft',
    component: _import('views/cfda/add/backup'),
  }, {
    name: 'cfda.workflow', path: 'workflow',
    component: _import('views/cfda/workflow/index'),
  }, {
    name: 'cfda.workflow.review', path: 'workflow/review',
    component: _import('views/cfda/workflow/review/index'),
  }, {
    name: 'cfda.statistics', path: 'statistics',
    component: _import('views/statistics/cfda/index'),
  }, {
    name: 'cfda.workflow.detail', path: ':type/workflow',
    component: _import('views/cfda/workflow/info/index')
  },]
}]

export default cfdaRouter;
