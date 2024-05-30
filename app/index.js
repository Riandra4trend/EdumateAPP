// index.js
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthProvider';

export default function Index() {
    const { user, role } = useAuth();

    if (!user) {
        return <Redirect href="/signIn" />;
    }

    if (role === 'Tutor') {
        return <Redirect href="/tutor/tabs/home" />;
    }

    return <Redirect href="/student/tabs/home" />;
}
