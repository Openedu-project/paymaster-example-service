# Coinbase Paymaster Service

This application uses viem and viem's Account Abstraction extension [viem-aa](https://viem.sh/account-abstraction) to create a [ERC-4337](https://www.erc4337.io/) smart contract account and send a sponsored transaction.

We'll be minting an NFT on Base Sepolia using Coinbase Developer Platform's Paymaster & Bundler.

## Project Setup

### 1. Clone the repository

```
git clone <repository-url>
cd coinbase-paymaster-service
```

### 2. Configure environment

Create an `.env` file from the `.env.example` template:

```
cp .env.example .env
```

Update the `.env` file with the following information:
- `PAYMASTER_RPC_URL`: Coinbase Paymaster service RPC URL
- `PRIVATE_KEY`: Wallet private key (without 0x prefix)
- `NFT_CONTRACT_ADDRESS`: NFT contract address (default: 0x0f61205637D02A0799d981A4d9547751a74fB9fC)

### 3. Install dependencies

```
pnpm install
```

### 4. Run commands

#### Check account information

```
pnpm account
```

This command will create a smart contract account from your private key and display the address along with minter permissions.

#### Mint NFT

```
pnpm mint
```

This command will mint an NFT on the Base Sepolia network with transaction fees sponsored by Coinbase Paymaster.

## Important Notes

### Contract Information
The NFT contract address used in this project is `0x0f61205637D02A0799d981A4d9547751a74fB9fC` on Base Sepolia.

### Role Permission Requirements
The Account Abstraction (AA) address must have the appropriate role in the NFT contract to mint NFTs. The application checks this using the `hasRole` function to verify the account has the MINTER_ROLE.

When you run `pnpm account`, it will check and display whether your AA address has the minter role:
```
isMinter: true/false
```

If the result is `false`, you need to have an admin of the NFT contract grant the MINTER_ROLE to your AA address before you can mint. This can typically be done via:
1. Identifying the contract admin
2. Calling the `grantRole` function with the MINTER_ROLE and your AA address

### Paymaster Requirements
For the Coinbase Paymaster to sponsor transactions, both your contract address and the method being called must be included in the Paymaster's allowlist. The current implementation is configured to call the `mint` method of the NFT contract.

To use this with your own contracts:
1. Ensure your contract and methods are added to the Coinbase Paymaster allowlist
2. Update the contract address and method calls in the code as needed
3. Make sure your AA address has the appropriate role permissions in the contract

## Technical Requirements

- Node.js version 18+
- pnpm

## Technologies Used

- [viem](https://viem.sh/) - Ethereum library for blockchain interactions
- [viem-aa](https://viem.sh/account-abstraction) - viem's Account Abstraction extension
- [ERC-4337](https://www.erc4337.io/) - Account Abstraction standard
- Base Sepolia testnet
