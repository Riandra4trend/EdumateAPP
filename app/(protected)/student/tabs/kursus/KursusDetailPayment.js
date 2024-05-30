import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Clipboard from 'expo-clipboard';
import { useAuth } from '../../../../../context/AuthProvider'; // Import useAuth
import { useNavigation, useRoute } from '@react-navigation/native'; // Import hooks

export default function KursusDetailPayment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { enrollCourse } = useAuth(); // Get addCourse function from context
  const navigation = useNavigation();
  const route = useRoute();
  const { course } = route.params; // Get course data from route params

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCopyToClipboard = (link) => {
    Clipboard.setString(link);
    Alert.alert("Link Tersalin", "Link telah disalin ke clipboard!");
  };

  const handlePayment = async () => {
    try {
      await enrollCourse(course.id); // Add course to user's list
      Alert.alert('Success', 'Course has been purchased!');
      navigation.goBack(); // Navigate back to the course list
    } catch (error) {
      console.error("Error adding course: ", error);
      Alert.alert('Error', 'Failed to purchase course.');
    }
  };

  const renderRadioButton = (method) => {
    return (
      <Ionicons
        name={selectedPaymentMethod === method ? 'radio-button-on' : 'radio-button-off'}
        size={24}
        color="#7B0086"
      />
    );
  };

  return (
    <ScrollView className="flex-col mx-4">
      <View className="flex-col mt-7 mb-5 rounded-lg">
        <View className="flex-row p-2 bg-[#7B0086] rounded-t-lg justify-between">
          <View className="flex-row gap-2">
            <MaterialCommunityIcons size={24} name="account-outline" color="#fff" />
            <Text className="text-white text-base font-normal font-['Public Sans'] leading-normal">{course.teacherName}</Text>
          </View>
          <TouchableOpacity onPress={() => handleCopyToClipboard(course.link)} className="p-[6px] rounded-full border border-white justify-center">
            <FontAwesome5 name="link" size={12} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="flex-col p-3 bg-[#F5BDFA] rounded-b-lg">
          <Text className="text-sm font-bold font-['Public Sans'] text-[#7B0086]">{course.category}</Text>
          <Text className="text-black text-2xl font-normal font-['Public Sans']">{course.title}</Text>
          <View className="flex-row justify-between mt-3">
            <Text className="text-zinc-700 text-xs font-normal font-['Public Sans'] leading-none">{course.date}, {course.time}</Text>
            <View className="flex-row gap-2">
              <MaterialCommunityIcons size={16} name="account-outline" color="#7B0086" />
              <Text className="text-[#7B0086] text-xs font-bold font-['Public Sans']">{course.participants}/20</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-col bg-white rounded-md border border-neutral-300">
        <View className="p-6 items-center">
          <View className="h-[86px] w-[300px] bg-slate-50 rounded border border-neutral-300 items-center justify-center">
            <Text className="text-black text-[32px] font-bold font-['Public Sans']">Rp50.000,00</Text>
          </View>
        </View>
        <Text className="pl-6 text-black text-2xl font-bold font-['Public Sans']">Metode Pembayaran</Text>
        <View className="flex-col mx-4 mt-4 pb-6">
          <TouchableOpacity className="flex-row items-center mt-2" onPress={() => handlePaymentMethodSelect('Gopay')}>
            {renderRadioButton('Gopay')}
            <Text className="ml-2 text-black text-base">Gopay</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mt-2" onPress={() => handlePaymentMethodSelect('Ovo')}>
            {renderRadioButton('Ovo')}
            <Text className="ml-2 text-black text-base">Ovo</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mt-2" onPress={() => handlePaymentMethodSelect('BCA')}>
            {renderRadioButton('BCA')}
            <Text className="ml-2 text-black text-base">BCA</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mt-2" onPress={() => handlePaymentMethodSelect('Shopeepay')}>
            {renderRadioButton('Shopeepay')}
            <Text className="ml-2 text-black text-base">Shopeepay</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handlePayment}
        className="my-6 h-12 bg-[#7B0086] rounded-full items-center justify-center"
      >
        <Text className="text-white text-base font-bold">Bayar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
