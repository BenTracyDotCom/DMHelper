import { View, Text } from 'react-native';
import Character from './Character';
import { useSelector } from 'react-redux';

export default function CHaracterList(){

  const campaign = useSelector(state => (state.campaign))

  return (
    <View>
      {campaign.characters && campaign.characters.map(char => (
      <Character character={char} />
      ))}
    </View>
  )
}