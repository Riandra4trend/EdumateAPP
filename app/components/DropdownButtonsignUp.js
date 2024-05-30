import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const categories = ['Pria', 'Info Sekolah'];

const DropdownButton = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategorySelect = (category) => {
      setSelectedCategory(category);
      setDropdownVisible(false);
    };

  return (
    <View style={{ zIndex: 1 }}>
      <TouchableOpacity
        className="flex-row items-center border border-gray-300 rounded-full px-4 py-2 mr-4"
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <Text className="text-black text-base font-medium font-['Public Sans'] mr-2">
          {selectedCategory || 'Pilih Kategori'}
        </Text>
        <FontAwesome5 name="chevron-down" size={16} color="#000" />
      </TouchableOpacity>
      {isDropdownVisible && (
        <View className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg">
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className="py-2 px-4"
              onPress={() => handleCategorySelect(category)}
            >
              <Text className="text-gray-800">{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropdownButton;
