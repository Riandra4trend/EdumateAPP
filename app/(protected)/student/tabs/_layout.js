import { Tabs } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from 'react-native';

export default function StudentTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7B0086",
        tabBarInactiveTintColor: "#7B0086",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
        <Tabs.Screen
        name="kursus"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.focusedIcon : null}>
              <AntDesign size={24} name="book" color={color} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.focusedIcon : null}>
              <AntDesign size={24} name="home" color={color} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tanya_soal"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.focusedIcon : null}>
              <Ionicons size={24} name="chatbubbles-outline" color={color} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  focusedIcon: {
    backgroundColor: '#F0CFF3',
    borderRadius: 12,
    padding: 5,
  },
});
