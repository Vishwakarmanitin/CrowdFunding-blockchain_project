import React, { useEffect, useContext, useState } from "react";

// INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp } from "../Components";

const Index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
    currentAccount,
    ADMIN_ADDRESS,
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState([]);
  const [usercampaign, setUsercampaign] = useState([]);

  // ✅ FETCH DATA (FIXED)
  useEffect(() => {
    if (!currentAccount) return; // wait for wallet

    const fetchData = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();

        const isAdmin =
          currentAccount.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

        // ✅ ADMIN → see ALL campaigns
        // ✅ USER → see ONLY approved
        const visibleCampaigns = isAdmin
          ? allData
          : allData.filter((c) => c.status === "approved" && c.deadline > Date.now() );

        setAllcampaign(visibleCampaigns);
        setUsercampaign(userData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentAccount]);

  // ✅ DONATION POPUP
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      {/* ALL CAMPAIGNS */}
      <Card
        title="All Listed Campaigns"
        allcampaign={allcampaign}
        setOpenModel={setOpenModel}
        setDonateCampaign={setDonateCampaign}
      />

      {/* USER CAMPAIGNS */}
      <Card
        title="Your Created Campaigns"
        allcampaign={usercampaign}
        setOpenModel={setOpenModel}
        setDonateCampaign={setDonateCampaign}
      />

      {/* POPUP */}
      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default Index;