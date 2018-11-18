import {AsyncStorage} from 'react-native';

const saveToLocalStorage = async (cart) => {
  await AsyncStorage.setItem('cart', JSON.stringify(cart));
}

const getFromLocalStorage = async () => {
	const emptyCart = {items:[]};
  const cart = JSON.parse(await AsyncStorage.getItem('cart'));
  

	return cart || emptyCart
}

export const fetch = async() => getFromLocalStorage();
export const addToCart = async(id, kuantitas) => {
  const cart = await fetch();
  const exists = cart.items.findIndex(item => item.id === id) > -1;

  if (exists){
    throw {message: 'Item already exists'};
  }

  const newItem = {id, kuantitas};
  const newCart = {
    ...cart,
    items: [
      ...cart.items,
      newItem,
    ]
  };

  saveToLocalStorage(newCart);
  return newCart;
}

export const removeFromCart = async(id) => {
  const cart = await fetch();
  const sequence = cart.items.findIndex(item => item.id === id)
  const exists = sequence > -1;
  const newCart = {
    ...cart,
    items: [
      ...cart.items
    ]
  };

  if (exists){
    newCart.items.splice(sequence, 1); //delete newCart.items[sequence]; //
  }

  saveToLocalStorage(newCart);
  return newCart;
}

//addToCart('asdassdasfa', 5)

