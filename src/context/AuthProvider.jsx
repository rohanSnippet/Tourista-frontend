import React, { createContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  TwitterAuthProvider,
  RecaptchaVerifier,
  GithubAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../URL";

//create context

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //create an account
  const createUser = async (displayName, email, password) => {
    console.log(displayName, " ", email, " ", password);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
    return userCredential;
  };

  //signUp with gmail
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //sign in with twitter
  const signInWithTwitter = () => {
    const twitterProvider = new TwitterAuthProvider();
    return signInWithPopup(auth, twitterProvider);
  };

  const signUpWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };
  //login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logOut = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  //update profile
  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  //forgot password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //phone number signup
  /* const setupRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return recaptchaVerifier;
  }; */

  const setupRecaptcha = () => {
    return new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });
  };

  //check sign-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          const userInfo = { email: currentUser.email };
          axios.post(`${baseUrl}/jwt`, userInfo).then((response) => {
            if (response.data.token) {
              localStorage.setItem("access-token", response.data.token);
            } else {
              localStorage.removeItem("access-token");
            }
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      []
    );

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    auth,
    user,
    signUpWithGithub,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    updateUserProfile,
    loading,
    resetPassword,
    signInWithTwitter,
    setupRecaptcha,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
