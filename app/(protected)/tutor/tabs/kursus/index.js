import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalKursus from '../../../../components/CourseModal';
import * as Clipboard from 'expo-clipboard';
import { useAuth } from '../../../../../context/AuthProvider';

export default function Kursus() {
  const [activeTab, setActiveTab] = useState('Tersedia');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const { user, addCourse, fetchCourses } = useAuth();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    fetchAllCourses();
  }, []);

  const handleCopyToClipboard = (link) => {
    Clipboard.setString(link);
    Alert.alert("Link Tersalin", "Link telah disalin ke clipboard!");
  };

  const filteredCourses = courses.filter(course =>
    (activeTab === 'Tersedia' ? course.teacherId !== user.uid : course.teacherId === user.uid) &&
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddCourse = async (courseDetails) => {
    try {
      await addCourse(courseDetails);
      setModalVisible(false);
      // Fetch courses again to update the list
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView className="flex-col">
      <View className="flex-row h-12 items-center bg-white">
        <TouchableOpacity onPress={() => setActiveTab('Tersedia')} style={{ flex: 1, alignItems: 'center' }}>
          <Text className={`text-base w-full h-full pt-3 text-center font-normal font-['Public Sans'] ${activeTab === 'Tersedia' ? 'text-fuchsia-800 border-b-2 border-fuchsia-800' : 'text-zinc-500'}`}>
            Tersedia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Kursus Saya')} style={{ flex: 1, alignItems: 'center' }}>
          <Text className={`text-base w-full h-full pt-3 text-center font-normal font-['Public Sans'] ${activeTab === 'Kursus Saya' ? 'text-fuchsia-800 border-b-2 border-fuchsia-800' : 'text-zinc-500'}`}>
            Kursus Saya
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mx-4 mt-4">
        {activeTab === 'Kursus Saya' ? (
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} className="py-4 px-[106px] bg-[#F0CFF3] rounded-full">
              <Text className="text-center text-fuchsia-800 text-base font-medium font-['Public Sans']">Tambah Kursus</Text>
            </TouchableOpacity>
            <View className="gap-2 flex-row mt-2 items-center">
              <View className="py-2 pl-2 pr-4 rounded-full items-center flex-row border border-fuchsia-800">
                <Ionicons name="chevron-down" size={16} color="#7B0086" />
                <Text className="text-center text-fuchsia-800 text-base font-medium font-['Public Sans'] ml-2">Jumlah Peserta</Text>
              </View>
              <View className="w-8 h-8 items-center justify-center border border-fuchsia-800 rounded-full">
                <FontAwesome5 name="list-ul" size={16} color="#7B0086" />
              </View>
            </View>
            <View className="mt-6 flex-col">
              {filteredCourses.map(course => (
                <View key={course.id} className="flex-col mb-4 rounded-lg">
                  <View className={`flex-row p-2 bg-red-500 rounded-t-lg justify-between`}>
                    <View className="flex-row gap-2">
                      <MaterialCommunityIcons size={24} name="account-outline" color="#fff" />
                      <Text className="text-white text-base font-normal font-['Public Sans'] leading-normal">{course.teacherName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleCopyToClipboard(course.link)} className="p-[6px] rounded-full border border-white justify-center">
                      <FontAwesome5 name="link" size={12} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View className={`flex-col p-3 bg-orange-50 rounded-b-lg`}>
                    <Text className="text-sm font-bold font-['Public Sans'] text-red-500">{course.title}</Text>
                    <Text className="text-black text-2xl font-normal font-['Public Sans']">{course.material}</Text>
                    <View className="flex-row justify-between mt-3">
                      <Text className="text-zinc-700 text-xs font-normal font-['Public Sans'] leading-none">Sabtu, 19.00 - 21.00 WIB</Text>
                      <View className="flex-row gap-2">
                        <MaterialCommunityIcons size={16} name="account-outline" color="#E84A27" />
                        <Text className="text-red-500 text-xs font-bold font-['Public Sans']">{course.participants}/{course.quota}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
                onPress={() => setModalVisible(false)}
              >
                <View style={{ backgroundColor: '#fff', width: '100%', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                  <ModalKursus onAddCourse={handleAddCourse} />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        ) : (
          <View>
            <View className="bg-gray-200 h-9 rounded-lg flex-row items-center">
              <Ionicons name="search" size={16} color="#000" className="ml-2" />
              <TextInput
                placeholder="Cari kursus"
                className="ml-3 text-neutral-500 text-base font-normal font-['Public Sans']"
                value={searchText}
                onChangeText={text => setSearchText(text)}
                style={{ flex: 1 }}
              />
            </View>
            <View className="gap-2 flex-row mt-2 items-center">
              <View className="py-2 pl-2 pr-4 rounded-full items-center flex-row border border-fuchsia-800">
                <Ionicons name="chevron-down" size={16} color="#7B0086" />
                <Text className="text-center text-fuchsia-800 text-base font-medium font-['Public Sans'] ml-2">Jumlah Peserta</Text>
              </View>
              <View className="w-8 h-8 items-center justify-center border border-fuchsia-800 rounded-full">
                <FontAwesome5 name="list-ul" size={16} color="#7B0086" />
              </View>
            </View>
            <View className="mt-6 flex-col">
              {courses.map(course => (
                <View key={course.id} className="flex-col mb-4 rounded-lg">
                  <View className={`flex-row p-2 bg-[#404446] rounded-t-lg justify-between`}>
                    <View className="flex-row gap-2">
                      <MaterialCommunityIcons size={24} name="account-outline" color="#fff" />
                      <Text className="text-white text-base font-normal font-['Public Sans'] leading-normal">{course.teacherName}</Text>
                    </View>
                  </View>
                  <View className={`flex-col p-3 bg-gray-200 rounded-b-lg`}>
                    <Text className="text-sm font-bold font-['Public Sans'] text-gray-800">{course.title}</Text>
                    <Text className="text-black text-2xl font-normal font-['Public Sans']">{course.material}</Text>
                    <View className="flex-row justify-between mt-3">
                      <Text className="text-zinc-700 text-xs font-normal font-['Public Sans'] leading-none">{course.date}, {course.time}</Text>
                      <View className="flex-row gap-2">
                        <MaterialCommunityIcons size={16} name="account-outline" color="#718096" />
                        <Text className="text-gray-800 text-xs font-bold font-['Public Sans']">{course.participants}/{course.quota}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
