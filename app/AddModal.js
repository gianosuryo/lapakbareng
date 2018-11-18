
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Button,
	Platform,
  TextInput,
  AsyncStorage
} from 'react-native';

import Modal from 'react-native-modalbox';

export default class AddModal extends Component<{}> {
  constructor(props){
    super(props)
    this.state = {
      id : 0,
      kuantitas : 0,
      harga : 0,
      stok: 0,
      listCartId: [],
      listCartKuantitas: []
    }
  }

  addNew = (id, kuantitas) => {
    this.props.prepareCart(id, kuantitas);
  }
 
  showAddModal = () => {
    this.refs.myModal.open();
    //alert(JSON.stringify(this.state.listCartId))
  }

  addQuantity = () => {
    if(this.state.kuantitas != this.state.stok){
      this.setState({kuantitas: this.state.kuantitas + 1});
    }
  }

  substractQuantity = () => {
    if(this.state.kuantitas != 0){
      this.setState({kuantitas: this.state.kuantitas - 1});
    }    
  }

  render() {
    return (
      <Modal
        ref={"myModal"}
        style={styles.modalbox}
        position='center'
        backdrop={true}
        onClosed={() => {
        alert("Modal Closed");
        }}
      >

      <Text style={styles.judul}>Masukkan Jumlah ingin Anda Beli</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.inputNumber}>{this.state.kuantitas} pcs</Text>
        <Text style={styles.inputTotal}>Rp. {this.state.kuantitas * this.state.harga}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonPlusMin} onPress={() => this.substractQuantity()}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPlusMin} onPress={() => this.addQuantity()}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.addNew(this.state.id, this.state.kuantitas)}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
      
    </Modal>
  );
  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalbox:{
    borderRadius: Platform.OS === 'ios' ? 30 : 0,
    shadowRadius: 10,
    width: screenWidth - 80,
    height:160
  },
  judul:{
    fontSize: 12,
    fontWeight: 'bold',
    padding:10
  },
  inputGroup:{
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#e0e0e0'
  },
  buttonGroup:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#e0e0e0'
  },
  inputNumber: {
    width:'30%',
    textAlign: 'center'
  },
  inputTotal: {
    width:'70%',
    textAlign: 'center'
  },
  buttonContainer : {
		backgroundColor:'#0b8f6e',
    borderRadius:10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width:'30%',
    alignContent:'flex-end'
  },
  buttonPlusMin : {
		backgroundColor:'#0b8f6e',
		borderRadius:10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width:'15%',
    alignContent:'flex-start'
	},
	buttonText : {
    color: '#FFF',
    textAlign: 'center',
		fontWeight: '700',
		fontSize:11,
	},
});