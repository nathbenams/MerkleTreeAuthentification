# MerkleTreeAuthentification

This project is an authentification on-chain's proof-of-concept via a smart contract.
The deployed smart contract holds the MerkleTree's root, and authentificates the transaction's sender by providing a MerkleTree proof.

# Installation
You need to install these dependecies to run the project:
```console
  npm install @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers hardhat @openzeppelin/contracts dotenv keccak256 merkletreejs
```
Modify the .env-to-complete to .env and add your private key and the alchemy's URL for Rinkeby's network.

# Run
If you want to run the script locally:
```console
  npx hardhat run scripts/MTA.js
 ```
 
 If you want to deploy on Rinkeby testnet: (don't forget to get some Eth from a faucet)
 ```console
  npx hardhat run scripts/MTA.js --network rinkeby
 ```
 You can get the deployed contract's address in the console and check it on a Rinkeby scan.
 
 This project's idea is from the p2p Festival POC team's workshop.
 Thank to them !
