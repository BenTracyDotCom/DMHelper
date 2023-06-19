import { View, Text, TouchableOpacity } from 'react-native';

export default function Character({ character, active }) {

    const bg = active ? 'bg-green-300' : character.type === 'enemy' ? 'bg-red-200' : character.type === 'npc' ? 'bg-cyan-200' : 'bg-white'

    const handleChar = () => {
        
    }

    return (
        <View>
            <TouchableOpacity onPress={handleChar} className={`mx-3 my-2 rounded-xl ${bg}`}>
                <Text className={`font-[Scada] p-2 ml-2`}>{character.name}</Text>
            </TouchableOpacity>
        </View>
    )
}