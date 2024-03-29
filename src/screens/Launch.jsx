import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { getDiePrefs } from "../features/dieroll/dierollSlice";
import { useSelector, useDispatch } from "react-redux";
import NewCampaign from "../features/NewCampaign/NewCampaign";
import { modalToggled } from "../features/NewCampaign/newCampaignSlice";
import { setCurrentCampaign } from "../features/campaigns/campaignSlice";
import { setNotes } from "../features/notes/notesSlice";

export default function Launch({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiePrefs());
  }, [dispatch]);

  const campaigns = useSelector((state) => state.campaigns);

  const handleCampaign = (title) => {
    dispatch(
      setNotes(campaigns.filter((camp) => camp.title === title)[0].notes),
    );
    // alert(JSON.stringify(campaigns.find(campaign => (
    //   campaign.title === title
    // ))))
    dispatch(
      setCurrentCampaign(
        campaigns.find((campaign) => campaign.title === title),
      ),
    );
    navigation.navigate("Campaign", { name: title });
  };
  const handleNew = () => {
    dispatch(modalToggled());
  };

  const handleDebug = () => {
    navigation.navigate("Debug");
  };

  return (
    <View className="h-full">
      <NewCampaign />
      {campaigns.map((campaign) => (
        <TouchableOpacity
          onPress={() => handleCampaign(campaign.title)}
          key={campaign.id}
          className="mx-auto mt-5 w-11/12 bg-blue-900 rounded-lg"
        >
          <Text className="p-2 mx-auto text-white">{campaign.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={handleNew}
        className="mx-auto mt-5 w-11/12 bg-blue-500 rounded-lg"
      >
        <Text className="p-2 mx-auto text-white">+ New Campaign +</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDebug}
        className="mx-auto mt-5 border-2 w-11/12 bg-slate-500 rounded-lg"
      >
        <Text className="p-2 m-auto text-white">Debug</Text>
      </TouchableOpacity>
    </View>
  );
}

//TODO: Render a list of campaigns from props
