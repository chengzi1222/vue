import Vue from "vue";
import Router from "vue-router";

import adminRouter from './admin';  //后台管理 路由
import cfdaRouter from './cfda';  //三小管理 路由
import supportRouter from './support';  //组织架构 路由
import subRouter from './sub';  //主图系统 路由
import myworkRouter from './mywork';  //我的工单 路由
import periCamera from './peri/camera';  //阳光厨房 路由
import patrolRouter from './patrol';  //巡查
import enforceRouter from './enforce';  //行政处罚
import traceRouter from './trace';  //溯源监管
// const allRouter = [
// 'admin',   // 后台管理 路由
// 'cfda',  // 业务系统 三小模块路由
// 'support',  // 支撑系统路由
// 'sub',  // 支撑系统路由
// 'mywork',   // 主体路由
// 'peri/camera',// 主体路由
// 'patrol', // 主体路由
// 'enforce', //行政执法路由
// 'trace'   //溯源监管路由
// ];

const _import = require('./_import_' + process.env.NODE_ENV)
const LayoutTwo = () => import('@/components/layout/LayoutTwo'); // 没有左边菜单

Vue.use(Router);
const routerMap = [
  ...adminRouter,     // 后台管理
  ...cfdaRouter,      // 三小
  ...supportRouter,   // 支持系统(组织架构)
  ...myworkRouter,    // 我的工单
  ...subRouter,       // 主体系统
  ...periCamera,      // 阳光厨房
  ...patrolRouter,    // 巡查
  ...enforceRouter,   // 行政处罚
  ...traceRouter,     // 溯源监管
  // 其他路由在上面引入
  ...[{ // 默认路由
    name: "login", path: "/login",
    component: _import('views/Login')
  }, {
    name: 'index', path: '/', component: LayoutTwo, redirect: '/welcome',
    children: [{
      name: 'index.welcome', path: 'welcome',
      component: _import('views/dashboard/Welcome'),
    }, {
      name: 'index.dashboard', path: 'dashboard',
      component: _import('views/dashboard/index'),
    }]
  }, {
    name: 'component.common', path: '/component/common', // 小组件路由
    component: _import('components/common/index'),
  }],
];

export default routerMap;
