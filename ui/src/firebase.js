import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZdXUcbYjLlKsFKPiFW-7HrOA5DB3CI3k",
  authDomain: "surveymagic-3e443.firebaseapp.com",
  projectId: "surveymagic-3e443",
  storageBucket: "surveymagic-3e443.appspot.com",
  messagingSenderId: "172398446857",
  appId: "1:172398446857:web:edb40802c797cc35f7abd8",
  measurementId: "G-T5K13FBDX1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
