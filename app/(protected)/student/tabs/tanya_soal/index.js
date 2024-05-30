import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Modal, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import LikeIcon from '../../../../../assets/icons/Like.svg';
import CommentIcon from '../../../../../assets/icons/Comment.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WomenIcon from '../../../../../assets/icons/women.svg';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../../../../context/AuthProvider';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore } from '../../../../../db/firebase';
import QuestionModal from '../../../../components/QuestionModal';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { icon: <Feather size={30} name="zoom-in" color="#000" />, label: 'Matematika' },
  { icon: <FontAwesome5 name="user-graduate" size={30} color="#000" />, label: 'Campus Life' },
  { icon: <MaterialCommunityIcons name="magnet-on" size={28} color="#000" />, label: 'Fisika' },
  { icon: <SimpleLineIcons size={28} name="chemistry" color="#000" />, label: 'Kimia' },
  { icon: <Entypo size={28} name="tree" color="#000" />, label: 'Biologi' },
  { icon: <MaterialCommunityIcons size={28} name="home-city-outline" color="#000" />, label: 'Info Kosan' },
  { icon: <AntDesign size={28} name="question" color="#000" />, label: 'Tanya Soal' },
];

export default function Tanya_Soal() {
  const { user,icon } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [sortOption, setSortOption] = useState('latest'); // State untuk opsi pengurutan
  const displayedCategories = showAll ? categories : categories.slice(0, 4);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'pertanyaan'));
      const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsList);
    };

    fetchQuestions();
  }, []);

  // Fungsi untuk mengurutkan pertanyaan
  const sortQuestions = (questions, option) => {
    if (option === 'latest') {
      return questions.sort((a, b) => b.timestamp - a.timestamp); // Urutkan berdasarkan waktu terbaru
    } else if (option === 'mostLiked') {
      return questions.sort((a, b) => b.likes - a.likes); // Urutkan berdasarkan jumlah likes terbanyak
    }
    return questions;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToStorage = async (uri) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${Date.now()}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSubmitQuestion = async () => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToStorage(image);
      }

      const newQuestion = {
        userIcon: user.icon,
        username: user.username,
        role: user.role,
        description: inputText,
        image: imageUrl,
        likes: 0,
        dislikes: 0,
        category: selectedCategory,
        comments: [],
        timestamp: Date.now() // Tambahkan timestamp saat pertanyaan di-post
      };

      const docRef = await addDoc(collection(firestore, 'pertanyaan'), newQuestion);
      setQuestions([...questions, { id: docRef.id, ...newQuestion }]);
      setInputText('');
      setImage(null);
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  const handleLike = async (questionId, currentLikes) => {
    const questionRef = doc(firestore, 'pertanyaan', questionId);
    await updateDoc(questionRef, { likes: currentLikes + 1 });
    setQuestions(questions.map(q => q.id === questionId ? { ...q, likes: currentLikes + 1 } : q));
  };

  const handleDislike = async (questionId, currentDislikes) => {
    const questionRef = doc(firestore, 'pertanyaan', questionId);
    await updateDoc(questionRef, { dislikes: currentDislikes + 1 });
    setQuestions(questions.map(q => q.id === questionId ? { ...q, dislikes: currentDislikes + 1 } : q));
  };

  const handleCategoryPress = (category) => {
    if (selectedCategory === category.label) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category.label);
    }
  };

  const filteredQuestions = selectedCategory ? questions.filter(q => q.category === selectedCategory) : questions;
  const sortedQuestions = sortQuestions(filteredQuestions, sortOption); // Urutkan pertanyaan berdasarkan opsi yang dipilih

  return (
    <ScrollView className="mx-4 flex-col">
      <View className="w-82 h-20 bg-white rounded-lg mt-[22px] border border-neutral-300">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View className="flex-row py-4 px-4 gap-3 items-center">
          <Image source={{ uri:icon }} style={{ width:48, height: 48}} />
            <Text className="text-center text-neutral-400 text-base font-normal font-['Public Sans'] leading-normal">Apa yang ingin kamu tanyakan?</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-5 flex-row justify-between">
        <Text className="text-black text-base font-bold font-['Public Sans'] leading-normal">Telusuri kategori</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text className="py-2 px-4 rounded-full text-center text-fuchsia-800 text-[10px] font-medium font-['Public Sans'] leading-none border-fuchsia-800 border">
            {showAll ? 'Lihat Sedikit' : 'Lihat Semua'}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      <View className="gap-[15px] flex-row flex-wrap mt-1">
        {displayedCategories.map((feature, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(feature)}
            className="flex-col gap-[9px] items-center"
            style={{ borderColor: selectedCategory === feature.label ? '#D946EF' : '#000' }}
          >
            <View className="w-[65px] h-[65px] rounded-full border items-center justify-center" style={{ color: selectedCategory === feature.label ? '#D946EF' : '#000' }}>
              {feature.icon}
            </View>
            <Text className="text-center text-[12px]" style={{ color: selectedCategory === feature.label ? '#D946EF' : '#000' }}>
              {feature.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-5 flex-row justify-between">
        <Text className="text-black text-base font-bold font-['Public Sans'] leading-normal">Pertanyaan Populer</Text>
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={() => setSortOption('latest')}>
            <Text className={`py-2 px-4 rounded-full text-center ${sortOption === 'latest' ? 'text-fuchsia-800' : 'text-neutral-800'} text-[10px] font-medium font-['Public Sans'] leading-none border ${sortOption === 'latest' ? 'border-fuchsia-800' : 'border-neutral-800'}`}>
              Terbaru
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortOption('mostLiked')}>
            <Text className={`py-2 px-4 rounded-full text-center ${sortOption === 'mostLiked' ? 'text-fuchsia-800' : 'text-neutral-800'} text-[10px] font-medium font-['Public Sans'] leading-none border ${sortOption === 'mostLiked' ? 'border-fuchsia-800' : 'border-neutral-800'}`}>
              Terbanyak Disukai
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {sortedQuestions.map(question => (
        <TouchableOpacity key={question.id} onPress={() => navigation.navigate('DetailTanyaSoal', { question })}>
          <View className="flex-row pl-3 py-4 pr-5 bg-white rounded-lg border border-neutral-300 mt-3 ">
          <Image source={{ uri:icon }} style={{ width:48, height: 48}} />
            <View className="flex-col ml-2 w-[280px]">
              <View className="flex-row justify-between items-center mr-2">
                <View className="items-center flex-row">
                  <Text className="text-black text-sm mr-4 font-bold font-['Public Sans'] leading-tight">{question.username}</Text>
                  <Text className="text-fuchsia-800 text-xs font-normal">{question.role}</Text>
                </View>
                <View className="py-2 px-4 justify-center border border-gray-800 rounded-full">
                  <Text className=" text-center text-gray-800 text-xs">{question.category}</Text>
                </View>
              </View>
              
            <Text className="text-black text-sm font-normal font-['Public Sans'] mt-7 mb-3">{question.description}</Text>
              {question.image && <Image source={{ uri: question.image }} className="w-[200px] rounded-md mt-5 h-[100px]" />}
              <View className="flex-row gap-10 mt-[2px]">
                <TouchableOpacity onPress={() => handleLike(question.id, question.likes)} className="flex-row gap-2 items-center">
                  <View className="p-1 rounded-full border border-zinc-700">
                  <AntDesign name="like2" width={14} height={14} />
                  </View>
                  <Text className="text-neutral-400 text-xs font-medium font-['Public Sans']">{question.likes} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDislike(question.id, question.dislikes)} className="flex-row gap-2 items-center">
                  <View className="p-1 rounded-full border border-zinc-700">
                    <AntDesign name="dislike2" width={14} height={14} />
                  </View>
                  <Text className="text-neutral-400 text-xs font-medium font-['Public Sans']">{question.dislikes} Dislikes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <QuestionModal 
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitQuestion}
        inputText={inputText}
        setInputText={setInputText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        pickImage={pickImage}
        image={image}
      />
    </ScrollView>
  );
}
