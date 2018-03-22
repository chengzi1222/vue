
const subjectStore = {
  namespaced: true,  // 启用命名空间
  state: {
    info:{},
  },
  getters:{
    info(state){ return state.info}
  },
  mutations: {
    SET_INFO:(state,info) => state.info = info,
  },
  actions:{
    setInfo({commit},info){
      commit("SET_INFO",info);
    },
  }
}

export default subjectStore;
