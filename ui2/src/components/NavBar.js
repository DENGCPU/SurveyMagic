import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function NavBar({ user, setShowSignIn }) {
  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error('退出登录时出错:', error));
  };

  const isAnonymous = user && user.isAnonymous;

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">问卷调查设计器</h1>
        <div>
          {user && !isAnonymous ? (
            <div className="flex items-center">
              <span className="text-white mr-4">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100"
              >
                退出登录
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100"
            >
              登录
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
