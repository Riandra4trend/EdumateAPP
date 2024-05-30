import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, FlatList, Pressable, ScrollView, Image } from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import globalColors from '../../../../styles/globalColors';
import { useRouter } from 'expo-router';
import MateriButton from './components/MateriButton';

const MatpelContainer = ({ matpelId, matpelName, matpelImage }) => {
    const router = useRouter();

    return (
        <View style={styles.matpelContainerWrapper}>
            <Pressable onPress={() => router.push({ pathname: "/student/materi/Detail", params: { id: matpelId } })}>
                <View style={styles.matpelContainer}>
                    <View style={styles.matpelContainerRow}>
                        <View style={styles.matpelImageContainer}>
                            <Image style={styles.matpelImage} source={{uri: matpelImage}} />
                        </View>
                        <View style={styles.matpelTitleContainer}>
                            <Text style={styles.matpelTitle}>{matpelName}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    matpelContainerWrapper: {
        flex: 1,
        padding: 8,
    },
    matpelContainer: {
        backgroundColor: 'white',
        padding: 16,
        color: 'black',
        fontWeight: 'bold',
        margin: 8,
        borderWidth: 1,
        borderColor: globalColors.sky.base,
        borderRadius: 8,
    },
    matpelContainerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    matpelImageContainer: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 64
    },
    matpelTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
    },
    matpelTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    matpelImage: {
        width: 48,
        height: 48,
        borderRadius: 24
    }
});

export default function MateriPage() {
    const matpelData = require('../../../../data/matpel_dummy.json');

    return (
        <View>
            <StatusBar style="auto" />
            <FlatList
                data={matpelData.mataPelajaran}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MatpelContainer matpelId={item.id} matpelName={item.nama} matpelImage={item.img} />
                )}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
}
