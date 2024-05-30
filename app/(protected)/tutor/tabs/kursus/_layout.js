import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HeaderTitle({ title }) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

function HeaderLeft() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
            <Ionicons name="arrow-back-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
    );
}

function HeaderRight() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.iconContainer}>
            <MaterialCommunityIcons name="home-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
    );
}

export default function StackLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: styles.header,
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
            headerTitleAlign: 'center', 
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        }}>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Kursus",
                }}
            />
            {/* Tambahkan layar lain di sini */}
        </Stack>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#014A97',
    },
    iconContainer: {
        padding: 5,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
