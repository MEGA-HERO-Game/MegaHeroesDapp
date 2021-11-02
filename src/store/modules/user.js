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
  depositRateGratuity: 0, //存入手续费
  drawRateGratuity: 0, //提取手续费
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
  SET_DEPOSIT_RATE: (state, depositRateGratuity) => {
    state.depositRateGratuity = depositRateGratuity
  },
  SET_DRAW_RATE: (state, drawRateGratuity) => {
    state.drawRateGratuity = drawRateGratuity
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
          commit('SET_USER_INFO', response.userInfo);
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
    let toast = Toast.loading({
      message: "",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0
    });
    return new Promise((resolve, reject) => {
      userLoginApi(info.data, info.cmd).then(response => {
        toast.clear();
        if (response.code == 1 || response.code == 0) {
          let result = AES.decrypt(response.nonce);
          console.log("resultresult", result)
          let nonceNum = "";
          let address = "";
          if (result) {
            address = result.split(' ')[0];
            nonceNum = result.split(' ')[1];
          }
          commit('SET_SIGNATURE_INFO', {
            code: response.code,
            nonce: response.nonce,
            nonceNum: nonceNum,
            address: address
          });
          if (response && response.code == 0 && router.currentRoute.path !== '/profile/register') {
            router.push({ name: 'Profile' })
          } else if (response && response.code == 1) {
            dispatch('userInfoFun')
            dispatch('getGameCoin')
            dispatch('getDepositRate')
            dispatch('getDrawRate')
          }
          resolve()
        } else {
          Toast(response.message);
          reject(response.message)
        }
      }).catch(error => {
        toast.clear();
        reject(error)
      })
    })
  },
  // 获取游戏内钻石数量
  getGameCoin({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      centerApi({ nonce: state.signatureInfo.nonce }, "getGameCoin").then(response => {
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
  },
  // 存入手续费
  getDepositRate({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      centerApi({
        nonce: state.signatureInfo.nonce, sign: AES.signSecret({
          nonce: state.signatureInfo.nonce,
          cmd: "depositRate"
        })
      }, "depositRate").then(response => {
        if (response.code == 0) {
          commit('SET_DEPOSIT_RATE', response.data.gratuity);
          resolve(response)
        } else {
          Toast(response.message);
          reject(response.message)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 提取手续费
  getDrawRate({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      centerApi({
        nonce: state.signatureInfo.nonce, sign: AES.signSecret({
          nonce: state.signatureInfo.nonce,
          cmd: "drawRate"
        })
      }, "drawRate").then(response => {
        if (response.code == 0) {
          commit('SET_DRAW_RATE', response.data.gratuity);
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
