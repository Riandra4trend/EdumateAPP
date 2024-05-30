import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CommentModal from '../../../../components/CommentModal';
import WomenIcon from '../../../../../assets/icons/women.svg';
import { firestore } from '../../../../../db/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../../../../context/AuthProvider';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import LikeIcon from '../../../../../assets/icons/Like.svg';
import CommentIcon from '../../../../../assets/icons/Comment.svg';

export default function DetailTanyaSoal() {
  const route = useRoute();
  const { question } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);
  const { user,icon } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'pertanyaan', question.id, 'comments'));
      const commentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
    };

    fetchComments();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
    const storageRef = ref(storage, `comment-images/${Date.now()}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSubmitComment = async () => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToStorage(image);
      }

      const newComment = {
        userIcon: user.icon,
        username: user.username,
        role: user.role,
        description: inputText,
        image: imageUrl,
        likes: 0,
        dislikes: 0,
      };

      const commentRef = await addDoc(collection(firestore, 'pertanyaan', question.id, 'comments'), newComment);
      const questionRef = doc(firestore, 'pertanyaan', question.id);

      // Update pertanyaan untuk menambahkan referensi komentar
      await updateDoc(questionRef, {
        comments: arrayUnion(commentRef.id)
      });

      setComments([...comments, { id: commentRef.id, ...newComment }]);
      setInputText('');
      setImage(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleLike = async (commentId, currentLikes) => {
    const commentRef = doc(firestore, 'pertanyaan', question.id, 'comments', commentId);
    await updateDoc(commentRef, { likes: currentLikes + 1 });
    setComments(comments.map(c => c.id === commentId ? { ...c, likes: currentLikes + 1 } : c));
  };

  const handleDislike = async (commentId, currentDislikes) => {
    const commentRef = doc(firestore, 'pertanyaan', question.id, 'comments', commentId);
    await updateDoc(commentRef, { dislikes: currentDislikes + 1 });
    setComments(comments.map(c => c.id === commentId ? { ...c, dislikes: currentDislikes + 1 } : c));
  };

  return (
    <ScrollView className="mx-4 flex-col">
      <View className="flex-col bg-white px-4 py-5 mt-6 rounded-lg border border-neutral-300">
        <View className="flex-row gap-5 items-center">
        <Image source={{ uri:icon }} style={{ width:48, height: 48}} />
          <View className="items-center flex-row justify-center ">
              <Text className="text-black text-sm mr-4 font-bold font-['Public Sans'] leading-tight">{question.username}</Text>
              <Text className="text-fuchsia-800 text-xs font-normal">{question.role}</Text>
          </View>
          <View className="py-2 px-4 justify-center border border-gray-800 rounded-full">
                  <Text className=" text-center text-gray-800 text-xs">{question.category}</Text>
          </View>
        </View>
        <Text className="text-neutral-950 text-base font-normal font-['Public Sans'] mt-5">{question.description}</Text>
        {question.image && <Image source={{ uri: question.image }} style={{ width: 300, height: 200, marginTop: 10 }} />}
      </View>
      <Text className="text-black text-base font-bold font-['Public Sans'] mt-6">Komentar</Text>
      <TouchableOpacity onPress={toggleModal} className="bg-white mt-2 rounded-lg border border-neutral-300">
        <View className="flex-row py-4 px-4 gap-3 items-center">
          <Image source={{ uri:icon }} style={{ width:48, height: 48}} />
          <Text className="text-center text-neutral-400 text-base font-normal font-['Public Sans'] leading-normal">Tulis Komentar...</Text>
        </View>
      </TouchableOpacity>
      <View className="border-b border-neutral-300 w-full mt-3"></View>
      <ScrollView className="mt-2">
        {comments.map(comment => (
          <TouchableOpacity key={comment.id} >
          <View className="flex-row pl-3 py-4 pr-5 bg-white rounded-lg border border-neutral-300 mt-3">
            <Image source={{ uri:icon }} style={{ width:20, height: 20}} />
            <View className="flex-col ml-2 w-[280px]">
              <View className="flex-row justify-between items-center">
                <View className="items-center flex-row mb-5 ">
                  <Text className="text-black text-sm mr-4 font-bold font-['Public Sans'] leading-tight">{comment.username}</Text>
                  <Text className="text-fuchsia-800 text-xs font-normal">{comment.role}</Text>
                </View>
              </View>
            <Text className="text-black text-sm font-normal font-['Public Sans'] mt-2 mb-3">{comment.description}</Text>
              {comment.image && <Image source={{ uri: comment.image }} className="w-[200px] rounded-md mt-5 h-[100px]" />}
              <View className="flex-row gap-10 mt-[2px]">
                <TouchableOpacity onPress={() => handleLike(comment.id, comment.likes)} className="flex-row gap-2 items-center">
                  <View className="p-1 rounded-full border border-zinc-700">
                    <LikeIcon width={14} height={14} />
                  </View>
                  <Text className="text-neutral-400 text-xs font-medium font-['Public Sans']">{comment.likes} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDislike(comment.id, comment.dislikes)} className="flex-row gap-2 items-center">
                  <View className="p-1 rounded-full border border-zinc-700">
                    <CommentIcon width={14} height={14} />
                  </View>
                  <Text className="text-neutral-400 text-xs font-medium font-['Public Sans']">{comment.dislikes} Dislikes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        ))}
      </ScrollView>
      <CommentModal 
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitComment}
        inputText={inputText}
        setInputText={setInputText}
        pickImage={pickImage}
        image={image}
      />
    </ScrollView>
  );
}
