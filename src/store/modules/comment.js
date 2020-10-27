//导入
import { queryFindAll } from '@/api/comment.js'

export default {
  namespaced: true,
  state: {
    totalData: {}
  },
  getters: {
    total: state => state.totalData.total,
    commentData: state => state.totalData.list
  },
  mutations: {
    changetotalData(state, data) {
      state.totalData = data;
    }
  },
  actions: {
    queryFindAll({ commit }, payload) {
      queryFindAll(payload).then(res => {
        let max = Math.ceil(res.total / payload.pageSize)
        if (payload.page > max && max != 0) {
          payload.page = max;
          queryFindAll(payload).then(res => {
            commit('changetotalData', res.data)
          })
        } else {
          commit('changetotalData', res.data)
        }
      })
    }
  }
}