//导入
import { queryFindAll, detailShou, saveOrUpdate, detailsShouById } from '@/api/waiter.js'
import { queryFindById } from '@/api/order.js';
import { Notification } from 'element-ui';

export default {
  namespaced: true,
  state: {
    totalData: {},
    detailData: {},
    orderData: [],
    ShowDetailData: [],
  },
  getters: {
    //员工的
    total: state => state.totalData.total,
    waiterData: state => state.totalData.list,
    //提现的
    detailTotal: state => state.detailData.total,
    detailShowData: state => state.detailData.list,
  },
  mutations: {
    changetotalData(state, data) {
      state.totalData = data;
    },
    changedetailData(state, data) {
      state.detailData = data;
    }, changeOrderData(state, data) {
      state.orderData = data
    },
    changeShowDetailData(state, data) {
      state.ShowDetailData = data
    }
  },
  actions: {
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
    //提现
    async detailShou({ commit }, payload) {
      let res = await detailShou(payload)
      commit('changedetailData', res.data)
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
    },
    //通过员工id查找订单
    async queryFindById({ commit }, payload) {
      let res = await queryFindById(payload)
      commit('changeOrderData', res.data)
    },

    //通过员工id查找收益
    async detailsShouById({ commit }, payload) {
      let res = await detailsShouById(payload)
      commit('changeShowDetailData', res.data)
    }
  }
}