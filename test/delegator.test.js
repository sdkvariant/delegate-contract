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

  const holders = {
    sUSD: '0xEb3107117FEAd7de89Cd14D463D340A2E6917769', // Synthetix protocolDAO
    DAI: '0x0B30483057D6A7798378EdbA707d625116Ed7640',
  };

  describe("Delegator", function() {
    // Contracts
    let delegator, token;
  
    // Users
    let deployer, someone;
    let lender, borrower;
  
    // Used to compare values
    const tokenBalance = {};
    const collateralETH = {};
    const availableBorrowsETH = {};
    const totalDebtETH = {};
  
    const connectDelegatorWith = (signer) => {
      delegator = delegator.connect(signer);
    };
  
    const connectTokenWith = (signer) => {
      token = token.connect(signer);
    };

    describe('when deploying a Delegator contract', () => {
        before('get lender and borrower', async () => {
          ([deployer, lender, borrower, someone] = await ethers.getSigners());
        });
    
        before('deploy the Delegator contract', async () => {
          const Delegator = await ethers.getContractFactory('Delegator');
          delegator = await Delegator.deploy(lender.address, borrower.address);
    
          await delegator.deployed();
        });
    
        it('uses the expected Aave addresses', async () => {
          expect(await delegator.lendingPool()).to.be.equal(addresses.lendingPool);
          expect(await delegator.dataProvider()).to.be.equal(addresses.dataProvider);
        });
    
        it('properly assigned lender and borrower', async () => {
          expect(await delegator.lender()).to.be.equal(lender.address);
          expect(await delegator.borrower()).to.be.equal(borrower.address);
        });