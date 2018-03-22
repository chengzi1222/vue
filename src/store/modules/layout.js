const layout = {
  state: {
    tableHeight: 0,
    tableWidth:0
  },
  mutations: {
    SET_CLIENT_HEIGHT:(state, tableHeight) => state.tableHeight = tableHeight,
    SET_CLIENT_WIDTH:(state, tableWidth) => state.tableWidth = tableWidth,
  },
  actions: {
    setClientHeight: ({ commit }, tableHeight) => {
      commit("SET_CLIENT_HEIGHT", tableHeight);
    },
    setClientWidth: ({ commit }, tableWidth) => {
      commit("SET_CLIENT_WIDTH", tableWidth);
    },
  }
}

export default layout;
