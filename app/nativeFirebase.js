import _ from 'lodash'; // 4.17.4
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC-9VcUx8QIdRJ4axpqOfunE2UH_ANXQQM",
    authDomain: "lapak-bareng.firebaseapp.com",
    databaseURL: "https://lapak-bareng.firebaseio.com",
    projectId: "lapak-bareng",
    storageBucket: "lapak-bareng.appspot.com",
    messagingSenderId: "890943721713"
  };
  
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();