import _ from 'lodash';
import firebase from '../../nativeFirebase'

const ref = firebase.database().ref();

export const fetchAll = async() => ref.once("value").then(function(snapshot) {
  var categories = snapshot.child("kategori").val();
  //alert(JSON.stringify(categories));
  return categories;
});