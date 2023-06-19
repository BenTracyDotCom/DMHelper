import { View, Text, TouchableOpacity } from 'react-native';

export default function Character({character, active}) {

    return (
        <View>
            <Text className={active ? 'text-green-500' : ''}>{character.name}</Text>
        </View>
    )
}