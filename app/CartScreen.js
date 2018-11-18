import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	ActivityIndicator,
	ListView,
	Alert,
	Dimensions
} from 'react-native';
import {
	Container, 
	Header, 
	Content, 
	Button, 
	List, 
	ListItem
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

import {fetchProducts} from './state/product/actions';

import {fetchCart} from './state/cart/actions';
import {removeFromCart} from './state/cart/actions';

import {fetchAddress} from './state/address/actions';

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

class CartScreen extends Component<{}> {
	constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}
	
	componentWillMount(){
		this.props.fetchProducts();
		this.props.fetchCart();
		this.props.fetchAddress();
	}

	removeList = (id) => {
		Alert.alert(
			'Peringatan',
			'Anda akan menghapus item ini',
			[
			  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'OK', onPress: () => {
				  this.props.removeFromCart(id);
				}
			  },
			],
			{ cancelable: true }
		  )
	}
	
  render() {
	const {
		isProductsLoading,
		products,
		cart,
		address
	} = this.props;

	var x = 0;
	var total = 0;
	const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

	if(isProductsLoading){
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<ActivityIndicator size="large" color="dodgerblue" />
			</View>
		)
	}

	cart.items.map(item =>	{
		total = total + (item.product.harga * item.kuantitas);
	})
	
		
    return (
      <View style={styles.container}>				
				<View style={styles.tabTop}>
					<View style={styles.tabOngkos}>
						<Text style={{fontSize:10}}>Ongkos Kirim</Text>
						<Text style={{fontSize:16,fontWeight:'bold'}}>{"Rp. " + (address.ongkos * 1).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
						<Text style={{fontSize:10,fontWeight:'bold'}}>Tujuan : {address.alamat}</Text>
					</View>
					<TouchableOpacity style={styles.buttonLocation} onPress={() => this.props.navigation.navigate('Map')}>
						<Text style={styles.buttonText}>SET LOCATION</Text>
					</TouchableOpacity>
				</View>
				
				<List 
					dataSource={this.ds.cloneWithRows(cart.items)}
					renderRow={(item, secId, index) => 
						<ListItem style={styles.item}>
							<Text style={styles.nomorItem}>{parseInt(index) + 1}</Text>
							<Text style={styles.namaItem}>{item.product.nama}</Text>
							<Text style={styles.hargaItem}>{item.product.harga}</Text>
							<Text style={styles.qtyItem}>{item.kuantitas}</Text>
							<Text style={styles.totalItem}>Rp. {item.product.harga * item.kuantitas}</Text>
						</ListItem>
					}
					renderLeftHiddenRow={item =>
						<Button full onPress={() => alert(item.id)}>
							<Icon active name="search" />
						</Button>}
					renderRightHiddenRow={(item) =>
						<Button full danger onPress={() => this.removeList(item.id)}>
							<Text>Hapus</Text>
						</Button>}
					leftOpenValue={75}
					rightOpenValue={-75}
					scrollEnabled={true}	
					>
				</List>

				<View style={styles.tabBottom}>
					<View style={styles.tabBayar}>
						<View style={styles.tabTotalBelanja}>
							<Text style={{fontSize:10}}>Belanja</Text>
							<Text style={{fontSize:16,fontWeight:'bold'}}>{"Rp. " + (total).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
						</View>
						<View style={styles.tabTotalBayar}>
							<Text style={{fontSize:10}}>Bayar</Text>
							<Text style={{fontSize:16,fontWeight:'bold'}}>{"Rp. " + (total + address.ongkos).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
						</View>
					</View>
				
					<TouchableOpacity style={styles.buttonKirim} onPress={() => this.props.navigation.navigate('Map')}>
						<Text style={styles.buttonText}>KIRIM</Text>
					</TouchableOpacity>
				</View>			
      </View>
    );
  }
}

const getProductById = (products, id) => products.find(p => p.id === id);

const populateCartItems = (cart, products) => ({
	...cart,
	items: cart.items.map(item => ({
		...item,
		product: getProductById(products, item.id),
	})),
});

const mapStateToProps = (state) => ({
	isProductsLoading: state.product.isLoading,
	products: state.product.products,
	cart: populateCartItems(state.cart.cart, state.product.products),
	address: state.address.address
});

const mapDispatchToProps = {
	fetchProducts,
	fetchCart,
	removeFromCart,
	fetchAddress
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1
	},
  logo: {
    width:30,
    height:30
  },
	tabTop:{
		flexDirection:'row',
		backgroundColor:'#f3f3f3',
		justifyContent: 'center', 
	},
	tabOngkos:{
		flexDirection:'column',
		alignItems:'flex-start',
		width:SCREEN_WIDTH*0.75,
		paddingHorizontal:15,
    paddingVertical:7,
	},
	tabBottom:{
		position: 'absolute',
		bottom: 0, 
		left: 0,  		
    right: 0,
		elevation: 3,
	},
	tabBayar:{
		justifyContent: 'center', 
		flexDirection:'row',
		backgroundColor:'#f3f3f3',
	},
	tabTotalBelanja:{
		flexDirection:'column',
		alignItems:'flex-start',
		width:SCREEN_WIDTH*0.5,
		paddingHorizontal:15,
    paddingVertical:7,
	},
	tabTotalBayar:{
		flexDirection:'column',
		alignItems:'flex-end',
		width:SCREEN_WIDTH*0.5,
		paddingHorizontal:15,
    paddingVertical:7,
	},
	buttonLocation : {
		backgroundColor: 'rgba(21, 214, 78, 1)',
    width:SCREEN_WIDTH*0.25,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
	},
	buttonKirim : {
		backgroundColor: 'rgba(255, 80, 49, 1)',
		paddingHorizontal:15,
    paddingVertical:12,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
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
	text:{
		color:'black',
		fontWeight:'bold'
	},
	nomorItem:{
		color:'black',		
		fontSize:10,
		width:'5%',
		justifyContent:'center'
	},
	namaItem:{
		color:'black',		
		fontSize:10,
		width:'40%',
		textAlign:'center',
		fontWeight:'bold'
	},
	hargaItem:{
		color:'black',		
		fontSize:10,
		width:'25%',
		textAlign:'center'
	},
	qtyItem:{
		color:'black',		
		fontSize:10,
		width:'5%',
		textAlign:'center',
	},
	totalItem:{
		color:'black',		
		fontSize:10,
		width:'25%',
		textAlign:'right',
		fontWeight:'bold'
	},
  primaryText: {
		color:'#fff',
		fontWeight:'bold'
  },
  item: {
		backgroundColor:'#ededed',
		flexDirection:'row',
		height:50,
		elevation: 1,
		alignItems:'center',
		justifyContent:'space-between',
		paddingHorizontal:15,
		marginTop:1
	},
	bottomKonfirmasi:{
		flexDirection:'row',
		alignItems:'center',
	},
	buttonKonfirmasi:{
		backgroundColor:'#0b8f6e',
		marginHorizontal:0.1,
		width:'50%',
		alignItems:'center',
		justifyContent:'center',
		paddingHorizontal:15,
		paddingVertical:17,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);