// import Bus from '@/utils/bus'
import { userInterfaceApi } from "@/api/user";
import router from '@/router'

const state = {
  account: '',
  accountInfo: {}
}

const mutations = {
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_USER_INFO: (state, accountInfo) => {
    state.accountInfo = accountInfo
  },
}

const actions = {
  // user login
  setAccount({ commit, dispatch }, account) {
    return new Promise((resolve, reject) => {
      commit('SET_ACCOUNT', account)
      // Bus.$emit("CHANGEACCOUNT", account);
      if(account){
        dispatch('userInfoFun', {
          cmd: "USER_LOGIN",
          requestTime: (new Date()).valueOf(),
          loginType: "1",
          loginName: account
        })
      }else{
        commit('SET_USER_INFO', {});
      }
      resolve()
    })
  },
  userInfoFun({ commit }, info) {
    return new Promise((resolve, reject) => {
      userInterfaceApi(info).then(response => {
        if (response.code == 1) {
          commit('SET_USER_INFO', response.info);
          if(response && response.info && !response.info.email &&  router.currentRoute.path !== '/profile/register'){
            router.push({name: 'Profile'})
          }
          resolve()
        } else {
          reject(response.errorMessage)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
