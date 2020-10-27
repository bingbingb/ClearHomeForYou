//导入api方法或axios
import { findAll, saveOrUpdate } from '@/api/product.js'
import { Notification } from 'element-ui';

export default {
  namespaced: true,
  state: {
    totalData: {},
  },
  getters: {
    total: state => state.totalData.total,
    productData: state => state.totalData.list
  },
  mutations: {
    changeTotalData(state, data) {
      state.totalData = data;
    }
  },
  actions: {
    findAll({ commit }, payload) {
      findAll(payload).then(res => {
        //删除最后一页的最后一个数据后，防止出错，
        let max = Math.ceil(res.data.total / payload.pageSize);
        if (payload.page > max && max != 0) {
          payload.page = max;
          findAll(payload).then(res => {
            commit('changeTotalData', res.data)
          })
        } else {
          commit('changeTotalData', res.data)
        }
      })
    },
    async saveOrUpdate({ dispatch }, payload) {
      let res = await saveOrUpdate(payload.form);
      if (res.status === 200) {
        Notification({ //element-ui中的方法，用于提示数据是否成功
          type: 'success',
          title: '成功',
          message: '保存成功'
        })
        //查找数据 找当前页数据
        dispatch('findAll', payload.queryparams) //调用findAll方法上面的方法
        //如果将来调用saveOrUpdate参数是{form:{},queryparams:queryparams}
      } else {
        Notification({
          type: 'error',
          title: '失败',
          message: '保存失败'
        })
      }
    },



  }
}