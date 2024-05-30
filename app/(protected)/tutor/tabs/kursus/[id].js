// import React, { useEffect, useState }  from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import globalStyles from '../../../styles/globalStyles';
// import globalColors from '../../../styles/globalColors';
// import { StatusBar } from 'expo-status-bar';
// import { useRouter } from 'expo-router';


// export default function InfoPendidikanDetailPage() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const univData = require('../../../data/univ_dummy.json');

//   const UnivDetailContainer = ({ id }) => {
//     const [univInfo, setUnivInfo] = useState({});
  
//     useEffect(() => {
//       const university = univData.universitas.find(univ => univ.id == id);
//       const universityDetails = univData.univ_details.find(details => details.univId == id);
  
//       if (university && universityDetails) {
//         setUnivInfo({
//           univName: university.univName,
//           lokasi: universityDetails.lokasi,
//           fakultasJurusan: universityDetails.fakultasJurusan,
//           img: university.img
//         });
//       }
//     }, [id]);
  
//     return (
//       <View style={styles.univDetailContainer}>
//         <View style={styles.univDetailContainerItems}>
//           {univInfo.univName && (
//             <>
//               <Image source={{ uri: univInfo.img }} style={styles.univImage} />
//               <Text style={styles.univText}>{univInfo.univName}</Text>
//               <Text style={styles.univText}>Location: {univInfo.lokasi}</Text>
//               <Text style={styles.univText}>Faculties and Departments:</Text>
//               {Object.keys(univInfo.fakultasJurusan).map(faculty => (
//                 <View key={faculty}>
//                   <Text style={styles.facultyText}>{faculty}</Text>
//                   {univInfo.fakultasJurusan[faculty].map(department => (
//                     <Text key={department} style={styles.departmentText}>{department}</Text>
//                   ))}
//                 </View>
//               ))}
//             </>
//           )}
//         </View>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     univDetailContainer: {
//       backgroundColor: 'white',
//       padding: 20,
//       color: 'black',
//       margin: 16,
//       width: '90%',
//       borderWidth: 1,
//       borderColor: globalColors.sky.base,
//       borderRadius: 8,
//     },
//     univDetailContainerItems: {
//       justifyContent: 'left',
//       alignItems: 'center',
//       fontSize: 24,
//       marginHorizontal: 8,
//     },
//     univImage: {
//       width: 224,
//       height: 224,
//       marginBottom: 10,
//     },
//     univText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       marginBottom: 5,
//     },
//     facultyText: {
//       fontSize: 14,
//       fontWeight: 'bold',
//       marginTop: 10,
//     },
//     departmentText: {
//       fontSize: 12,
//       marginLeft: 10,
//     },
//   });

//   return (
//     <View style={globalStyles.container}>
//       <StatusBar style="auto" />
//       <View style={globalStyles.body}>
//         <UnivDetailContainer id={id}/>
//       </View>
//     </View>
//   );
// };
