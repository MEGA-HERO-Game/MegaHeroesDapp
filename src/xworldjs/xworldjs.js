import { DiamondNFTContract } from "@/xworldjs/diamond_NFT";
import { DiamondPoolsContract } from "@/xworldjs/diamond_pools";
import { MPNFTContract } from "@/xworldjs/mp_nft";
import { MPShopContract } from "@/xworldjs/mp_shop";
import { OperatorProxyContract } from "@/xworldjs/operator_proxy";
import { UsdtContract } from "@/xworldjs/usdt";
import { getConfig } from "@/config";

class XWorldJs {
  diamondNFTContract = new DiamondNFTContract();
  diamondPoolsContract = new DiamondPoolsContract();
  mpNFTContract = new MPNFTContract();
  mpShopContract = new MPShopContract();
  operatorProxyContract = new OperatorProxyContract();
  usdtContract = new UsdtContract();

  async initContract(web3Provider) {
    const config = getConfig();
    console.log('config::::', config)
    this.diamondNFTContract.init(web3Provider, config.diamondcard);
    this.diamondPoolsContract.init(web3Provider, config.diamondcardpool);
    this.mpNFTContract.init(web3Provider, config.nft);
    this.mpShopContract.init(web3Provider, config.shop);
    this.operatorProxyContract.init(web3Provider, config.operator);
    this.usdtContract.init(web3Provider, config.usdt);
  }
}

const service = new XWorldJs()

export function getXWorldService() {
  return service;
}
