import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CharList from '../features/encounter/CharList';


export default function Encounter(props) {

    const useDispatch = useDispatch()


    const [ttile, setTitle] = useState('')
    const [target, setTarget] = useState('')
    const [xpEarned, setXpEarned] = useState

    const currentQuest = useSelector ((state) => state.campaign.currentQuest)

    const submitEncounter = () => {
        const newCounter = {
            title,
            active: 1,
            target: Number(target),
            xpEarned: Number(xpEarned),
            loot: [],
            chars: []
        }
    }

    return (
        <View>
            <CharList />
        </View>
    )
}