//导入
import { queryFindAll, saveOrUpdate } from '@/api/category.js'
import { Notification } from 'element-ui';

export default {
  namespaced: true,
  state: {
    totalData: {},
  },
  getters: {
    total: state => state.totalData.total,
    categoryData: state => state.totalData.list
  },
  mutations: {
    changetotalData(state, data) {
      state.totalData = data
    }
  },
  actions: {
    //查询
    async queryFindAll({ commit }, payload) {
      await queryFindAll(payload).then(res => {
        let max = Math.ceil(res.total / payload.pageSize);
        if (payload.page > max && max != 0) {
          payload.page = max;
          queryFindAll(payload).then(res => {
            commit('changetotalData', res.data)
          })
        } else {
          commit('changetotalData', res.data)
        }
      });
    },
    //更新添加
    async saveOrUpdate({ dispatch }, payload) {
      let res = await saveOrUpdate(payload.form);
      if (res.status === 200) {
        Notification({ //element-ui中的方法，用于提示数据是否成功
          type: 'success',
          title: '成功',
          message: '保存成功'
        })
        dispatch('queryFindAll', payload.queryParams)
      } else {
        Notification({
          type: 'error',
          title: '失败',
          message: '保存失败'
        })
      }
    }
  }
}