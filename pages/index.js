import React, {useEffect,useContext,useState} from "react";

//INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";
import {Hero,Card,PopUp} from "../Components";

const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState();
  const [usercampaign, setUsercampaign] = useState();

useEffect(() => {
  const fetchData = async () => {
    const allData = await getCampaigns();
    const userData = await getUserCampaigns();

     // ✅ FILTER ONLY APPROVED CAMPAIGNS
    const approvedCampaigns = allData.filter(
      (campaign) => campaign.approved === true
    );
    
    setAllcampaign(allData);
    setUsercampaign(userData);
  };

  fetchData();
}, []);

  //DONATE POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(donateCampaign);
  return(
    <>
    <Hero titleData={titleData} createCampaign={createCampaign} />
    <Card
      title="All Listed Campaigns"
      allcampaign={allcampaign}
      setOpenModel={setOpenModel}
      setDonateCampaign={setDonateCampaign}
    />
    <Card
      title="Your Created Campaigns"
      allcampaign={usercampaign}
      setOpenModel={setOpenModel}
      setDonateCampaign={setDonateCampaign}
    />
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

export default index;