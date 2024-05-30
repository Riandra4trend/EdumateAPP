import { Slot, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthProvider';
import { View, Text, StyleSheet } from 'react-native';

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/signIn" />;
  }

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
