import { View, Text, TouchableOpacity } from 'react-native';
import CharList from '../features/encounter/CharList';

export default function Encounter(props) {

    return (
        <View>
            <Text>Encounter</Text>
            <CharList />
        </View>
    )
}