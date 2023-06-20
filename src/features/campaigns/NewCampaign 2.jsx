import { Modal, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { modalToggled, titleAdded, characterAdded, characterRemoved, mainQuestAdded, mainQuestRemoved, firstQuestAdded } from './newCampaignSlice'

export default function NewCampaign() {

    const dispatch = useDispatch()
    const newCampaign = useSelector(state => state.newCampaign)

    const handleClose = () => {
        dispatch(modalToggled())
    }

    return (
        <Modal
            animationType="slide"
            visible={newCampaign.shown}
            presentationStyle='pageSheet'
            >
            <Text className="w-11/12 h-11/12 m-auto">
                New campaign wooo
                {JSON.stringify(newCampaign)}
            </Text>
            <TouchableOpacity onPress={handleClose} className="m-auto">
                <Text className="text-blue-500">Click to close</Text>
            </TouchableOpacity>
        </Modal>)
}