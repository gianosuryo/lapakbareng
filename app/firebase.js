import _ from 'lodash'; // 4.17.4
import firebase from "react-native-firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC-9VcUx8QIdRJ4axpqOfunE2UH_ANXQQM",
    appId:"1:890943721713:android:b1c3dc16d6ee520c",
    authDomain: "lapak-bareng.firebaseapp.com",
    databaseURL: "https://lapak-bareng.firebaseio.com",
    projectId: "lapak-bareng",
    storageBucket: "lapak-bareng.appspot.com",
    messagingSenderId: "890943721713",
  };
  
export default firebase.initializeApp(firebaseConfig, 'lapak-bareng')