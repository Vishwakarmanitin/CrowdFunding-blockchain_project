import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import { crowdFundingABI, crowdFundingAddress } from "@/Context/contants";

// ADMIN
const ADMIN_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(crowdFundingAddress, crowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";
  const [currentAccount, setCurrentAccount] = useState("");

  // CONNECT WALLET
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
  };

  // DISCONNECT (UI ONLY)
  const disconnectWallet = () => {
    setCurrentAccount("");
  };

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return;

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) setCurrentAccount(accounts[0]);
  };

  useEffect(() => {
    checkIfWalletConnected();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setCurrentAccount(accounts[0] || "");
      });
    }
  }, []);

  // ✅ CREATE CAMPAIGN (FIXED)
  const createCampaign = async (campaign) => {
  const { title, description, deadline, amount } = campaign;

  // ✅ DATE VALIDATION
  if (new Date(deadline).getTime() <= Date.now()) {
    alert("Deadline must be a future date");
    return;
  }

  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = fetchContract(signer);

  try {
    const tx = await contract.createCampaign(
      currentAccount,
      title,
      description,
      ethers.utils.parseEther(amount),
      new Date(deadline).getTime()
    );

    await tx.wait();

    const campaigns = await contract.getCampaigns();
    const newId = campaigns.length - 1;

    const approvals = JSON.parse(localStorage.getItem("approvals")) || {};
    approvals[newId] = "pending";

    localStorage.setItem("approvals", JSON.stringify(approvals));

    window.location.reload();
  } catch (error) {
    console.log("Error creating campaign:", error);
  }
};

  // GET CAMPAIGNS
  const getCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const contract = fetchContract(provider);

    const campaigns = await contract.getCampaigns();
    const approvals = JSON.parse(localStorage.getItem("approvals")) || {};

    return campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target),
      deadline: Number(campaign.deadline),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      pId: i,
      status: approvals[i] || "pending",
    }));
  };

  // APPROVE
  const approveCampaign = (id) => {
    if (currentAccount.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
      alert("Not Admin");
      return;
    }

    const approvals = JSON.parse(localStorage.getItem("approvals")) || {};
    approvals[id] = "approved";

    localStorage.setItem("approvals", JSON.stringify(approvals));
    window.location.reload();
  };

  // REJECT
  const rejectCampaign = (id) => {
    if (currentAccount.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
      alert("Not Admin");
      return;
    }

    const approvals = JSON.parse(localStorage.getItem("approvals")) || {};
    approvals[id] = "rejected";

    localStorage.setItem("approvals", JSON.stringify(approvals));
    window.location.reload();
  };

  // USER CAMPAIGNS
  const getUserCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const contract = fetchContract(provider);

    const allCampaigns = await contract.getCampaigns();
    const approvals = JSON.parse(localStorage.getItem("approvals")) || {};

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const currentUser = accounts[0];

    return allCampaigns
      .map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target),
        deadline: Number(campaign.deadline),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
        status: approvals[i] || "pending",
      }))
      .filter(
        (campaign) =>
          campaign.owner.toLowerCase() === currentUser.toLowerCase()
      );
  };

  // DONATE
  const donate = async (pId, amount) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const tx = await contract.donateToCampaign(pId, {
      value: ethers.utils.parseEther(amount),
    });

    await tx.wait();
    window.location.reload();

    return tx;
  };

  // GET DONATIONS
  const getDonations = async (pId) => {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const contract = fetchContract(provider);

    const donations = await contract.getDonators(pId);

    return donations[0].map((donator, i) => ({
      donator,
      donation: ethers.utils.formatEther(
        donations[1][i].toString()
      ),
    }));
  };

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        connectWallet,
        disconnectWallet,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        approveCampaign,
        rejectCampaign,
        ADMIN_ADDRESS,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};