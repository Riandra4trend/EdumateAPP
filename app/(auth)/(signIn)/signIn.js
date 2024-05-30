// import { useState } from "react";
// import { View, TouchableOpacity } from "react-native";
// import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
// import { Link, router } from "expo-router";
// import { useAuth } from "../../../context/AuthProvider";
// import GoogleIcon from "../../../assets/icons/google.svg"; // Sesuaikan dengan path ikon Google Anda
// import Logo from "../../../assets/icons/logo.svg"; // Sesuaikan dengan path ikon logo Anda

// export default function SignInScreen() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState({
//         email: "",
//         password: ""
//     });

//     const handleLogin = () => {
//         router.replace("/home");
//     }
//     const { signIn } = useAuth();

//     const validate = () => {
//         let newErrors = {
//             email: "",
//             password: ""
//         };

//         if (!email) {
//             newErrors.email = "Email is required";
//         }

//         if (!password) {
//             newErrors.password = "Password is required";
//         }

//         return newErrors;
//     };

//     const handleSignIn = () => {
//         const findErrors = validate();

//         if (Object.values(findErrors).some(value => value !== "")) {
//             console.log(findErrors)
//             setErrors(findErrors)
//         } else {
//             signIn(email, password).then(res => {
//                 console.log("login success", res)
//                 router.replace("/home");
//             }).catch((error) => {
//                 let newErrors = {
//                     email: "",
//                     password: ""
//                 }
//                 if (error.code === "auth/invalid-credential") {
//                     newErrors.email = "Email or password invalid.";
//                 } else {
//                     newErrors.email = "Something went wrong.";
//                 }
//                 setErrors(newErrors)
//             })
//         }
//     }
    
//     return (
//         <View className="flex-1 justify-center px-5">
//             <View className="justify-center items-center mb-[100px]">
//                 <Logo width={250} height={80} className="mx-auto mb-5" />
//             </View>
//             <View>
//                 <TextInput
//                     left={<TextInput.Icon icon="email" />}
//                     label="Email"
//                     value={email}
//                     mode="outlined"
//                     onChangeText={(email) => {
//                         setEmail(email);
//                         setErrors(errors => ({ ...errors, email: "" }));
//                     }}
//                     error={errors.email !== ""}
//                     className="rounded-sm"
//                     colors={{ primary: "#7B0086" }}
//                 />
//                 <HelperText type="error" visible={errors.email !== ""}>{errors.email}</HelperText>
//                 <TextInput
//                     left={<TextInput.Icon icon="key" />}
//                     label="Password"
//                     value={password}
//                     mode="outlined"
//                     onChangeText={(password) => {
//                         setPassword(password);
//                         setErrors(errors => ({ ...errors, password: "" }));
//                     }}
//                     error={errors.password !== ""}
//                     secureTextEntry
//                     className="rounded-sm"
//                     colors={{ primary: "#7B0086" }}
//                 />
//             </View>
//             <HelperText type="error" visible={errors.password !== ""}>{errors.password}</HelperText>
//             {/* <Button mode="contained" className="mb-3 p-2" onPress={handleSignIn}>
//                 Log In
//             </Button> */}
//             <Button mode="contained" className="mb-3 p-1" buttonColor="#7B0086" onPress={handleSignIn}>
//                 Log In
//             </Button>
//             <Text className="mb-3 text-center text-neutral-400 text-base font-normal font-['Public Sans']">ATAU</Text>
//             <TouchableOpacity className="flex-row justify-center border border-zinc-200 rounded-full p-3 mb-3" onPress={() => console.log('Login with Google')}>
//                 <View className="mr-12 ml-[-70px]">
//                     <GoogleIcon width={24} height={24} />
//                 </View>
//                 <Text className="text-neutral-950 text-base font-medium font-['Public Sans']">Continue With Google</Text>
//             </TouchableOpacity>
//             <View className="flex-row justify-center items-center">
//                 <Text className="text-black text-base font-normal font-['Public Sans']">Belum punya akun?</Text>
//                 <Link href="/signUppick">
//                     <Text className="text-fuchsia-800 text-base font-bold ml-1">Buat akun.</Text>
//                 </Link>
//             </View>
//         </View>
//     );
// }
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { Link, router } from "expo-router";
import { useAuth } from "../../../context/AuthProvider";
import GoogleIcon from "../../../assets/icons/google.svg"; // Adjust the path to your Google icon
import Logo from "../../../assets/icons/logo.svg"; // Adjust the path to your logo

export default function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const { signIn } = useAuth();

    const validate = () => {
        let newErrors = {
            email: "",
            password: ""
        };

        if (!email) {
            newErrors.email = "Email is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };

    const handleSignIn = () => {
        const findErrors = validate();

        if (Object.values(findErrors).some(value => value !== "")) {
            console.log(findErrors)
            setErrors(findErrors)
        } else {
            signIn(email, password).then(res => {
                console.log("login success", res)
                router.replace("/");
            }).catch((error) => {
                let newErrors = {
                    email: "",
                    password: ""
                }
                if (error.code === "auth/invalid-credential") {
                    newErrors.email = "Email or password invalid.";
                } else {
                    newErrors.email = "Something went wrong.";
                }
                setErrors(newErrors)
            })
        }
    }

    return (
        <View className="flex-1 justify-center px-5">
            <View className="justify-center items-center mb-[100px]">
                <Logo width={250} height={80} className="mx-auto mb-5" />
            </View>
            <View>
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
                    colors={{ primary: "#7B0086" }}
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
                    colors={{ primary: "#7B0086" }}
                />
            </View>
            <HelperText type="error" visible={errors.password !== ""}>{errors.password}</HelperText>
            <Button mode="contained" className="mb-3 p-1" buttonColor="#7B0086" onPress={handleSignIn}>
                Log In
            </Button>
            <Text className="mb-3 text-center text-neutral-400 text-base font-normal font-['Public Sans']">ATAU</Text>
            <TouchableOpacity className="flex-row justify-center border border-zinc-200 rounded-full p-3 mb-3" onPress={() => console.log('Login with Google')}>
                <View className="mr-12 ml-[-70px]">
                    <GoogleIcon width={24} height={24} />
                </View>
                <Text className="text-neutral-950 text-base font-medium font-['Public Sans']">Continue With Google</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center items-center">
                <Text className="text-black text-base font-normal font-['Public Sans']">Belum punya akun?</Text>
                <Link href="/signUppick">
                    <Text className="text-fuchsia-800 text-base font-bold ml-1">Buat akun.</Text>
                </Link>
            </View>
        </View>
    );
}
