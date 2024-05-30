import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import globalColors from '../../../../styles/globalColors';
import { StatusBar } from 'expo-status-bar';
import MateriButton from './components/MateriButton'; // Changed import statement

const MateriDetailContainer = () => {
    const { id } = useLocalSearchParams();
    const [materiDetails, setMateriDetails] = useState([]);
    const [matpelName, setMatpelName] = useState([]);

    useEffect(() => {
        const matpelData = require('../../../../data/matpel_dummy.json');
        const details = matpelData.materiDetail.filter(item => item.matpelId.toString() == id);
        // const matpel = matpelData.mataPelajaran.filter(item => item.matpelId.toString() == details.matpelId);
        setMateriDetails(details);
    }, [id]);

    if (!materiDetails.length) {
        return (
            <View style={globalStyles.container}>
                <StatusBar style="auto" />
                <View style={globalStyles.body}>
                    <Text>Loading...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            {/* Ga masuk idMateri-nya entah kenapa */}
            <Text>{matpelName}</Text>
            <Text style={styles.title}>Matematika Minat</Text>
            <ScrollView style={styles.matpelDetailContainer}>
                <View>
                    {materiDetails.map((materi) => (
                        <MateriButton key={materi.materiId} materiId={materi.materiId} /> 
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default function MateriDetailPage() {
    return (
        <View style={globalStyles.container}>
            <StatusBar style="auto" />
            <MateriDetailContainer/>
        </View>
    );
}

const styles = StyleSheet.create({
    matpelDetailContainer: {
        marginVertical: 20,
        borderWidth: 1,
        borderColor: globalColors.sky.base,
        padding: 64,
        borderRadius: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 8,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
    }
});
