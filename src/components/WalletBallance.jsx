import { useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
    const [balance, setBalance] = useState(0);


    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    };

    return (
        <nav className="navbar bg-dark"  data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">NFT Guys</span>
                <span className="navbar-text float-end">Your Balance {balance}</span>
                <button className="btn btn-outline-primary float-end" onClick={() => getBalance()}>Show My Balance</button>

            </div>
        </nav>
    )
}

export default WalletBalance;