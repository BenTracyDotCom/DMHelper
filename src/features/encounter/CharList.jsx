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
        <View className="h-full relative font-[Scada]">
            <Text className="mx-auto py-3 font-[Scada-Bold] text-2xl">{encounter.title}</Text>
            {encounter.chars.map((char, i) => (<Character character={char} key={i} active={i === encounter.active} />))}
            <TouchableOpacity onPress={advance} className="bg-green-400 rounded-3xl absolute bottom-0 mb-8 flex self-center">
                <Text className="text-white text-3xl m-auto p-3 pl-4">▶</Text>
            </TouchableOpacity>
        </View>
    )
}