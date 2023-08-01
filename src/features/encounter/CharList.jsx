import { View, Text, TouchableOpacity } from 'react-native';
import { nextChar, statusAdded, statusRemoved, hpAdded, hpRemoved, targetDestroyed } from './encounterSlice';
import { useSelector, useDispatch } from 'react-redux';

import Character from './Character';


export default function CharList(props) {

    const encounter = useSelector((state) => state.encounter)
    const dispatch = useDispatch()

    const advance = () => {
        dispatch(nextChar())
    }
    const cr = encounter.chars.filter(char => (char.type === 'enemy')).reduce((memo, item) => (memo += item.cr), 0)

    return (
        <View>

            {encounter.chars.map((char, i) => (<Character character={char} key={i} active={i === encounter.active} />))}

        </View>
    )
}