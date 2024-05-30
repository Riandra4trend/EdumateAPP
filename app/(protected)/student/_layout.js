import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../../context/AuthProvider";

export default function StudentLayout() {
    
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>
    );
}