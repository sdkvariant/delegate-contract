const { expect } = require("chai");
const {
  takeSnapshot,
  restoreSnapshot,
  impersonateAddress,
} = require('./utils/RPC');

// Mainnet
const addresses = {
    lendingPool: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
    dataProvider: '0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    sUSD: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  };