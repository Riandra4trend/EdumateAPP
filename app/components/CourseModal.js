import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ModalKursus({ onAddCourse }) {
    const [courseDetails, setCourseDetails] = useState({
        title: '',
        material: '',
        quota: '',
        date: '',
        time: '',
        price: '',
        link: '',
    });

    const handleInputChange = (field, value) => {
        setCourseDetails({
            ...courseDetails,
            [field]: value
        });
    };

    const handleSubmit = () => {
        onAddCourse(courseDetails);
    };

    return (
        <ScrollView className="px-4 pt-3">
            <View className=" bg-neutral-300 w-[100px] h-[5px] mx-auto mb-5"></View>
            <Text className="text-neutral-950 text-[32px] font-bold font-['Public Sans'] leading-9">Tambah Kursus</Text>
            <View className="mt-6">
                <View className="flex-col gap-3">
                    {[
                        { label: 'Nama Course', placeholder: 'Vektor dan Ruangan', field: 'title' },
                        { label: 'Materi', placeholder: 'Materi Course', field: 'material' },
                        { label: 'Kuota', placeholder: 'Kuota', field: 'quota' },
                        { label: 'Tanggal', placeholder: 'Tanggal', field: 'date' },
                        { label: 'Waktu', placeholder: 'Waktu', field: 'time' },
                        { label: 'Harga', placeholder: 'Harga', field: 'price' },
                        { label: 'Link', placeholder: 'Link', field: 'link' },
                    ].map((input, index) => (
                        <View key={index} className="mb-2">
                            <Text className="mb-2 text-base font-medium">{input.label}</Text>
                            <TextInput
                                placeholder={input.placeholder}
                                className="w-full h-12 px-3 border border-gray-300 rounded"
                                value={courseDetails[input.field]}
                                onChangeText={value => handleInputChange(input.field, value)}
                            />
                        </View>
                    ))}
                    <TouchableOpacity className="py-4 bg-[#F0CFF3] rounded-full" onPress={handleSubmit}>
                        <Text className="text-center text-fuchsia-800 text-base font-medium">Tambah Kursus</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
