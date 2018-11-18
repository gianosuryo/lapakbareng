import _ from 'lodash'; // 4.17.4
import firebase from '../../nativeFirebase'

const ref = firebase.database().ref();

export const fetchAll = async() => ref.once("value").then(function(snapshot) {
  var toko = snapshot.child("toko").val();
  return toko;
});