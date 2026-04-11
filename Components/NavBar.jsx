import React, { useState, useContext } from "react";

// INTERNAL IMPORT
import { CrowdFundingContext } from "@/Context/CrowdFunding";

const NavBar = () => {
  const { currentAccount, connectWallet, ADMIN_ADDRESS } =
    useContext(CrowdFundingContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin =
    currentAccount?.toLowerCase() === ADMIN_ADDRESS?.toLowerCase();

  const menuList = ["Home"];

  return (
    <div className="bg-black w-full">
      <div className="px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <h1 className="text-white text-xl font-bold uppercase tracking-wide">
            CrowdFunding
          </h1>

          <ul className="hidden lg:flex items-center gap-8">
            {menuList.map((item, i) => (
              <li key={i}>
                <a
                  href="/"
                  className="text-gray-300 hover:text-purple-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* ✅ If NOT connected */}
          {!currentAccount && (
            <button
              onClick={connectWallet}
              className="px-6 py-2 text-white font-medium rounded-md 
              bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:from-purple-700 hover:to-indigo-700 transition"
            >
              Connect Wallet
            </button>
          )}

          {/* ✅ If connected */}
          {currentAccount && (
            <div className="flex items-center gap-3">
              
              {/* Wallet Address */}
              <span className="px-4 py-2 bg-gray-800 text-white rounded">
                {currentAccount.slice(0, 6)}...
                {currentAccount.slice(-4)}
              </span>

              {/* Admin Badge */}
              {isAdmin && (
                <span className="text-yellow-400 font-bold">
                  👑 Admin
                </span>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(true)}>☰</button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="bg-white px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-lg">Menu</h1>
            <button onClick={() => setIsMenuOpen(false)}>✖</button>
          </div>

          <ul className="space-y-4">
            {menuList.map((item, i) => (
              <li key={i}>
                <a href="/" className="text-gray-700 hover:text-purple-500">
                  {item}
                </a>
              </li>
            ))}

            {!currentAccount && (
              <li>
                <button
                  onClick={connectWallet}
                  className="w-full bg-purple-600 text-white py-2 rounded"
                >
                  Connect Wallet
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;