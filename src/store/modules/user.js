// import Bus from '@/utils/bus'
import { userLoginApi, centerApi } from "@/api/user";
import router from '@/router'
import AES from '@/utils/AES.js'
import { Toast } from 'vant';

const state = {
  account: '',
  accountInfo: {}, //用户信息
  signatureInfo: {}, //签名信息
  gamecoin: 0, //获取游戏内钻石数量
}

const mutations = {
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_USER_INFO: (state, accountInfo) => {
    state.accountInfo = accountInfo
  },
  SET_SIGNATURE_INFO: (state, signatureInfo) => {
    state.signatureInfo = signatureInfo
  },
  SET_GAME_COIN: (state, gamecoin) => {
    state.gamecoin = gamecoin
  },
}

const actions = {
  // user login
  setAccount({ commit, dispatch }, account) {
    return new Promise((resolve, reject) => {
      commit('SET_ACCOUNT', account)
      // Bus.$emit("CHANGEACCOUNT", account);
      if (account) {
        dispatch('userLoginFun', {
          cmd: "getNonce",
          data: {
            address: account
          }
        })
      } else {
        commit('SET_USER_INFO', {});
        commit('SET_SIGNATURE_INFO', {});
      }
      resolve()
    })
  },
  userInfoFun({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      userLoginApi({ nonce: state.signatureInfo.nonce }, 'getUserInfo').then(response => {
        if (response.code == 1 || response.code == 0) {
          commit('SET_USER_INFO', JSON.parse(response.userInfo));
          if (response && response.code == 1 && router.currentRoute.path !== '/profile/register') {
            router.push({ name: 'Profile' })
          }
          resolve()
        } else {
          Toast(response.message);
          reject(response.message)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  userLoginFun({ commit, dispatch }, info) {
    return new Promise((resolve, reject) => {
      userLoginApi(info.data, info.cmd).then(response => {
        if (response.code == 1 || response.code == 0) {
          let result = AES.decrypt(response.nonce);
          let nonceNum = "";
          let address = "";
          if (result) {
            address = result.split(' ')[0];
            nonceNum = result.split(' ')[1];
          }
          commit('SET_SIGNATURE_INFO', {
            nonce: response.nonce,
            nonceNum: nonceNum,
            address: address
          });
          if (response && response.code == 0 && router.currentRoute.path !== '/profile/register') {
            router.push({ name: 'Profile' })
          } else {
            dispatch('userInfoFun')
            dispatch('getGameCenter', {
              cmd: "getGameCoin",
              data: {
                account: info.data.address
              }
            })
          }
          resolve()
        } else {
          Toast(response.message);
          reject(response.message)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGameCenter({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      centerApi(info.data, info.cmd).then(response => {
        if (response.code == 0) {
          commit('SET_GAME_COIN', response.data.gamecoin);
          resolve(response)
        } else {
          Toast(response.message);
          reject(response.message)
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
