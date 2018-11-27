import {AsyncStorage} from 'react-native';

const saveToLocalStorage = async (address) => {
  await AsyncStorage.setItem('address', JSON.stringify(address));
}//

const getFromLocalStorage = async () => {
	const emptyAddress = {lat:0,lng:0,ongkos:0,alamat:"-"};
  const address = JSON.parse(await AsyncStorage.getItem('address'));
  
	return address || emptyAddress
}

export const fetch = async() => getFromLocalStorage();//

export const setAddress = async(lat, lng) => {
  const newAddress = {lat, lng};
  saveToLocalStorage(newAddress);

  return newAddress;
}

export const removeAddress = async() => {
  const emptyAddress = {lat:0,lng:0,ongkos:0,alamat:"-"};

  saveToLocalStorage(emptyAddress);
  return emptyAddress;
}
