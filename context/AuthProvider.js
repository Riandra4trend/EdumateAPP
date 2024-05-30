import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth, firestore, storage } from '../db/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, setDoc, getDoc, addDoc, collection, getDocs, updateDoc, arrayUnion 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { Link, router } from "expo-router";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [icon, setIcon] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [isCoursesUpdated, setIsCoursesUpdated] = useState(false);
    const [isUserCoursesUpdated, setIsUserCoursesUpdated] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUser({ ...userData, uid: user.uid });
                    setRole(userData.role);
                    setIcon(userData.icon);
                }
                setCurrentUser(user);
            } else {
                setUser(null);
                setRole(null);
            }
            if (initializing) setInitializing(false);
        });
        return unsubscribe;
    }, [initializing]);

    useEffect(() => {
        fetchCoursesAvail();
    }, [user, allCourses]);

    const signIn = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setRole(docSnap.data().role);
            setIcon(docSnap.data().icon);
        }
        return userCredential;
    };

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const uploadCV = async (userUid, cvFile) => {
        const storageRef = ref(storage, `cvs/${userUid}/${cvFile.name}`);
        const filesInFolder = await listAll(ref(storage, `cvs/${userUid}`));
        const fileNames = filesInFolder.items.map(item => item.name);
        if (fileNames.includes(cvFile.name)) {
            console.error("File with the same name already exists!");
            return null;
        }
        const snapshot = await uploadBytes(storageRef, await fetch(cvFile.uri).then(res => res.blob()));
        return getDownloadURL(snapshot.ref);
    };

    const signUpWithDetails = async (email, password, details) => {
        const userCredential = await signUp(email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: details.username
        });
        let cvUrl = null;
        if (details.cv) {
            cvUrl = await uploadCV(user.uid, details.cv);
        }
        await setDoc(doc(firestore, "users", user.uid), {
            email,
            username: details.username,
            status: details.status,
            noWhatsapp: details.noWhatsapp,
            gender: details.gender,
            cv: cvUrl,
            icon: details.icon,
            role: details.role
        });
        return user;
    };

    const signOut = () => {
        setRole(null);
        setIcon(null);
        return firebaseSignOut(auth);
    };

    const signUpTutor = async (email, password, details) => {
        const user = await signUpWithDetails(email, password, { ...details, role: "Tutor" });
        return user;
    };

    const addCourse = async (courseDetails) => {
        if (!user) {
            throw new Error('User not authenticated');
        }
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
            throw new Error('User document does not exist');
        }
        const teacherName = userDocSnap.data().username;
        const courseRef = await addDoc(collection(firestore, 'courses'), {
            ...courseDetails,
            teacherId: user.uid,
            teacherName,
            participants: 0
        });
        fetchCourses();
        setIsCoursesUpdated(true);
        return courseRef;
    };

    useEffect(() => {
        const loadCourses = async () => {
            const fetchedCourses = await fetchCourses();
            setCourses(fetchedCourses);
        };

        loadCourses();
        setIsCoursesUpdated(false); // Reset the flag after loading courses
    }, [isCoursesUpdated]);

    const fetchCourses = async () => {
        const coursesSnapshot = await getDocs(collection(firestore, 'courses'));
        const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllCourses(coursesList);
        return coursesList;
    };

    const enrollCourse = async (courseId) => {
        if (!user) {
            throw new Error('User not authenticated');
        }
        const courseDocRef = doc(firestore, "courses", courseId);
        const courseDocSnap = await getDoc(courseDocRef);
        if (!courseDocSnap.exists()) {
            throw new Error('Course document does not exist');
        }
        const participants = courseDocSnap.data().participants;
        const updatedParticipants = participants + 1;

        await updateDoc(courseDocRef, {
            participants: updatedParticipants
        });

        const userDocRef = doc(firestore, "users", user.uid);
        await updateDoc(userDocRef, {
            courses: arrayUnion(courseId)
        });
        fetchUserCourses();
        fetchCourses();
        setIsUserCoursesUpdated(true);
    };

    const fetchUserCourses = async () => {
        if (!user) {
            throw new Error('User not authenticated');
        }
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const courseIds = userData.courses || [];
            const coursesPromises = courseIds.map(courseId => getDoc(doc(firestore, "courses", courseId)));
            const coursesSnapshots = await Promise.all(coursesPromises);
            const coursesList = coursesSnapshots.map(courseDocSnap => {
                if (courseDocSnap.exists()) {
                    return { id: courseDocSnap.id, ...courseDocSnap.data() };
                } else {
                    return null;
                }
            }).filter(course => course !== null);
            setUserCourses(coursesList);
            return coursesList;
        } else {
            return [];
        }
    };

    const fetchCoursesAvail = () => {
        if (user && userCourses.length > 0 && allCourses.length > 0) {
            const filtered = allCourses.filter(course => !userCourses.map(uc => uc.id).includes(course.id));
            setFilteredCourses(filtered);
        }
    };

    useEffect(() => {
        fetchCoursesAvail();
    }, [user, allCourses]);

    return (
        <AuthContext.Provider value={{ 
            user, 
            role,
            icon, 
            signIn, 
            signUp, 
            signUpWithDetails, 
            signOut, 
            addCourse, 
            fetchCourses, 
            enrollCourse, 
            fetchUserCourses, 
            allCourses, 
            filteredCourses,
            signUpTutor,
            isCoursesUpdated,
            isUserCoursesUpdated,
            courses,
        }}>
            {!initializing && children}
        </AuthContext.Provider>
    );
}
