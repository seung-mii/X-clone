// script 태그로 firebase를 추가
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOJRX76hbh4ph3HjDv5yv9RwAy1ebruwM",
  authDomain: "tw-79768.firebaseapp.com",
  projectId: "tw-79768",
  storageBucket: "tw-79768.appspot.com",
  messagingSenderId: "192765104542",
  appId: "1:192765104542:web:f64df379f6ca07f431468f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // app에 대한 인증 서비스 사용