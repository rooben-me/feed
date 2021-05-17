import React from "react";
import { auth } from "../lib/firebase";
import firebase from "firebase/app";

function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className=" h-screen flex items-center justify-center">
      <button
        className=" p-4 text-yellow-500 font-semibold text-xl border-4 border-yellow-500 transition-all ease-in-out duration-300 hover:bg-yellow-500 hover:text-white"
        onClick={signInWithGoogle}
      >
        Login with Google
      </button>
    </div>
  );
}

export default Login;
