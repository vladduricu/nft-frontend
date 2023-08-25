// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NftGuys is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(string => uint8) existingURIs;
    mapping(address => uint256) userHasNFT;
    mapping(address => string[]) userNFTs;

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    constructor() ERC721("NftGuys", "FYR") {}

    /**
     * Returns the base url of the interplanetary file system where the metadata is stored
     */
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        existingURIs[uri] = 1;
        userHasNFT[to] = 1;
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * Checks if the content is already owned by someone in order to avoid duplicates
     * @param uri The content URI
     */
    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function getUserNFTs(address user) public view returns (string[] memory ) {
        require((userHasNFT[user] == 1), "User has no NFTs!");
        return userNFTs[user];
    }

    function payToMint(
        address recipient,
        string memory metadataURI
    ) public payable returns (uint256) {
        require(existingURIs[metadataURI] != 1, "NFT already minted!");
        require(msg.value >= 0.05 ether, "Need to pay up!");

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;
        userNFTs[recipient].push(metadataURI);
        userHasNFT[recipient] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    /**
     * Returns the current count of minted NFTs in the contract
     */
    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
