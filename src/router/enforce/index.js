const Layout = () => import('@/components/layout/Layout');
const MainTwo = () => import('@/components/layout/MainTwo');
const _import = require('../_import_' + process.env.NODE_ENV);

const enforceRouter = [{
  name: 'enforce', path: '/enforce', component: Layout,
  children: [{
    path: 'punish', component: MainTwo,
    children: [{
      name: 'enforce.punish', path: '',
      component: _import('views/enforce/punish_list'),
    }, {
      name: 'enforce.punish.add', path: 'add',
      component: MainTwo, component: _import('views/enforce/punish_add'),
    }, {
      name: 'enforce.punish.detail', path: 'detail',
      component: _import('views/enforce/punish_detail'),
    }]
  }, {
    path: 'criminalCase', component: MainTwo,
    children: [{
      name: 'enforce.criminalCase', path: '',
      component: _import('views/enforce/criminal_case_list'),
    }, {
      name: 'enforce.criminalCase.detail', path: 'detail',
      component: _import('views/enforce/criminal_case_detail'),
    }, {
      name: 'enforce.criminalCase.add', path: 'add',
      component: _import('views/enforce/criminal_case_add'),
    }]
  }]
}]

export default enforceRouter;
