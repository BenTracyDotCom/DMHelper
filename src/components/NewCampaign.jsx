import { Modal, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { modalToggled, titleAdded, characterAdded, characterRemoved, mainQuestAdded, mainQuestRemoved, firstQuestAdded } from '../features/campaigns/newCampaignSlice'

export default function NewCampaign() {

    const newCampaign = useSelector(state => state.newCampaign)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(modalToggled())
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={newCampaign.shown}
            >
            <Text className="w-11/12 h-11/12 m-auto">
                New campaign wooo
            </Text>
            <TouchableOpacity onClick={handleClose}>
                <Text>Click to close</Text>
            </TouchableOpacity>
        </Modal>)
}