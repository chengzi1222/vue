const Layout = () => import('@/components/layout/Layout');
const _import = require('../_import_' + process.env.NODE_ENV);

const traceRouter = [{
  name: 'yb', path: '/yb', component: Layout,
  children: [{
    name: 'yb.main', path: 'main',
    component: _import('views/trace/supervise/main'),
    children: [{
      name: 'yb.monitoring', path: 'monitoring',
      component: _import('views/trace/supervise/monitoring'),
    }, {
      name: 'yb.schoollis', path: 'schoollis',
      component: _import('views/trace/supervise/schoollis'),
    }, {
      name: 'yb.orderlis', path: 'orderlis',
      component: _import('views/trace/supervise/orderlis'),
    }, {
      name: 'yb.schoollis', path: 'schoollis',
      component: _import('views/trace/supervise/schoollis'),
    }, {
      name: 'yb.supplierlis', path: 'supplierlis',
      component: _import('views/trace/supervise/supplierlis'),
    }, {
      name: 'yb.aptitudeLook', path: 'aptitudeLook',
      component: _import('views/trace/supervise/aptitudeLook'),
    }, {
      name: 'yb.detaillis', path: 'detaillis',
      component: _import('views/trace/supervise/detaillis'),
    }, {
      name: 'yb.source', path: 'source',
      component: _import('views/trace/supervise/source'),
    }]
  }, {
    name: 'yb.gathermain', path: 'gathermain',
    component: _import('views/trace/gather/gathermain'),
    children: [{
      name: 'yb.gather', path: 'gather',
      component: _import('views/trace/gather/gather'),
    }, {
      name: 'yb.pass', path: 'pass',
      component: _import('views/trace/gather/pass'),
    }]
  }, {
    name: 'yb.analyzemain', path: 'analyzemain',
    component: _import('views/trace/analyze/main'),
    children: [{
      name: 'yb.analyze', path: 'analyze',
      component: _import('views/trace/analyze/analyze'),
    }]
  }, {
    name: 'yb.pricemain', path: 'pricemain',
    component: _import('views/trace/price/pricemain'),
    children: [{
      name: 'yb.price', path: 'price',
      component: _import('views/trace/price/price'),
    }, {
      name: 'yb.pricedeta', path: 'pricedeta',
      component: _import('views/trace/price/pricedeta'),
    }]
  }, {
    name: 'yb.bill', path: 'bill',
    component: _import('views/trace/bill/index'),
    children: [{
      name: 'yb.main', path: 'main',
      component: _import('views/trace/bill/gather'),
    }, {
      name: 'yb.detail', path: 'detail',
      component: _import('views/trace/bill/detail'),
    }]
  }, {
name: 'yb.inquire', path: 'inquire',
component: _import('views/trace/inquire/main'),
children:[{
    name: 'yb.inquireMain', path: 'inquireMain',
    component: _import('views/trace/inquire/index'),
    },{
    name: 'yb.cityChart', path: 'cityChart',
    component: _import('views/trace/inquire/cityChart'),
    }, {
    name: 'yb.areaChart', path: 'areaChart',
    component: _import('views/trace/inquire/areaChart'),
    }, {
    name: 'yb.streetChart', path: 'streetChart',
    component: _import('views/trace/inquire/streetChart'),
    }, {
    name: 'yb.marketChart', path: 'marketChart',
    component: _import('views/trace/inquire/marketChart'),
    }, {
    name: 'yb.vendorChart', path: 'vendorChart',
    component: _import('views/trace/inquire/vendorChart'),
    }, {
    name: 'yb.analyzeInfo', path: 'analyzeInfo',
    component: _import('views/trace/inquire/analyzeInfo'),
    }
    ]
    },
    {
name: 'yb.dlr', path: 'dlr',
component: _import('views/trace/dlr/main'),
children:[{
    name: 'yb.dlrMain', path: 'dlrMain',
    component: _import('views/trace/dlr/index'),
    }, {
    name: 'yb.dlrCityChart', path: 'dlrCityChart',
    component: _import('views/trace/dlr/cityChart'),
    }, {
    name: 'yb.dlrAreaChart', path: 'dlrAreaChart',
    component: _import('views/trace/dlr/areaChart'),
    }, {
    name: 'yb.dlrMarketChart', path: 'dlrMarketChart',
    component: _import('views/trace/dlr/marketChart'),
    },{
    name: 'yb.dlrVendorChart', path: 'dlrVendorChart',
    component: _import('views/trace/inquire/vendorChartYb'),
    }, {
    name: 'yb.dlrAnalyzeInfo', path: 'dlranalyzeInfoYb',
    component: _import('views/trace/inquire/analyzeInfoYb'),
    }
    ]
    }
    ,{
name: 'yb.farm', path: 'farm',
component: _import('views/trace/farm/main'),
children:[
    {
    name: 'yb.farmMain', path: 'farmMain',
    component: _import('views/trace/farm/index'),
    },
    {
    name: 'yb.farmCityChart', path: 'farmCityChart',
    component: _import('views/trace/farm/cityChart'),
    }, {
    name: 'yb.farmAreaChart', path: 'farmAreaChart',
    component: _import('views/trace/farm/areaChart'),
    }, {
    name: 'yb.farmMarketChart', path: 'farmMarketChart',
    component: _import('views/trace/farm/marketChart'),
    },{
      name: 'yb.farmStreetChart', path: 'farmStreetChart',
      component: _import('views/trace/farm/streetChart')
    },
      {
      name: 'yb.farmAnalyzeInfo', path: 'farmAnalyzeInfo',
      component: _import('views/trace/farm/farmAnalyzeInfo'),
    },{
      name: 'yb.farmVendorChart', path: 'farmVendorChart',
      component: _import('views/trace/farm/farmVendorChart'),
    }
    ]
},
]
}]
 
export default traceRouter;
