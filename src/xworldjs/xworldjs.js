import { DiamondNFTContract } from "@/xworldjs/diamond_NFT";
import { DiamondPoolsContract } from "@/xworldjs/diamond_pools";
import { MPNFTContract } from "@/xworldjs/mp_nft";
import { MPShopContract } from "@/xworldjs/mp_shop";
import { OperatorProxyContract } from "@/xworldjs/operator_proxy";
import { UsdtContract } from "@/xworldjs/usdt";
import { IboxTokenContract } from "@/xworldjs/ibox_token";
import { getConfig } from "@/config";

class XWorldJs {
  diamondNFTContract = new DiamondNFTContract();
  diamondPoolsContract = new DiamondPoolsContract();
  mpNFTContract = new MPNFTContract();
  mpShopContract = new MPShopContract();
  operatorProxyContract = new OperatorProxyContract();
  usdtContract = new UsdtContract();
  iboxTokenContract = new IboxTokenContract();

  async initContract(web3Provider) {
    const config = getConfig();
    console.log('config::::', config)
    await this.diamondNFTContract.init(web3Provider, config.diamondcard);
    await this.diamondPoolsContract.init(web3Provider, config.diamondcardpool);
    await this.mpNFTContract.init(web3Provider, config.nft);
    await this.mpShopContract.init(web3Provider, config.shop);
    await this.operatorProxyContract.init(web3Provider, config.operator);
    await this.usdtContract.init(web3Provider, config.usdt);
    await this.iboxTokenContract.init(web3Provider, config.ibox);
  }
}

const service = new XWorldJs()

export function getXWorldService() {
  return service;
}
