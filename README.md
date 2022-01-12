# delegate-contract
This contract allows a depositor to deposit funds in the aave protocol to earn interest, and delegate borrowing power (i.e. their credit) to other users. It utilizes aave (credit delegation) 



###### Read more about credit delegation: [Aave Credit Delegation](https://docs.aave.com/developers/guides/credit-delegation).



For example, David deposits USDT into Aave Protocol to earn interest. Since David only uses Aave Protocol to earn and not to borrow, he does not need to exercise his credit line. Instead,David delegates his credit line to Bob to earn additional interest. Once the credit line is delegated, Bob can draw the funds from a dedicated Credit Delegation Vault, a simple debt wrapper built on top of Aave Protocol. To ensure a smooth ride, David and Bob use OpenLaw to sign an agreement for the terms.

## Code sample

`depositCollateral` Transfers asset from lender to this contract

```
function depositCollateral(address asset, uint256 amount) external onlyLender {
     //
    require(
        token.balanceOf(msg.sender) >= amount,
        "Insufficient balance"
    );
```

`safeApprove` approve and deposit asset in AAVE as collateral

```
token.safeApprove(address(lendingPool), amount);
    lendingPool.deposit(
    asset,
    amount,
    address(this), // onBehalfOf
    0 // referralCode
);    
```