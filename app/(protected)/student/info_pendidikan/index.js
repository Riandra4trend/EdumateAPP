import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import globalColors from '../../../../styles/globalColors';
import { useRouter } from 'expo-router';

export default function InfoPendidikanPage() {
  const router = useRouter();
  const univData = require('../../../../data/univ_dummy.json');

  const UnivContainer = ({ univName, univImage, univId }) => {
    return (
      <Pressable onPress={() => router.push({pathname: "/student/info_pendidikan/Detail-Info", params:{id: univId}})}>
        <View style={styles.univContainer}>
          <View style={styles.univContainerItems}>
            <Image style={styles.univImage} source={{ uri: univImage }} />
            <Text style={styles.univText}>{univName}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const styles = StyleSheet.create({
    univContainer: {
      backgroundColor: 'white',
      padding: 20,
      color: 'black',
      margin: 16,
      width: '90%',
      borderWidth: 1,
      borderColor: globalColors.sky.base,
      borderRadius: 8,
    },
    univContainerItems: {
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      fontSize: 24,
      marginHorizontal: 8,
    },
    univImage: {
      height: 36,
      width: 36
    },
    univText: {
      marginLeft: 24,
      fontSize: 16,
    },
    searchContainer: {
      backgroundColor: globalColors.sky.lighter,
      color: 'black',
      width: '100%',
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 8,
      marginBottom: 16
    }
  });

  return (
    <View>
      <StatusBar style="auto" />
      <View>
        {/* Search Bar */}
        <FlatList
          data={univData.universitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UnivContainer univName={item.univName} univImage={item.img} univId={item.id} />
          )}
        />
      </View>
    </View>
  );
}
