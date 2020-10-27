// 导入api内的方法或者axios 
import { findAll, saveOrUpdate, findCustomerById } from '@/api/customer.js';
import { findByCustomerId as findAddressById } from '@/api/address.js';
import { queryFindById as findOrderById } from '@/api/order.js'
import { Notification } from 'element-ui';
// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,
  state: {
    //获取顾客信息的时候后台总数据
    totalData: {},
    //顾客地址信息
    addressData: [],
    customerData: [],
    orderData: [],
  },
  getters: {
    //总条数
    total: state => state.totalData.total,
    //每页的顾客信息
    customerData: state => state.totalData.list
  },
  mutations: {
    changeTotalData(state, data) {
      state.totalData = data;
    },
    changeAddressData(state, data) {
      state.addressData = data;
    },
    changeCustomerData(state, data) {
      state.customerData = data;
    },
    changeOrderData(state, data) {
      state.orderData = data;
    }
  },
  actions: {
    /** 
     * 查找顾客信息
    */
    //都是异步
    //提交突变，改变state中的数据
    findAll({ commit }, payload) {
      //根源上解决问题
      //页码超了范围处理一下 

      findAll(payload).then(res => {
        //数据处理  payload.page,payload.pageSize,res.data.total
        let max = Math.ceil(res.data.total / payload.pageSize);
        if (payload.page > max && max != 0) {
          payload.page = max;
          findAll(payload).then(res => {
            commit('changeTotalData', res.data) //更改status中的数据
          })
        } else {
          commit('changeTotalData', res.data) //更改status中的数据
        }
      })
    },
    /** 
     * 新增或修改顾客信息
    */
    //分发动作 当获取到后台的数据之后还要再分发findAll动作，以此来更新数据显示出来
    async saveOrUpdate({ dispatch }, payload) {
      //接受数据，发送请求，请求成功提示用户保存成功，处理page，分发findAll动作
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
    /** 
     * 通过id删除
    */
    // async deleteById({ dispatch }, payload) {
    //   let res = await deleteById({ id: payload.id });
    //   console.log(res.status);
    //   if (res.status === 200) {
    //     Notification({ //element-ui中的方法，用于提示数据是否成功
    //       type: 'success',
    //       title: '成功',
    //       message: '删除成功'
    //     })
    //     //查找数据 找当前页数据
    //     dispatch('findAll', payload.queryparams) //调用findAll方法上面的方法
    //     //如果将来调用saveOrUpdate参数是{form:{},queryparams:queryparams}
    //   } else {
    //     Notification({
    //       type: 'error',
    //       title: '失败',
    //       message: '删除失败'
    //     })
    //   }
    // },
    /** 
     * 通过id查找地址
    */
    async findAddressById({ commit }, payload) {
      //通过顾客id找地址信息
      let res = await findAddressById(payload);
      //保存数据到仓库

      commit('changeAddressData', res.data);
    },
    /** 
     * 通过id查找顾客信息
    */
    async findCustomerById({ commit }, payload) {
      let res = await findCustomerById(payload)

      commit('changeCustomerData', res.data)
    },
    async findOrderById({ commit }, payload) {
      let res = await findOrderById(payload)
      commit('changeOrderData', res.data)
    }

  }
}