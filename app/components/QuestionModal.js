import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import WomenIcon from '../../assets/icons/women.svg';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropdownButton from './DropdownButton';
import { useAuth } from '../../context/AuthProvider';


const QuestionModal = ({ isVisible, onClose, inputText, setInputText, selectedCategory, setSelectedCategory, pickImage, image, onSubmit }) => {
  const { user, icon } = useAuth();
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View className="w-[96%] bg-white rounded-lg p-5">
          <View className="flex-row py-4 px-4 gap-3 items-center justify-between">
          <Image source={{ uri:icon }} style={{ width:48, height: 48}}  />
            <View className="flex-row items-center">
              <DropdownButton selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </View>
          </View>
          <TextInput
            style={{ height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 10 }}
            placeholder="Apa yang ingin kamu tanyakan?"
            placeholderTextColor="#ccc"
            multiline
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            maxLength={300}
          />
          <View className="mx-4 my-5 flex-row justify-between items-center">
            <Text className="text-fuchsia-800 text-base font-normal font-['Public Sans']">{inputText.length}/300</Text>
            <TouchableOpacity onPress={pickImage}>
              <View className="w-6 h-6 bg-fuchsia-800 rounded-full items-center justify-center">
                <Feather name="image" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          {image && (
            <View className="relative w-full h-[180] justify-center">
            <Image source={{uri:image}} className="w-full h-full border border-[#5A4DF3] rounded-xl"/>
          </View>
          )}
          <View className="flex-row justify-end mt-4">
            <TouchableOpacity onPress={onClose} className="py-2 px-4 bg-gray-300 rounded-full mr-2">
              <Text className="text-white">Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit} className="py-2 px-4 bg-fuchsia-800 rounded-full">
              <Text className="text-white">Tanyakan!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QuestionModal;
