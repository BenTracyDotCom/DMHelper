import { View, Text, TouchableOpacity } from 'react-native';

export default function Character({ character }) {

  return (
    <View className="pb-5">
      <TouchableOpacity className={`${character.type === 'npc' ? 'bg-sky-200' : 'bg-white'} rounded-xl`}>
        <View className="p-2">
          <Text className="font-[Scada]">{character.name}</Text>
          <Text>{`${character.race} ${character.class} ${character.level}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}