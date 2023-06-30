import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {

  const campaign = useSelector(state => state.campaign)

  const handleLocation = () => {
    //TODO
  }

  return (
    <View>
      <View className="flex flex-row justify-between mx-2 mt-2">
        <Text className="font-[Scada] font-bold text-3xl">Where:</Text>
        <TouchableOpacity className="rounded-xl bg-gray-400 flex-1 mx-2" onPress={handleLocation}>
          <Text className="m-auto p-2 text-xl font-[Scada]">{campaign.location}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-xl bg-gray-400">
          <Text className="m-auto p-2 font-[Scada]">
            Map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}