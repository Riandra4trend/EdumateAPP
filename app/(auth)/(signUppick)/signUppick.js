
import { useAuth } from "../../../context/AuthProvider";
import { View, StyleSheet, TouchableOpacity} from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import {Link, router} from "expo-router";
import Logo from "../../../assets/icons/logo.svg"; // Sesuaikan dengan path ikon logo Anda
import Siswa from "../../../assets/icons/siswa.svg";
import Tutor from "../../../assets/icons/tutor.svg";
import { Feather, Ionicons } from '@expo/vector-icons';
// import { useAuth } from "../../../context/AuthProvider";
import { useState } from "react";
export default function signUppick(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [errors,setErrors] = useState({
        email:"",
        password:"",
        repeatPassword:""
    })
    // const categories = [
    //     { icon: <Feather size={30} name="book" color="#000" />, label: 'Kursus', screen: 'Kursus' },
    //     { icon: <Ionicons name="chatbubbles-outline" size={30} color="#000" />, label: 'Tanya Soal', screen: 'Tanya_Soal' },
    //   ];
    // const displayedCategories = showAll ? categories : categories.slice(0, 4);
    // const {signUp} = useAuth();

    // const validate = ()=>{

    //     let newErrors = {
    //         email:"",
    //         password:""
    //     };

    //     if(!email){

    //         newErrors.email = "Email is required";
    //     }

    //     if(!password){
    //         newErrors.password = "Password is required";
    //     }

    //     if(!repeatPassword){
    //         newErrors.password = "Repeat Password is required";
    //     } else if(password !== repeatPassword){
    //         newErrors.repeatPassword = "Repeat Password is not equal with password";
    //     }

        

    //     return newErrors;

    // }

    // const handleSignIn = ()=>{
    //     const findErrors = validate();

    //     if(Object.values(findErrors).some(value=> value !== "")){
    //         console.log(findErrors)
    //         setErrors(findErrors)
    //     }else{
    //         signUp(email,password).then(res=>{
    //             console.log("login success",res)
    //             router.replace("/home");
    //         }).catch((error)=>{
           
    //             let newErrors = {
    //                 email: "",
    //                 password:""
    //             }
    //             if(error.code === "auth/invalid-credential"){
    //                 newErrors.email = "Email or password invalid.";
    //             }else{
    //                 newErrors.email = "Something went wrong.";
    //             }
    //             setErrors(newErrors)
    //         })
    //         // router.replace("/home");
    //     }
    // }
    return (
        <View style={styles.container}>
            <View className="justify-center items-center mb-10">
                <Logo width={250} height={80} className="mx-auto mb-5" />
            </View>
            <Title className="text-center text-black text-2xl font-normal font-['Public Sans'] mb-10">Saya Adalah...</Title>
            <View className="flex-row gap-4 justify-center mb-[50px]">
                <TouchableOpacity className="w-[156px] h-[180px] bg-gray-100 rounded-lg items-center justify-center " onPress={()=>router.push("/signUpStudent")}>
                    <Siswa width={84} height={84} className="mx-auto mb-5" />
                </TouchableOpacity>
                <TouchableOpacity className="w-[156px] h-[180px] bg-fuchsia-300 rounded-lg items-center justify-center" onPress={()=>router.push("/signUpTutor")}>
                    <Tutor width={84} height={84} className="mx-auto mb-5" />
                </TouchableOpacity>
            </View>
            <Button mode="contained" className="mb-3 p-1" buttonColor="#7B0086">
                Lanjut
            </Button>
           <View className="flex-row justify-center items-center">
                <Text className="text-black text-base font-normal font-['Public Sans']">Belum punya akun?</Text>
                <Link href="/signUppick">
                    <Text className="text-fuchsia-800 text-base font-bold ml-1">Buat akun.</Text>
                </Link>
            </View>
            
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    button: {
      marginBottom: 10,
    },
  });