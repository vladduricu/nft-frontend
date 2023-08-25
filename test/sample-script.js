const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
    it("Should mint and transfer NFT to someone", async function () {
        const NFT = await ethers.getContractFactory("NftGuys");
        const nft = await NFT.deploy();
        await nft.deployed();

        const recipient = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

        const metadataURI = "out/0.png";

        let balance = await nft.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await nft.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

        // wait until the transaction is mined
        await newlyMintedToken.wait();
        
        balance = await nft.balanceOf(recipient)

        const ownedNFTs = await nft.getUserNFTs(recipient);

        expect(ownedNFTs).to.include(metadataURI);
        expect(balance).to.equal(1);

        expect(await nft.isContentOwned(metadataURI)).to.equal(true);
        const newlyMintedToken2 = await nft.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
    });
});
