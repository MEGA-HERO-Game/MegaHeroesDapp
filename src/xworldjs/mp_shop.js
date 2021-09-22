import contract from '@truffle/contract';
import MP_SHOP_ABI from '@/contracts/MPShop.json';
import { getUsdtPointNumber } from "../config";
import Web3 from "web3";


export class MPShopContract {
  async init(provider, tokenAddress) {

    // fetch('/files/contracts/MPShop.js?time=' + new Date().getTime()).then((response) => {
    //   return response.json();
    // }).then(d => {
    //   const ccc = contract(d);
    //   ccc.setProvider(provider);
    //   ccc.at(tokenAddress).then(c => {
    //     this.contract = c;
    //   });
    // });


    const ccc = contract(MP_SHOP_ABI);
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }

  async buyMP(requestId, price, account, callback) {
    const result = {}
    await this.contract.buyToken(requestId, Web3.utils.toBN(price), { from: account }).on('transactionHash', function (hash) {
      console.info('hash:::', hash)
      result.hash = hash
      if (callback) {
        callback({ hash: hash })
      }
    }).on('receipt', function () {
      // console.info('receipt::::', receipt)
    })
      .on('confirmation', function () {
        // console.info('confirmation:::', confirmationNumber, receipt)
      })
      .on('error', function (err) {
        console.error('error:::', err)
        if (callback) {
          callback({
            err: err,
            code: err.code,
            hash: result.hash
          })
        }
      })

  }

  async getOrderStatus(requestId) {
    const t = await this.contract.getOrderStatus(requestId)
    return t.toNumber();
  }

  async balanceOfUsdt(user) {
    console.log('usdt::::123', user)
    const t = await this.contract.balanceOfUsdt(user)
    console.log('usdt::::1245', t.toString())

    return (t / parseInt(getUsdtPointNumber()));
  }

  async approveUsdt(amount, to, from) {
    console.log('approveUsdt::123::', amount)
    await this.contract.approveUsdt(to, amount, { from: from })

  }

}
