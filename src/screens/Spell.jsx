import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
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
        <ScrollView style={styles.scrollContainer}>
            <Text style={styles.title}>{spellData.name}</Text>
            <View style={styles.contentContainer}>
                <Text style={styles.level}>{`Level ${spellData.level}`}</Text>
                <Text style={styles.description}>{`${spellData.desc.map(desc => desc.trim().replace(/\n/g, '')).join(' ')}`}</Text>
                <View style={styles.group}>
                    <Text style={styles.details}>{`Range: ${spellData.range}`}</Text>
                    <Text style={styles.details}>{`Components: ${spellData.components.join(', ')}`}</Text>
                    <Text style={styles.details}>{`Duration: ${spellData.duration}`}</Text>
                    <Text style={styles.details}>{`Ritual: ${spellData.ritual ? 'Yes' : 'No'}`}</Text>
                    <Text style={styles.details}>{`Casting Time: ${spellData.casting_time}`}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.details}> {`School: ${spellData.school.name}`}</Text>
                    <Text style={styles.details}> {`Attack Type: ${spellData.attack_type}`}</Text>
                    <Text style={styles.details}> {`Damage Type: ${spellData.damage.damage_type.name}`}</Text>
                    <View style={styles.group}>
                        <Text style={styles.subheading}>Damage at Each Slot Level:</Text>
                        {Object.entries(spellData.damage.damage_at_slot_level).map(([level, damage]) =>
                            <Text key={level} style={styles.details}>{`Level ${level}: ${damage}`}</Text>
                        )}
                    </View>
                </View>
                <View style={styles.group}>
                    <Text style={styles.details}> {`Classes: ${spellData.classes.map(cl => cl.name).join(', ')}`}</Text>
                    <Text style={styles.details}> {`Subclasses: ${spellData.subclasses.map(sc => sc.name).join(', ')}`}</Text>
                </View>
                <View style={styles.group}>
                <Text style={styles.details}>Material: {spellData.material}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2d3748',
    },
    title: {
        fontSize: 20,
        color: '#d69e2e',
        marginBottom: 20,
        textAlign: 'center',
    },
    contentContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 4,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderColor: '#e2e8f0',
        borderWidth: 1,
    },
    level: {
        fontSize: 16,
        color: '#c53030',
        marginBottom: 8,
    },
    description: {
        textAlign: 'left',
        fontSize: 14,
        color: '#2f855a',
    },
    group: {
        marginTop: 16,
    },
    details: {
        fontSize: 14,
        color: '#2b6cb0',
    },
});