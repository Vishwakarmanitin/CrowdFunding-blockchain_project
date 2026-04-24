import React, { useContext } from "react";

// CONTEXT IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";

const Card = ({ title, allcampaign, setOpenModel, setDonateCampaign }) => {
  const { currentAccount, ADMIN_ADDRESS, approveCampaign, rejectCampaign } =
    useContext(CrowdFundingContext);

  const isAdmin =
    currentAccount?.toLowerCase() === ADMIN_ADDRESS?.toLowerCase();

  const daysLeft = (deadline) => {
    const deadlineTime = Number(deadline);
    if (!deadlineTime) return "0";

    const difference = deadlineTime - Date.now();
    if (difference <= 0) return "0";

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <p className="py-16 text-2xl font-bold leading-5">{title}</p>

      <div className="grid gap-10 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allcampaign?.map((campaign, i) => {
          
          // ✅ ONLY APPROVED CAMPAIGNS CLICKABLE FOR USERS
          const isClickable = campaign.status === "approved" || isAdmin;

          return (
            <div
              key={i + 1}
              onClick={() => {
                if (!isClickable) return;
                setDonateCampaign(campaign);
                setOpenModel(true);
              }}
              className={`overflow-hidden transition-shadow duration-300 bg-white rounded 
              ${isClickable ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
            >
              <img
                src="https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg"
                className="object-cover w-full h-64 rounded"
                alt=""
              />

              <div className="py-5 pl-2">
                <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                  Days Left: {daysLeft(campaign.deadline)}
                </p>

                <p className="text-2xl font-bold leading-5">
                  {campaign.title}
                </p>

                <p className="mb-4 text-gray-700">
                  {campaign.description}
                </p>

                <div className="flex space-x-4">
                  <p className="font-semibold">
                    Target: {campaign.target} ETH
                  </p>

                  <p className="font-semibold">
                    Raised: {campaign.amountCollected} ETH
                  </p>
                </div>

                {/* ✅ ADMIN CONTROLS (ONLY FOR PENDING) */}
                {isAdmin && campaign.status === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        approveCampaign(campaign.pId);
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        rejectCampaign(campaign.pId);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* ✅ STATUS */} /
                <p className="mt-2 text-sm">
                Status:{" "}
                {campaign.deadline < Date.now() ? (
                  <span className="text-gray-500">Expired</span>
                ) : campaign.status === "approved" ? (
                  <span className="text-green-600">Approved</span>
                ) : campaign.status === "pending" ? (
                  <span className="text-yellow-600">Pending</span>
                ) : (
                  <span className="text-red-600">Rejected</span>
                )}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;