import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Clipboard, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import WomenIcon from '../../../../../assets/icons/women.svg';
import { useAuth } from '../../../../../context/AuthProvider';

export default function Home() {
  const { user, role, signOut,icon, fetchUserCourses, fetchCourses, courses, isCoursesUpdated } = useAuth();
  const [courseIndex, setCourseIndex] = useState(0);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        setFilteredCourses(fetchedCourses.filter(course => course.teacherId === user.uid));
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchAllCourses();
  }, [isCoursesUpdated]);

  const handleCopyToClipboard = (link) => {
    Clipboard.setString(link);
    Alert.alert("Link Tersalin", "Link telah disalin ke clipboard!");
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/signIn");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleForward = () => {
    if (courseIndex < filteredCourses.length - 1) {
      setCourseIndex(courseIndex + 1);
    } else {
      Alert.alert("Info", "No more courses available.");
    }
  };

  const handleBack = () => {
    if (courseIndex > 0) {
      setCourseIndex(courseIndex - 1);
    } else {
      Alert.alert("Info", "You are at the first course.");
    }
  };

  const currentCourse = filteredCourses[courseIndex];

  const features = [
    { icon: <Feather size={30} name="book" color="#000" />, label: 'Kursus', screen: '../../tabs/kursus' },
    { icon: <Ionicons name="chatbubbles-outline" size={30} color="#000" />, label: 'Tanya Soal', screen: '../../tabs/tanya_soal' },
    { icon: <Feather size={28} name="folder" color="#000" />, label: 'Materi', screen: '../../../../student/materi' },
    { icon: <MaterialCommunityIcons size={28} name="book-information-variant" color="#000" />, label: 'Info Sekolah', screen: '../../../../student/info_pendidikan' },
  ];

  return (
    <View className="mx-4">
      <View className="w-82 h-20 bg-white rounded-lg mt-[22px] border border-neutral-300">
        <View className="flex-row py-4 px-4 justify-between">
          
          <Image source={{ uri:icon }} style={{ width:48, height: 48}} />
          <View className="flex-col mr-4 ml-2">
            <Text className="font-bold text-gray-800 text-lg">Halo, {user.username.split(' ')[0]}!</Text>
            <Text className="text-[fuchsia-800] text-sm">{role}</Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center bg-[#C9F0FF] w-[100px] h-[40px] justify-center mr-3 rounded-full"
            onPress={handleLogout}
          >
            <Feather name="log-out" size={24} color="#000" />
            <Text className="ml-4">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-5 flex-row justify-between">
        <Text className="text-center text-black text-lg font-bold font-['Public Sans']">Lanjutkan Kursus</Text>
        <View className="flex-row gap-[10px]">
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back-circle-outline" size={32} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForward}>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {currentCourse ? (
        <View className="mt-4 flex-col">
          <View className="flex-row p-2 bg-red-500 rounded-t-lg justify-between">
            <View className="flex-row gap-2">
              <MaterialCommunityIcons size={24} name="account-outline" color="#fff" />
              <Text className="text-white text-base font-normal font-['Public Sans'] leading-normal">{currentCourse.teacherName}</Text>
            </View>
            <View className="p-[6px] rounded-full border border-white justify-center">
              <FontAwesome5 name="link" size={12} color="#fff" />
            </View>
          </View>
          <View className="flex-col p-3 bg-orange-50 rounded-b-lg">
            <Text className="text-red-500 text-sm font-bold font-['Public Sans']">{currentCourse.title}</Text>
            <Text className="text-black text-2xl font-normal font-['Public Sans']">{currentCourse.material}</Text>
            <View className="flex-row justify-between mt-3">
              <Text className="text-zinc-700 text-xs font-normal font-['Public Sans'] leading-none">{currentCourse.date}, {currentCourse.time}</Text>
              <View className="flex-row gap-2">
                <MaterialCommunityIcons size={16} name="account-outline" color="#E84A27" />
                <Text className="text-[#E84A27] text-xs font-bold font-['Public Sans'] leading-none">{currentCourse.participants}/{currentCourse.quota}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-center text-gray-500 mt-5">No courses available</Text>
      )}
      <Text className="mt-5 text-black text-lg font-bold font-['Public Sans'] leading-normal">Lihat semua fitur</Text>
      <View className="gap-[15px] flex-row flex-wrap mt-5">
        {features.map((feature, index) => (
          <Link key={index} href={feature.screen} asChild>
            <TouchableOpacity className="flex-col gap-[9px] items-center">
              <View className="w-[65px] h-[65px] rounded-full border border-neutral-400 items-center justify-center">
                {feature.icon}
              </View>
              <Text className="text-center text-[13px]">{feature.label}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
