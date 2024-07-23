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
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../URL";

//create context

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //create an account
  const createUser = (displayName, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // After creating the user, update the profile with the display name
        return updateProfile(userCredential.user, {
          displayName: displayName,
        }).then(() => {
          // Return the userCredential
          return userCredential;
        });
      }
    );
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

  //login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logOut = () => {
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
            //console.log(response);
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
    user,
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
