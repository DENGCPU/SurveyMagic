import React, { useState, useEffect } from 'react';
import './App.css';
import SurveyDesigner from './components/SurveyDesigner';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import { auth } from './firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log({currentUser})
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error('匿名登录失败:', error);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <NavBar user={user} setShowSignIn={setShowSignIn} />
      <SurveyDesigner />
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <SignIn setShowSignIn={setShowSignIn} />
        </div>
      )}
    </div>
  );
}

export default App;
