const { expect } = require('chai');
const  keccak256  = require('keccak256');
const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const { Contract } = require('ethers');
/* 
import keccak256 from "keccak256";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { Contract } from "ethers";
*/

describe("MerkleTreeAuth", function () {
    
    let tree ;
    let MtaContract;
    let leavesSigner;

    const getAccounts = async () => {
        const accounts = await ethers.getSigners();
        
        return [
            accounts[0].address,
            accounts[1].address,
        ];
    }

    const getLeafNodes = ( accounts )  => {
        return accounts.map(account => keccak256(account));
    }

    const buildMerkleTree = async (accounts) => {
        const leaves = getLeafNodes(accounts);
        tree = new MerkleTree(leaves, keccak256, { sort: true });
        return tree.getHexRoot();
    }


    it("Should deploy the MerkleTreeAuth contract", async () => {
        const accounts = await getAccounts();
        const rootTree = await buildMerkleTree(accounts);

        const MtaFactory = await ethers.getContractFactory('MerkleTreeAuth');
        MtaContract = await MtaFactory.deploy(rootTree);
        console.log("contract = " ,MtaContract.address);
        await MtaContract.deployed();

        
    });

    describe("Auth", async () => {
        it("Should authentificate a good account", async () => {
            leavesSigner = getLeafNodes((await ethers.getSigners()).map(account => account.address));
            const goodAccount = leavesSigner[0];
            const proofGood = tree.getHexProof(goodAccount);
            await expect(await MtaContract.connect(await ethers.getSigner(0)).isAuthorized(proofGood)).to.be.true;
        });

        it("Shouldn't authentificate a bad account", async () => {
            const badAccount = leavesSigner[2];
            const proofBad = tree.getHexProof(badAccount);
            await expect(await MtaContract.connect(await ethers.getSigner(2)).isAuthorized(proofBad)).to.be.false;
        });
    });
});
