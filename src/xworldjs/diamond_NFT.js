import contract from '@truffle/contract';
import DIAMOND_NFT_ABI from '@/contracts/diamondNFT.abi.json';
import { getUsdtPointNumber } from "../config";
import Web3 from "web3";


export class DiamondNFTContract {
  async init(provider, tokenAddress) {
    const ccc = contract({"abi": DIAMOND_NFT_ABI});
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }

  async buyDiamondNft(tokenid, amount, r, s, v, invitation, blockNumber, account, callback) {
    const result = {}
    await this.contract.buy(Web3.utils.toBN(tokenid), Web3.utils.toBN(amount), v, web3.utils.hexToBytes(r), web3.utils.hexToBytes(s), invitation, Web3.utils.toBN(blockNumber), {
      from:
        account
    }).on('transactionHash', function (hash) {
      console.info('hash:::', hash)
      result.hash = hash
    }).on('receipt', function () {
      if (callback) {
        callback({ hash: result.hash })
      }
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
}
