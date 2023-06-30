import { View, Text, TouchableOpacity } from 'react-native';
import { setNotes } from './notesSlice';
import { setActive } from './campaignSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Character({ character }) {

  const dispatch = useDispatch();
  const active = useSelector(state => state.campaign.active)
  const isActive = character === active
  const campaignNotes = useSelector(state => state.campaign.notes)


  const handlePress = () => {
    if(isActive){
      dispatch(setActive(null))
      dispatch(setNotes(campaignNotes))
    } else {
      dispatch(setActive(character))
      dispatch(setNotes(character.notes.length ? character.notes : [`No notes to display for ${character.name}.`]))
    }
  }

  return (
    <View className="pb-3">
      <TouchableOpacity className={`${character.type === 'npc' ? 'bg-sky-200 ' : 'bg-white '} ${isActive ? `border-2 border-lime-400` : ''} rounded-xl`} onPress={handlePress}>
        <View className="p-2">
          <Text className="font-[Scada] text-xl">{character.name}</Text>
          <Text className="font-[Scada]">{`${character.race} ${character.class} ${character.level}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}