const getters = {
  auths: state => state.common.auths,  // 用户权限
  headerMenuId: state => state.common.headerMenuId,  // 菜单路径 用于判断
  user: state => state.common.user,
  menus: state => state.common.menus,
  paths: state => state.common.paths,
  sidebar: state => state.common.sidebar,
  sideMenus: state => state.common.sideMenus,
  isCollapse: state => state.common.isCollapse,
  mapCenter: state => state.common.mapCenter, // 地图中心
  filePath: state => state.common.filePath, // 文件地址
};
export default getters
