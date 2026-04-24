# 🚀 Blockchain Crowdfunding Platform

A decentralized crowdfunding application built on the Ethereum blockchain that allows users to create campaigns and contribute funds securely using cryptocurrency. The platform ensures transparency, security, and trust through smart contracts and an admin approval system.

---

## 📌 Features

* 🔐 **Wallet Authentication** using MetaMask
* 📢 **Create Campaigns** with title, description, target amount, and deadline
* 💰 **Donate to Campaigns** using ETH
* 🛡️ **Admin Approval System**

  * Campaigns are marked as *pending* initially
  * Admin can *approve* or *reject* campaigns
* 👀 **User View**

  * Only approved campaigns are visible
* ⏳ **Deadline & Target Validation**

  * Prevents expired campaigns
  * Stops donations after target is reached
* 📊 **Transparent Transactions** via blockchain
* 🔄 **Real-time Account Handling**

---

## 🏗️ Tech Stack

### Frontend (GUI)

* React.js
* Next.js
* Tailwind CSS

### Blockchain / Backend

* Solidity (Smart Contracts)
* Ethereum (Hardhat Local Network)

### Web3 Integration

* Ethers.js
* Web3Modal

### Tools & Platforms

* MetaMask (Wallet)
* Hardhat (Development & Testing)
* Remix IDE (Smart Contract Testing)
* Node.js & npm
* Git & GitHub

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/crowdfunding-dapp.git
cd crowdfunding-dapp
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start Local Blockchain

```bash
npx hardhat node
```

---

### 4️⃣ Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

👉 Copy the deployed contract address and update it in:

```
/Context/contants.js
```

---

### 5️⃣ Run the Application

```bash
npm run dev
```

👉 Open in browser:

```
http://localhost:3000
```

---

## 👨‍💼 Admin Access

* Admin is defined by a specific wallet address in the code
* ⚠️ **Note:** You must update the `ADMIN_ADDRESS` in the project with your own wallet address to run the system properly
* Only admin can:

  * Approve campaigns
  * Reject campaigns

---

## 📊 Project Workflow

1. User connects wallet
2. User creates campaign (status = pending)
3. Admin reviews and approves/rejects
4. Approved campaigns become visible to users
5. Users donate ETH
6. Donations stop when:

   * Target is reached
   * Deadline is passed

---

## 🔐 Smart Contract Validations

* Deadline must be in the future
* Donations blocked after deadline
* Donations blocked after target reached
* Secure ETH transfer using `call`

---

## 📁 Folder Structure

```
/components
/context
/contracts
/scripts
/pages
```

---

## 🎯 Future Improvements

* Refund system for failed campaigns
* Campaign progress bar
* Notifications for approvals/rejections
* Deployment on testnet (Sepolia)
* User dashboard analytics
* 📄 Option to upload **supporting documents** for campaign verification

---

## 💡 Conclusion

This project demonstrates how blockchain technology can be used to build a secure, transparent, and decentralized crowdfunding platform, eliminating the need for intermediaries and ensuring trust between users.

---

## 📸 Screenshots (Optional)

*Add your project screenshots here*

---

## 📜 License

MIT License

---


Just tell 👍
