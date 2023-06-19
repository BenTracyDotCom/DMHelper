import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelect } from 'react-redux';
import CharList from '../features/encounter/CharList';

export default function Encounter(props) {

    return (
        <View>
            <CharList />
        </View>
    )
}