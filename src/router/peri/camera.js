const Layout = () => import('@/components/layout/Layout');
const _import = require('../_import_' + process.env.NODE_ENV);

const caremaRouter = [{
  path: '/camera', component: Layout,
  children: [{
    name: 'camera', path: '',
    component: _import('views/peri/camera/show_list'),
  }, {
    name: 'camera.detail', path: 'detail',
    component: _import('views/peri/camera/show_detail'),
  }, {
    name: 'camera.manage', path: 'manage',
    component: _import('views/peri/camera/manage_list'),
  }, {
    name: 'camera.manage.detail', path: 'manage/detail',
    component: _import('views/peri/camera/show_detail'),
  }, {
    name: 'camera.manage.edit', path: 'manage/edit',
    component: _import('views/peri/camera/manage_edit'),
  }]
}]

export default caremaRouter;
