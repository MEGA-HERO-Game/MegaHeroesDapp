
import {runType, isTest} from './setting.json'
// export let runType = 'ht-dev'
// export let runType = 'ht-pre'
// export let runType = 'ht-main'

import Web3 from 'web3'

import configJson from '@/contracts/config.json'


// export const TIME_NUM = 0;
export const TIME_NUM = 1631116800;


if (!isTest) {
  console.log = function () {

  }
}

export function getHecoInfoErrUrl(){
  switch (runType){
    case 'ht-main':
    case 'ht-pre':
      return 'https://hecoinfo.com/tx/'
    case 'ht-test':
    case 'ht-dev':
      return 'https://testnet.hecoinfo.com/tx/'
  }
}

export function getWebServerPath() {
  let server = ''
  switch (runType) {
    //   server = "http://web.dev.xworld.pro:28080"
    //   break;
    case 'ht-dev':
    case 'ht-test':
      server = "http://web.dev.xworld.pro:28080"
      break;
    case 'ht-pre':
      server = "http://web.pre.xworld.pro:28080"
      break;
    case 'ht-main':
      server = "https://megahero.games"

      break;
  }

  return {
    webServer: server,
    upload: server + "/uploadFile",
    download: server,
    image: server + '/files/mega_picture/',
    contract: server + '/files/contract2/'
  }
}

let config = undefined

export function getConfig() {

  if (config !== undefined)
    return config

  let ccc = configJson

  switch (runType) {
    case 'ht-dev':
    case 'ht-test':
      config = ccc.ht_test
      break;
    case 'ht-pre':
    case 'ht-main':
      config = ccc.ht_main;
      break;
  }

  return config;
}

export function getRunType (){
  return runType;
}

getConfig()

function createZero (len){
  let result = '';

  for (let i = 0; i < len; i++){
    result += '0'
  }

  return result
}

export function getUsdtPoint() {
  switch (runType) {
    case 'ht-main':
    case 'ht-pre':
      return createZero(18)

    case 'ht-test':
    case 'ht-dev':
      return createZero(6)

    default:
      return createZero(0);
  }
}

export function getUsdtPointNumber() {
  switch (runType) {
    case 'ht-main':
    case 'ht-pre':
      return 1e18

    case 'ht-test':
    case 'ht-dev':
      return 1e6

    default:
      return createZero(0);
  }
}


export function getUsdtPrice (price){
  console.log('price::::::', price)
  switch (runType) {
    case 'ht-main':
    case 'ht-pre':
      return Web3.utils.toWei(price+'')

    case 'ht-test':
    case 'ht-dev':
      return price * 1e6

    default:
      return price;
  }
}
