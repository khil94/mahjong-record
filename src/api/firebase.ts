// Import the functions you need from the SDKs you need
import { IGameData, IPostGameData, IUser } from "@/types/dataTypes";
import { converter } from "@/utils/globalFuncs";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: "majak-62321",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MEASSGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const convertPoint = <T>(path: string) =>
  collection(db, path).withConverter(converter<T>());

export const getUserData = () => getDocs(convertPoint<IUser>("users"));

export const getAllGameData = () => getDocs(convertPoint<IGameData>("games"));

export const postUserData = async (data: IPostGameData, userData: IUser[]) => {
  const resp = await addDoc(collection(db, "games"), data);
  await updateDoc(doc(db, "games", resp.id), { id: resp.id });
  data.detail.forEach(async (v) => {
    const target = userData.find((t) => t.id === v.userId);
    await updateDoc(doc(db, "users", target.id), {
      currentUma: target.currentUma + v.uma,
      history: arrayUnion({
        date: data.date,
        gameId: resp.id,
        rank: v.rank,
        score: v.score,
        uma: v.uma,
        changedUma: target.currentUma + v.uma,
      }),
    });
  });
};

export const getUserDataById = (id: string) => getDoc(doc(db, "users", id));
