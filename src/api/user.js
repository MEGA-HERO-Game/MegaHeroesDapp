import request from '@/utils/request'
import { baseUrl, apiUrl } from '@/utils/env'
import Qs from 'qs'
/**
 *  获取nonce并返回该钱包是否已经是注册账户
 */
export function userLoginApi(data, cmd) {
    return request({
        baseURL: baseUrl,
        url: `/userLogin?cmd=${cmd}`,
        method: 'post',
        data: Qs.stringify(data)
    })
}

/**
 *  获取游戏内钻石数量
 */
export function centerApi(data, cmd) {
    return request({
        baseURL: baseUrl,
        url: `/center?cmd=${cmd}`,
        method: 'post',
        data: Qs.stringify(data)
    })
}

/**
 *  获取游戏激活状态
 */
export function userGameApi(data, cmd) {
    return request({
        baseURL: baseUrl,
        url: `/userGame?cmd=${cmd}`,
        method: 'post',
        data: Qs.stringify(data)
    })
}

/**
 *  获取游戏metadata
 */
export function metadataApi(data) {
    return request({
        baseURL: apiUrl,
        url: `/megaheroes/metadata/get?tokenId=${data.tokenId}&assetType=${data.assetType}`,
        method: 'get'
    })
}










// old
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