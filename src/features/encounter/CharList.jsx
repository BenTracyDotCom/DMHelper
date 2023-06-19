import { View, Text, TouchableOpacity } from 'react-native';
import { nextChar, statusAdded, statusRemoved, hpAdded, hpRemoved, targetDestroyed } from './encounterSlice';
import { useSelector, useDispatch } from 'react-redux';

import Character from './Character';

export default function CharList(props) {

    const encounter = useSelector((state) => state.encounter)

    return(
        <View>
            <Text>{encounter.title}</Text>
            {encounter.chars.map((char, i) => (<Character character={char} key={i} active={i === encounter.active}/>))}
        </View>
    )
}