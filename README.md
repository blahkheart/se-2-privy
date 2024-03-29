# 🏗 Scaffold-ETH 2 x Privy

### Get started using [privy](https://docs.privy.io/) embedded wallets in your builds using this starter kit. Easily onboard new users using email or social login to create an embedded wallet for your users.
![Login modal](https://github.com/blahkheart/se-2-privy/blob/main/packages/nextjs/public/assets/se-2-privy-2.png?raw=true)

## Get information on the connected user from the `user` object

![Dashboard](packages\nextjs\public\assets\se-2-privy.png)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/blahkheart/se-2-privy.git
cd se-2-privy
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Use the `usePrivyEthersProvider()` hook in `packages/nextjs/hooks/scaffold-eth` to access `privyEthersProvider`. You can interact with your smart contract and send transactions, or sign messages for the embedded wallet using `privyEthersProvider`.
Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your deployment scripts in `packages/hardhat/deploy`
- Edit your frontend in `packages/nextjs/pages`
- Get App ID from [privy console](https://docs.privy.io/) and enter it in your .env in `packages/nextjs/.env.local`
- Configure Privy Provider in `packages/nextjs/pages/_app.tsx`

## Scaffold-ETH 2 Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
