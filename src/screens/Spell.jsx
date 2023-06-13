import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Spell({data}) {

    const route = useRoute()
    const {spellUrl} = route.params;
    const [spellData, setSpellData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSpellData = async() => {
            try {
                const response = await fetch(`https://www.dnd5eapi.co${spellUrl}`)
                const data = await response.json()
                setSpellData(data)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

    fetchSpellData()
    }, [])

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <ScrollView className="h-full p-5 bg-gray-800">
            <Text className="text-2xl text-white mb-5 text-center">{spellData.name}</Text>
            <View className="bg-white p-4 rounded-lg mb-4 shadow-lg border border-gray-300">
                <Text className="text-lg text-gray-800 mb-2">{`Level: ${spellData.level}`}</Text>
                <Text style={{textAlign: 'left'}} className="text-sm text-gray-600"> {`${spellData.desc.map(desc => desc.trim().replace(/\n/g, '')).join(' ')}`}</Text>
                <View className="mt-4">
                    <Text className="text-sm text-gray-600"> {`Range: ${spellData.range}`}</Text>
                    <Text className="text-sm text-gray-600"> {`Components: ${spellData.components.join(', ')}`}</Text>
                    <Text className="text-sm text-gray-600"> {`Duration: ${spellData.duration}`}</Text>
                    <Text className="text-sm text-gray-600"> {`Casting Time: ${spellData.casting_time}`}</Text>
                </View>
                <View className="mt-4">
                <Text className="text-sm text-gray-600"> {`School: ${spellData.school.name}`}</Text>
                    <Text className="text-sm text-gray-600"> {`Attack Type: ${spellData.attack_type}`}</Text>
                </View>
                <View className="mt-4">
                    <Text className="text-sm text-gray-600"> {`Classes: ${spellData.classes.map(cl => cl.name).join(', ')}`}</Text>
                    <Text className="text-sm text-gray-600"> {`Subclasses: ${spellData.subclasses.map(sc => sc.name).join(', ')}`}</Text>
                </View>
            </View>
        </ScrollView>
    )
}