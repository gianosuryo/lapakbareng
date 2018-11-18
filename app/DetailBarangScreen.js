
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
	Button
} from 'react-native';

import { connect } from 'react-redux';
import {addToCart} from './state/cart/actions';

import AddModal from './AddModal';

class DetailBarangScreen extends Component<{}> {
	constructor(props){
		super(props);
		this._onPressCart = this._onPressCart.bind(this);
	}

	prepareCart = (id, kuantitas) => {
		alert("Anda menambahkan " + id + " sebanyak " + kuantitas);
		this.props.addToCart(id, kuantitas);
	}
	
	_onPressCart(idBarang, hargaBarang, stokBarang){
		this.refs.addModal.showAddModal();
		this.refs.addModal.setState({
			id: idBarang,
			harga : hargaBarang,
			stok : stokBarang,
		})
		
	}

  render() {
		const { params } = this.props.navigation.state;
		const namakategori = params ? params.namaKategori : null;
		const idbarang = params ? params.idBarang : null;
		const namabarang = params ? params.namaBarang : null;
		const hargabarang = params ? params.hargaBarang : null;
		const kuantitasbarang = params ? params.kuantitasBarang : null;
		const linkbarang = params ? params.linkBarang : null;


		let screenWidth = Dimensions.get('window').width;
		let screenHeight = Dimensions.get('window').height;
		
    return (
      <View style={styles.container}>
        <AddModal
					ref={'addModal'}
					prepareCart={this.prepareCart}
				/>

        <View style={styles.tabTop}>
					<View style={styles.tabNamaBarang}>
						<Text style={{fontSize:10}}>{namakategori.toUpperCase()}</Text>
						<Text style={{fontSize:14,fontWeight:'bold'}}>{namabarang}</Text>
					</View>
					<View style={styles.tabHarga}>
						<Text style={{fontSize:10}}>HARGA</Text>
						<Text style={{fontSize:14,fontWeight:'bold'}}>Rp. {hargabarang}/pcs</Text>
					</View>
        </View>

				<View style={styles.tabWarung}>
					<Text style={{fontSize:14,fontWeight:'bold'}}>Warung Mc. Donald</Text>
					<Text style={{fontSize:10}}>Jl. Raya Tulungagung, No. 4, Taman</Text>
				</View>
				<TouchableOpacity style={styles.buttonContainer} onPress={() => this._onPressCart(idbarang, hargabarang, kuantitasbarang)}>
					<Image style={styles.buttonLogo} source={require('./images/icons8_Shopping_Cart_32.png')}/>
					<Text style={styles.buttonText}>PESAN</Text>
				</TouchableOpacity>
				
      </View>

    );
  }
}

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = {
	addToCart
}

const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1
	},
  logo: {
    width:30,
    height:30
	},
	logoItem: {
    width:'50%',
		height:'50%',
	},
	logoUtama: {
    width:60,
    height:30
	},
	imageScroll:{
		backgroundColor:'#5f9ea0',
		width:widthScreen,
		height:widthScreen,
		justifyContent:'center',
		alignItems:'center'
	},
	tabTop:{
		flexDirection:'row',
		backgroundColor:'#f3f3f3',
		alignItems:'center',
		justifyContent:'space-between',
		paddingHorizontal:15,
		paddingVertical:10,
	},
	tabWarung:{
		flexDirection:'column',
		alignItems:'flex-start',
		paddingHorizontal:15,
		paddingVertical:10,
	},
	tabNamaBarang:{
		flexDirection:'column',
		alignItems:'flex-start',
	},
	tabHarga:{
		flexDirection:'column',
		alignItems:'flex-end',
	},
	buttonContainer : {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
    paddingVertical:12,
		paddingHorizontal:12,
		backgroundColor:'#f9ba32',
	},
	buttonText : {
    textAlign: 'center',
    color: '#FFF',
		fontWeight: '700',
		fontSize:11,
		marginHorizontal:2
	},
	buttonLogo:{
		width:12,
		height:12,
		marginHorizontal:2
	},
	detailBarang:{
		backgroundColor:'#f3f3f3',
		alignItems:'flex-start',
		paddingHorizontal:15,
		paddingVertical:10,
	},

	textItem:{
		fontSize:10,
		fontWeight:'bold',
		textAlign:'center'
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailBarangScreen);