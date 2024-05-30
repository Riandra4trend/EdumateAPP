import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import globalStyles from '../../../../../styles/globalStyles';
import globalColors from '../../../../../styles/globalColors';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

const findMateriById = (id) => {
    const materiData = require('../../../../../data/matpel_dummy.json');

    const materi = materiData.materiDetail.find(item => item.materiId === id);
    return materi;
};


const MateriButton =({ materiId }) => {
    const router = useRouter();
    const [materiName, setMateriName] = useState('');

    useEffect(() => {
        const materi = findMateriById(materiId);
        if (materi) {
            setMateriName(materi.namaMateri);
        }
    }, [materiId]);

    return (
        <View>
            <Pressable onPress={() => router.push({ pathname: "../materi/modal", params: { id: materiId } })}>
                <View style={styles.materiButton}>
                    <Text style={styles.materiTitle}>{materiName}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    materiButton: {
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: globalColors.primary.base,
        marginBottom: 12,
        borderRadius: 16,
        alignItems: 'center',
        maxWidth: 'auto'
    },
    materiTitle: {
        color: globalColors.primary.base
    }
});

export default MateriButton;