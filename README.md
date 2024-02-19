# 🚩 Challenge 0: 🛠️ Build a Vault

![](./packages/nextjs/public/panoramic-vault.jpg)

This challenge will help you understand the fundamentals of the ERC-4626 Tokenized Vault Standard and give you a high level overview of the flow of funds between users, a vault, and strategies.

A vault is a smart contract that accepts deposits of an underlying asset, usually an ERC-20 token. Once assets have been deposited, a vault "strategist" attempts to generate yield by executing various DeFi strategies like lending, borrowing, liquidity provision, and arbitrage. The strategy execution results in a profit or loss for the total asset of the vault. When a user withdraws assets from a vault, the user's shares are burned.

Smart Contract Programmer does a great job of explaining the vault math for how many shares are minted or burned upon deposit or withdrawal. [👀 watch now](https://www.youtube.com/watch?v=k7WNibJOBXE)

## Checkpoint 0: 📦 Environment 📚

## Checkpoint 1: ➡️ Deposit

When a user deposits an ERC-20 token like wETH into a vault, the smart contract mints "shares" to the depositor. In this challenge, we will deposit GODL token into the vault in exchange for shares of vGODL.

Now we will impliment the logic for the `deposit()` function of the smart contract that mints shares (vGODL) to the user

```
shares = (amount of token * total supply of shares) / (balance of token before deposit)
```

## Checkpoint 2: ⬅️ Withdraw

When a user wishes to withdraw assets from a vault, their shares are burned. In this challenge, shares of vGODL are burned in exchange for the underlying GODL token

Now we will impliment the logic for the `withdraw()` function of the smart contract that burns shares (vGODL) and sends assets (GODL) to the user

```
amount = (shares * balance of token before deposit) / (total supply of shares)
```

## Checkpoint 3: 🕹️ Play With The Frontend

1. Connect wallet and navigate to the "Vault Playground" page of the frontend
2. Click the "GODL Faucet" button to mint 100 GODL tokens
3. Deposit 100 GODL tokens into the ⚡ Turbo GODL Maximizer vault to receive 100 shares of vGODL
4. Play the role of strategist by executing the 💦 Provide Liquidity strategy ( which boosts the total assets inside the vault by 50% )
5. Withdraw 150 GODL from the vault by burning your 100 shares of vGODL

### Additional Learning Resources

- [ethereum.org ERC-4626 Page](https://ethereum.org/developers/docs/standards/tokens/erc-4626)
- [OpenZeppelin ERC-4626 Security Concerns](https://docs.openzeppelin.com/contracts/4.x/erc4626)
- [Smart Contract Programmer Vault Math](https://www.youtube.com/watch?v=k7WNibJOBXE)
- [Smart Contract Programmer Vault Contract](https://www.youtube.com/watch?v=HHoa0c3AOqo)
- [Block Explorer ERC4626 Contract Tutorial](https://www.youtube.com/watch?v=ftfsCxG1560)
