import request from '@/utils/request'

/**
 *  注册登录  编辑用户信息
 */
export function userInterfaceApi(data) {
    return request({
        url: '/mh_official/user/interface',
        method: 'post',
        data: data
    })
}

/**
 *  报名激活  获取用户报名抽签状态
 */
export function drawInterfaceApi(data) {
    return request({
        url: '/mh_official/draw/interface',
        method: 'post',
        data: data
    })
}

/**
 *  充值
 */
 export function purchaseInterfaceApi(data) {
    return request({
        url: '/mh_official/purchase/interface',
        method: 'post',
        data: data
    })
}

/**
 *  获取背包资产
 */
 export function assetInterfaceApi(data) {
    return request({
        url: '/mh_official/asset/interface',
        method: 'post',
        data: data
    })
}