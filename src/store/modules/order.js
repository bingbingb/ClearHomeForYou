import { findById, queryPage, findAll } from '@/api/order.js'


export default {
  namespaced: true,
  state: {
    totalData: {},
    orderData: {},
    findAllData: []
  },
  getters: {
    total: state => state.totalData.total,
    queryData: state => state.totalData.list
  },

  mutations: {
    changeorderData(state, data) {
      state.orderData = data;
    },
    changetotalData(state, data) {
      state.totalData = data;
    },
    changefindAllData(state, data) {
      state.findAllData = data;
    },
  },
  actions: {
    /**
     * 通过订单id查找信息
     */
    async findById({ commit }, payload) {
      let res = await findById(payload)
      commit('changeorderData', res.data)
    },
    async queryPage({ commit }, payload) {
      await queryPage(payload).then(res => {
        let max = Math.ceil(res.total / payload.pageSize);
        if (payload.page > max && max != 0) {
          payload.page = max;
          queryPage(payload).then(res => {
            commit("changetotalData", res.data);
          })
        } else {
          commit("changetotalData", res.data);
        }
      })
    },
    async findAll({ commit }) {
      let res = await findAll();
      commit("changefindAllData", res.data)
    },


  }
}