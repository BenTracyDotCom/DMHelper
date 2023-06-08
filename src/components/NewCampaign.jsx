import { Modal, Text } from 'react-native';

export default function NewCampaign() {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            >
            <Text className="w-11/12 h-11/12 m-auto">
                New campaign wooo
            </Text>
        </Modal>)
}