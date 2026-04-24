import React, { useState, useContext, useEffect } from "react";

// CONTEXT
import { CrowdFundingContext } from "../Context/CrowdFunding";

const Hero = ({ titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });

  const {
    currentAccount,
    connectWallet,
    disconnectWallet,
  } = useContext(CrowdFundingContext);

  // ✅ AUTO UPDATE WHEN ACCOUNT CHANGES
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        window.location.reload();
      });
    }
  }, []);

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(campaign);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <span className="coverLine"></span>

      

      <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />

      <div className="relative bg-opacity-75 backgroundMain">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 162 556 141C676
            120 796 66 916 39.7C1036 13 1156 13 1216 13L1276 13V163H1216C1156 163 1036
            163 916 163C796 163 676 163 556 163C436 163 316 163 196 163C76 163 -44 163 -104 163H-164V13Z"
          />
        </svg>

        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl 
        md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-24 lg:px-8 lg:py-20">
          
          <div className="flex flex-col items-center justify-between xl:flex-row">
            
            {/* LEFT TEXT */}
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                Cryptocurrency <br className="hidden md:block" />
                Crowd Funding App
              </h2>

              <p className="max-w-xl mb-4 text-base text-gray-500 md:text-lg">
                A crowdfunding platform built on the Ethereum blockchain, 
                allowing users to create and contribute to campaigns using cryptocurrency.
              </p>
            </div>

            {/* FORM */}
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Campaign
                </h3>

                <form>
                  {/* TITLE */}
                  <input
                    onChange={(e) =>
                      setCampaign({ ...campaign, title: e.target.value })
                    }
                    placeholder="Title"
                    required
                    className="w-full h-12 px-4 mb-2 border rounded"
                  />

                  {/* DESC */}
                  <input
                    onChange={(e) =>
                      setCampaign({ ...campaign, description: e.target.value })
                    }
                    placeholder="Description"
                    required
                    className="w-full h-12 px-4 mb-2 border rounded"
                  />

                  {/* AMOUNT */}
                  <input
                    onChange={(e) =>
                      setCampaign({ ...campaign, amount: e.target.value })
                    }
                    placeholder="Amount (ETH)"
                    type="number"
                    required
                    className="w-full h-12 px-4 mb-2 border rounded"
                  />

                  {/* DEADLINE */}
                  <input
                    onChange={(e) =>
                      setCampaign({ ...campaign, deadline: e.target.value })
                    }
                    type="date"
                    required
                    className="w-full h-12 px-4 mb-2 border rounded"
                  />

                  {/* SUBMIT */}
                  <button
                    onClick={(e) => createNewCampaign(e)}
                    className="w-full h-12 bg-purple-500 text-white rounded mt-3"
                  >
                    Create Campaign
                  </button>

                  <p className="text-xs text-gray-600 mt-2">
                    Create your campaign and start raising funds.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;