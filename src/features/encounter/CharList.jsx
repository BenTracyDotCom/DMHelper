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

    return (
        <View>
            <Text>{encounter.title}</Text>
            {encounter.chars.map((char, i) => (<Character character={char} key={i} active={i === encounter.active} />))}
            <TouchableOpacity onPress={advance} className="mx-auto bg-green-400 rounded-2xl">
                <Text className="text-white text-xl m-auto pl-3 pr-2 pb-1">▶</Text>
            </TouchableOpacity>
        </View>
    )
}