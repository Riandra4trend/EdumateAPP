import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import globalColors from '../../../../styles/globalColors';
import globalStyles from '../../../../styles/globalStyles';

const ModalScreen = () => {
    const { id } = useLocalSearchParams();

    const [materiDetail, setMateriDetail] = useState([]);

    useEffect(() => {
        const materiData = require('../../../../data/matpel_dummy.json');
        const details = materiData.materiDetail.filter(item => item.materiId.toString() === id);
        setMateriDetail(details);
    }, [id]);

    return (
        <View style={globalStyles.container}>
            {/* <Text style={styles.materiTitle}>blabla</Text> */}
            <View style={styles.ModalContainer}>
                <Text>Modal Screen for Materi ID: {id}</Text>
                <Text>{materiDetail.namaMateri}</Text>
                <Text style={styles.materiTitle}>Besaran dan Pengukuran</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu vulputate odio, sit amet iaculis lacus. Quisque finibus ut diam vel pretium. Praesent finibus euismod erat. Nunc in leo nisl. Suspendisse pulvinar enim nec massa ultricies, molestie faucibus lorem faucibus. Aliquam erat volutpat. Nunc fermentum ante ut nunc commodo ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris in ligula nulla. Aliquam ac quam et arcu tincidunt congue. Quisque vitae orci et neque fermentum tincidunt at a augue. Nunc accumsan tortor quis sagittis consectetur. Phasellus sagittis non mauris ut volutpat. Vestibulum ut mi ac orci consequat malesuada. Sed nec semper ligula. Aenean facilisis, quam et sodales laoreet, ex ex pulvinar massa, sit amet vulputate diam purus vitae ante. </Text>
                <StatusBar style="light" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        padding: 24,
        borderWidth: 1,
        margin: 24,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: globalColors.sky.base
    },
    materiTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

export default ModalScreen;
