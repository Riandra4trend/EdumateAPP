import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, HelperText, Text } from 'react-native-paper';
import { Link, router } from "expo-router";
import GoogleIcon from "../../../assets/icons/google.svg"; // Sesuaikan dengan path ikon Google Anda
import Logo from "../../../assets/icons/logo.svg"; // Sesuaikan dengan path ikon logo Anda
import { useAuth } from "../../../context/AuthProvider";
import { Picker } from '@react-native-picker/picker';

export default function SignUpStudent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [noWhatsapp, setNoWhatsapp] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        noWhatsapp: "",
        username: "",
        gender: ""
    });

    const { signUpWithDetails } = useAuth();

    const handleSignUp = async () => {
        if (password !== repeatPassword) {
            setErrors(errors => ({ ...errors, repeatPassword: "Passwords do not match" }));
            return;
        }

        const status = "student";
        let icon = "";
        if (gender === "Wanita" && status === "student") {
            icon = "https://firebasestorage.googleapis.com/v0/b/edumateapp-90121.appspot.com/o/Remove-bg%201.png?alt=media&token=bff740b0-1f1b-47e7-beb5-81db92821ee4";
        } else if (gender === "Pria" && status === "student") {
            icon = "https://firebasestorage.googleapis.com/v0/b/edumateapp-90121.appspot.com/o/Remove-bg%202.png?alt=media&token=4aafff69-3b6d-4344-be0d-200ccef498d7";
        }

        const details = { username, status, noWhatsapp, gender, cv: null, icon, role:"Student" };

        try {
            await signUpWithDetails(email, password, details);
            router.replace("/student/tabs/home");
        } catch (error) {
            console.error("Error signing up: ", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View className="justify-center items-center mb-9 mt-[60px]">
                <Logo width={250} height={80} className="mt-[200px] mx-auto mb-5" />
            </View>
            <View>
                <TextInput
                    left={<TextInput.Icon icon="account" />}
                    label="Username"
                    value={username}
                    mode="outlined"
                    onChangeText={(username) => {
                        setUsername(username);
                        setErrors(errors => ({ ...errors, username: "" }));
                    }}
                    error={errors.username !== ""}
                    className="rounded-sm"
                />
                <HelperText type="error" visible={errors.username !== ""}>{errors.username}</HelperText>
                <TextInput
                    left={<TextInput.Icon icon="email" />}
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={(email) => {
                        setEmail(email);
                        setErrors(errors => ({ ...errors, email: "" }));
                    }}
                    error={errors.email !== ""}
                    className="rounded-sm"
                />
                <HelperText type="error" visible={errors.email !== ""}>{errors.email}</HelperText>
                <TextInput
                    left={<TextInput.Icon icon="key" />}
                    label="Password"
                    value={password}
                    mode="outlined"
                    onChangeText={(password) => {
                        setPassword(password);
                        setErrors(errors => ({ ...errors, password: "" }));
                    }}
                    error={errors.password !== ""}
                    secureTextEntry
                    className="rounded-sm"
                />
                <HelperText type="error" visible={errors.password !== ""}>{errors.password}</HelperText>
                <TextInput
                    left={<TextInput.Icon icon="key" />}
                    label="Repeat Password"
                    value={repeatPassword}
                    mode="outlined"
                    onChangeText={(password) => {
                        setRepeatPassword(password);
                        setErrors(errors => ({ ...errors, repeatPassword: "" }));
                    }}
                    error={errors.repeatPassword !== ""}
                    secureTextEntry
                    className="rounded-sm"
                />
                <HelperText type="error" visible={errors.repeatPassword !== ""}>{errors.repeatPassword}</HelperText>
                <TextInput
                    left={<TextInput.Icon icon="phone" />}
                    label="No. Whatsapp"
                    value={noWhatsapp}
                    mode="outlined"
                    onChangeText={(noWhatsapp) => {
                        setNoWhatsapp(noWhatsapp);
                        setErrors(errors => ({ ...errors, noWhatsapp: "" }));
                    }}
                    error={errors.noWhatsapp !== ""}
                    className="rounded-sm"
                />
                <HelperText type="error" visible={errors.noWhatsapp !== ""}>{errors.noWhatsapp}</HelperText>
                <View className="border border-[#7B0086] rounded-sm mb-5">
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        className="h-12 w-full"
                    >
                        <Picker.Item label="Pilih Jenis Kelamin" value="" />
                        <Picker.Item label="Pria" value="Pria" />
                        <Picker.Item label="Wanita" value="Wanita" />
                    </Picker>
                </View>
            </View>
            <Button mode="contained" className="mb-3 p-1" buttonColor="#7B0086" onPress={handleSignUp}>
                Sign Up
            </Button>
            <Text className="mb-3 text-center text-neutral-400 text-base font-normal font-['Public Sans']">ATAU</Text>
            <TouchableOpacity className="flex-row justify-center border border-zinc-200 rounded-full p-3 mb-3" onPress={() => console.log('Login with Google')}>
                <View className="mr-12 ml-[-70px]">
                    <GoogleIcon width={24} height={24} />
                </View>
                <Text className="text-neutral-950 text-base font-medium font-['Public Sans']">Continue With Google</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center items-center mb-10">
                <Text className="text-black text-base font-normal font-['Public Sans']">Sudah punya akun?</Text>
                <Link href="/signIn">
                    <Text className="text-fuchsia-800 text-base font-bold ml-1">Log in di sini.</Text>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        padding: 16,
        flexGrow: 1,
        justifyContent: 'center'
    }
});
