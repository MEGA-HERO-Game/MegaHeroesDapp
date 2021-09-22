import contract from '@truffle/contract';
import USDT_ABI from '@/contracts/IIERC20.json';
import Web3 from "web3";
import { getUsdtPointNumber } from "../config";
export class UsdtContract {
  async init(provider, tokenAddress) {


    const ccc = contract(USDT_ABI);
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }

  async approve(amount, to, from) {
    console.log('approve:::', { to, amount })
    await this.contract.approve(to, Web3.utils.toBN(amount), { from: from })
  }

  async allowance(owner, to) {
    console.log('allowance:::', { owner, to })
    return (await this.contract.allowance(owner, to)) / parseInt(getUsdtPointNumber())
  }

}
