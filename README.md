# NTT Simple Marketplace

## Description
This project is just for tutorial purposes. It is a frontend for a NFT marketplace using a simple contract which allows users to mint NFTs and sell them. This is based on the tutorial from fireship.io on how to generate an NFT marketplace

## Project setup
Before running the project you need to install the dependencies using the following command in the root directory:
```bash
npm install
```

One more step before running the project is generating the NFTs metadata. For this you need to use the other project `https://github.com/vladduricu/nft3` and follow the instructions from there. After you have the metadata generated you need to copy the `out` folder from that project to the `img` folder of this project or you can push the images to the IPFS and use the IPFS links in the `img` folder. 

Pushing images to the IPFS can be done using Pinata. You can find more information about Pinata here: `https://pinata.cloud/`

IPFS links are in the following format: `https://ipfs.io/ipfs/<ipfs_hash>`;


## Running the project
For running the project on your machine you need to have also Metamask installed in your browser. You can find more information about Metamask here: `https://metamask.io/`; and add the local blockchain metwork to Metamask. You can find more information about adding a custom network to Metamask here: `https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-Network-RPC-and-or-Block-Explorer`. Add also one of the accounts from the local blockchain network to Metamask. You can find the private keys for the accounts in the output of the `npx hardhat node` command.

To run the project you need to use the following commands in the root directory:

1. Start the local blockchain network. This will create a local blockchain network with 20 accounts with 10000 ETH each. You can use these accounts to test the project.
```bash
npx hardhat node
```

2. Compile the contracts. This will compile the contracts and generate the artifacts in the `artifacts` folder.
```bash
npx hardhat compile
```

3. Deploy the contracts. This will deploy the contracts on the local blockchain network.
```bash
npx hardhat run .\scripts\sample-script.js --network localhost
```

4. Copy the contract address from the console and paste it in the `src\components\Home.jsx` file in the `contentId` field.

5. Start the project. This will start the project on `http://localhost:5173/`.
```bash
npm run start
```

## Testing the contracts
For testing the contracts you need to use the following commands in the root directory:
```bash
npx hardhat test
```

