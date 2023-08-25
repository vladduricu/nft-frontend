import { ethers } from "ethers";
import WalletBalance from "./WalletBallance";
import { useEffect, useState } from "react";

import NftGuys from "../artifacts/contracts/Nft.sol/NftGuys.json";

const nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(nftAddress, NftGuys.abi, signer);

function Home() {

    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = await contract.count();
        setTotalMinted(parseInt(count));
    }

    return (
        <div>
            <WalletBalance />
            <button className="btn btn-primary" onClick={() => getMintedURI()}>Get minted urls</button>
            <div className="container">
                <div className="row">
                    {Array(totalMinted + 1)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="col-sm nft-image">
                                <NFTImage tokenId={i} getCount={getCount} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )

}

function NFTImage({ tokenId, getCount }) {
    const contentId = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    const metadataURI = `${contentId}/${tokenId}.json`;
    //   const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
    const imageURI = `img/${tokenId}.png`;

    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
        getMintedStatus();
    }, [isMinted]);

    const getMintedStatus = async () => {
        const result = await contract.isContentOwned(metadataURI);
        console.log(result)
        setIsMinted(result);
    };

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        const result = await contract.payToMint(addr, metadataURI, {
            value: ethers.utils.parseEther('0.05'),
        });

        await result.wait();
        getMintedStatus();
        getCount();
    };

    async function getURI() {
        const uri = await contract.tokenURI(tokenId);
        alert(uri);
    }
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
            <div className="card-body">
                <h5 className="card-title">ID #{tokenId}</h5>
                {!isMinted ? (
                    <button className="btn btn-primary" onClick={mintToken}>
                        Mint
                    </button>
                ) : (
                    <button className="btn btn-dark" onClick={getURI}>
                        Taken! Show URI
                    </button>
                )}
            </div>
        </div>
    );
}

export default Home;