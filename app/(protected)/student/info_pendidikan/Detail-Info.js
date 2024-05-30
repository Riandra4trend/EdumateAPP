import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import globalColors from '../../../../styles/globalColors';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function InfoPendidikanDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const univData = require('../../../../data/univ_dummy.json');

  const UnivDetailContainer = ({ id }) => {
    const [univInfo, setUnivInfo] = useState({});

    useEffect(() => {
      const university = univData.universitas.find((univ) => univ.id == id);
      const universityDetails = univData.univ_details.find(
        (details) => details.univId == id
      );

      if (university && universityDetails) {
        setUnivInfo({
          univName: university.univName,
          lokasi: universityDetails.lokasi,
          deskripsi: universityDetails.deskripsi,
          fakultasJurusan: universityDetails.fakultasJurusan,
          img: university.img,
        });
      }
    }, [id]);

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.univDetailContainer}>
          <View style={styles.univDetailContainerItems}>
            {univInfo.univName && (
              <>
                <Image source={{ uri: univInfo.img }} style={styles.univImage} />
                <Text style={styles.univTitle}>{univInfo.univName}</Text>
                <Text style={styles.univText}>{univInfo.deskripsi}</Text>
                <Text style={styles.univHeading}>Location</Text>
                <Text style={styles.univText}>{univInfo.lokasi}</Text>
                <Text style={styles.univHeading}>Fakultas dan Jurusan</Text>
                {Object.keys(univInfo.fakultasJurusan).map((faculty) => (
                  <View key={faculty}>
                    <Text style={styles.facultyText}>{faculty}</Text>
                    {univInfo.fakultasJurusan[faculty].map((department) => (
                      <Text key={department} style={styles.departmentText}>
                        - {department}
                      </Text>
                    ))}
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    univDetailContainer: {
      backgroundColor: 'white',
      padding: 20,
      color: 'black',
      marginHorizontal: 16,
      width: '90%',
      borderWidth: 1,
      borderColor: globalColors.sky.base,
      borderRadius: 8,
      marginTop: 24,
    },
    univDetailContainerItems: {
      justifyContent: 'left',
      alignItems: 'left',
      fontSize: 24,
      marginHorizontal: 8,
    },
    univImage: {
      width: 224,
      height: 224,
      marginBottom: 12,
      alignSelf: 'center',
    },
    univTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: globalColors.primary.base,
      marginBottom: 16,
    },
    univHeading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 8,
    },
    univText: {
      fontSize: 16,
      marginBottom: 16,
    },
    facultyText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    departmentText: {
      fontSize: 16,
      marginLeft: 10,
    },
  });

  return (
    <View>
      <StatusBar style="auto" />
      <View>
        <UnivDetailContainer id={id} />
      </View>
    </View>
  );
}
