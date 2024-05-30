import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const QuestionModal = ({ isVisible, onClose, selectedCategory, setSelectedCategory }) => {
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState(null);

  const categories = ['Kursus', 'Tanya Soal', 'Bank Soal', 'Materi', 'Try out', 'Info Sekolah'];

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.categorySelector}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Apa yang ingin kamu tanyakan?"
              placeholderTextColor="#ccc"
              multiline
              onChangeText={setInputText}
              value={inputText}
            />
            <View style={styles.footer}>
              <Text style={styles.characterCount}>300/300</Text>
              <TouchableOpacity onPress={() => {/* Handle image upload */}}>
                <View style={styles.imageButton}>
                  <Feather name="image" size={12} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
            {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    fontSize: 18,
    color: 'red',
  },
  content: {
    marginTop: 10,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: 'black',
  },
  categoryText: {
    color: '#ccc',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  characterCount: {
    color: '#fuchsia',
  },
  imageButton: {
    width: 24,
    height: 24,
    backgroundColor: '#fuchsia',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});

export default QuestionModal;
