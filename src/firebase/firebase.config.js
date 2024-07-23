/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//console.log(import.meta.env.VITE_SOME_KEY) // "123"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId:import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; */

//********************************************************** */






// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtmHcMuv3QMo4DFYfX8YMKQiw-MdngIpw",
  authDomain: "fir-tour-9f9ae.firebaseapp.com",
  projectId: "fir-tour-9f9ae",
  storageBucket: "fir-tour-9f9ae.appspot.com",
  messagingSenderId: "355640382122",
  appId: "1:355640382122:web:09e0d8684b03323202b6d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;