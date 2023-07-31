import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeEncounter = async (encounter) => {
  try {
    const jsonValue = JSON.stringify(encounter)
    await AsyncStorage.setItem('@encounter', jsonValue)
  } catch (e) {
    console.log(e)
  }
}

export const getEncounter = async() => {
  try {
    const jsonValue = await AsyncStorage.getItem('@encounter')
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e)
  }
}

export const removeEncounter = async () => {
  try {
    await AsyncStorage.removeItem('@encounter')
  } catch (e) {
    console.log(e);
  }
}