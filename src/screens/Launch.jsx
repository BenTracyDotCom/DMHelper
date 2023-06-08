import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NewCampaign from '../features/campaigns/NewCampaign';
import { modalToggled } from '../features/campaigns/newCampaignSlice';

export default function Launch({ navigation }) {

  const dispatch = useDispatch();
  const campaigns = useSelector(state => state.campaigns)
  
  const handleCampaign = () => {
    navigation.navigate('Home')
  }
  const handleNew = () => {
    dispatch(modalToggled())
  }


  return (
    <View>
      {campaigns.map(campaign => (
        <TouchableOpacity
        onPress={handleCampaign}
        key={campaign.id}
        className="m-auto mt-5 w-11/12 bg-blue-900 rounded-lg">
        <Text className="p-2 m-auto text-white">{campaign.title}</Text>
      </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={handleNew} className="m-auto mt-5 w-11/12 bg-blue-500 rounded-lg">
        <Text className="p-2 m-auto text-white">New Campaign +</Text>
      </TouchableOpacity>
      <NewCampaign />
    </View>
  )
}

//TODO: Render a list of campaigns from props