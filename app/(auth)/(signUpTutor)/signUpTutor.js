import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, HelperText, Text } from 'react-native-paper';
import { Link, router } from "expo-router";
import GoogleIcon from "../../../assets/icons/google.svg";
import Logo from "../../../assets/icons/logo.svg";
import { useAuth } from "../../../context/AuthProvider";
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

export default function SignUpTutor() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [noWhatsapp, setNoWhatsapp] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [cv, setCv] = useState(null);
    const [cvName, setCvName] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        noWhatsapp: "",
        username: "",
        gender: "",
        cv: ""
    });

    const { signUpWithDetails } = useAuth();

    const handleSignUp = async () => {
        if (password !== repeatPassword) {
            setErrors(errors => ({ ...errors, repeatPassword: "Passwords do not match" }));
            return;
        }

        if (!cv) {
            setErrors(errors => ({ ...errors, cv: "CV is required" }));
            return;
        }

        const status = "Tutor";
        let icon = "";
        if (gender === "Wanita" && status === "Tutor") {
            icon = "https://firebasestorage.googleapis.com/v0/b/edumateapp-90121.appspot.com/o/Remove-bg%204.png?alt=media&token=319f660b-e32c-40b7-b941-cad1720bbf65";
        } else if (gender === "Pria" && status === "Tutor") {
            icon = "https://firebasestorage.googleapis.com/v0/b/edumateapp-90121.appspot.com/o/Remove-bg%205.png?alt=media&token=ce1cb831-b065-43db-978e-ce0fb4f4b3e1";
        }

        const details = { username, status, noWhatsapp, gender, cv, icon, role: "Tutor" };

        try {
            await signUpWithDetails(email, password, details);
            router.replace("/tutor/tabs/home");
        } catch (error) {
            console.error("Error signing up: ", error);
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
        const uri = result.assets[0].uri;
        setCv({ uri, name: result.assets[0].name });
        
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
                <Button mode="contained" className="mb-3 p-1" buttonColor="#7B0086" onPress={pickDocument}>
                    Upload CV
                </Button>
                <View>
                    {cv && <Text className="mb-3 text-center text-neutral-400 text-base font-normal font-['Public Sans']">CV Uploaded: {cv.name}</Text>}
                </View>
                <HelperText type="error" visible={errors.cv !== ""}>{errors.cv}</HelperText>
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
