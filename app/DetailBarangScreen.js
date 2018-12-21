
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
	TouchableOpacity,
	Dimensions,
} from 'react-native';

import {
	Container, 
	Header, 
	Button,
	Left,
	Right,
	Body,
	Icon, 
	Text, 
	Content,
	Footer
} from 'native-base';

import { connect } from 'react-redux';
import {addToCart} from './state/cart/actions';
import FastImage from 'react-native-fast-image';

class DetailBarangScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			kuantitas : 1,
		}
	}

	prepareCart = (id, kuantitas) => {
		this.props.addToCart(id, kuantitas);
		
	}

	addQuantity = () => {
    this.setState({kuantitas: this.state.kuantitas + 1});
  }

  substractQuantity = () => {
    if(this.state.kuantitas != 1){
      this.setState({kuantitas: this.state.kuantitas - 1});
		}
	}

  render() {
		const { params } = this.props.navigation.state;
		const namakategori = params ? params.namaKategori : null;
		const idbarang = params ? params.idBarang : null;
		const namabarang = params ? params.namaBarang : null;
		const hargabarang = params ? params.hargaBarang : null;
		const namatoko = params ? params.namaToko : null;
		const alamattoko = params ? params.alamatToko : null;
		const linkbarang = params ? params.linkBarang : null;

		const totalBayar = this.state.kuantitas * hargabarang;
		
    return (
			<Container style={styles.container}>
					<Header androidStatusBarColor='black'  style={{backgroundColor:'#fafffd'}}>
						<Left style={{flex:0}}>
							<Button transparent onPress={() => {this.props.navigation.goBack()}}>
								<Icon active name='arrow-back' style={{color:'#342e37'}} />
							</Button>
						</Left>
						<Body style={{flex:3, marginHorizontal:10}}>
							<Text style={styles.headerTitle}>{namatoko}</Text>
							<Text style={styles.headerTitleSc}>{alamattoko}</Text>
						</Body>
						<Right/>
					</Header>
					<Content style={styles.content}>
						<View style={styles.tabPic}>
							<FastImage
								style={styles.imageContainer}
								source={{
									uri:linkbarang,
									priority: FastImage.priority.normal
								}}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</View>
						<View style={styles.tabPrime}>
							<View style={styles.tabPrimeNama}>
								<Text style={{fontSize:10}}>{namakategori.toUpperCase()}</Text>
								<Text style={{fontSize:14,fontWeight:'bold'}}>{namabarang}</Text>
							</View>
							<View style={styles.tabPrimeHarga}>
								<Text style={{fontSize:17, color:'#655f68'}}>{"Rp. " + (hargabarang * 1).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
							</View>
						</View>
						<View style={styles.tabSecond}>
							<Text style={{fontSize:13, color:'#655f68'}}>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire,</Text>
						</View>
						<View style={styles.tabThird}>
							<Text style={{fontSize:14,fontWeight:'bold'}}>Jumlah Order</Text>
							<Text style={{color:'#655f68', fontSize:10}}>Masukkan jumlah order dengan menekan tombol - atau +</Text>
							<View style={styles.tabThirdKuantitas}>
								<Button light rounded large onPress={() => this.substractQuantity()}><Text>  -  </Text></Button>
								<Text style={{fontSize:35}}>{this.state.kuantitas}</Text>
								<Button light rounded large onPress={() => this.addQuantity()}><Text>  +  </Text></Button>
							</View>
						</View>
						<View style={styles.tabFourth}>
							<Text style={{fontSize:14,fontWeight:'bold'}}>Total</Text>
							<Text style={{color:'#655f68', fontSize:10}}>Total beli akan dimasukkan ke dalam keranjang</Text>
							<Text style={{fontSize:40, height:100, fontWeight:'100', textAlign:'center', textAlignVertical:'center'}}>{"Rp. " + (totalBayar * 1).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
						</View>
					</Content>
					
					<Button block warning style={styles.buttonContainer} onPress={() => this.prepareCart(idbarang, this.state.kuantitas)}>
						<Image style={styles.buttonLogo} source={require('./images/icons8_Shopping_Cart_32.png')}/>
						<Text style={styles.buttonText}>Tambahkan Ke Keranjang</Text>
					</Button>

						{/* <TouchableOpacity onPress={() => this._onPressCart(idbarang, hargabarang, kuantitasbarang)}>
							
						</TouchableOpacity>
						*/}
			</Container>


    );
  }
}

let screenOneHeight = Dimensions.get('window').width/2;
let screenHeight = Dimensions.get('window').height;
const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = {
	addToCart
}

const styles = StyleSheet.create({
  container: {
    flex:1
	},
	headerTitle:{
    color:'#342e37',
    fontSize:16,
    fontWeight:'bold',
  },
  headerTitleSc:{
    color:'#655f68', 
    fontSize:10
  },
	content:{
		flex:1
	},
	tabPic:{
		flex:3,
		height:screenOneHeight
	},
	imageContainer: {
		width:'100%',
		height:'100%'
	},
	tabPrime:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		paddingHorizontal:15,
		paddingVertical:10,
		marginBottom:5,
		borderBottomWidth: 0.5,
		borderColor: '#e5e5e5'
	},
	tapPrimeNama:{
		flexDirection:'column',
	},
	tapPrimeHarga:{
		flexDirection:'column',
	},
	tabSecond:{
		flex:2,
		textAlign:'left',
		paddingHorizontal:15,
		paddingVertical:10,
		marginBottom:5,
		borderBottomWidth: 0.5,
		borderColor: '#e5e5e5'
	},
	tabThird:{
		flex:6,
		paddingHorizontal:15,
		paddingVertical:10,
		marginBottom:5,
		borderBottomWidth: 0.5,
		borderColor: '#e5e5e5'
	},
	tabThirdKuantitas:{
		marginTop:15,
		paddingHorizontal:20,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
	},
	tabFourth:{
		flex:1,
		paddingHorizontal:15,
		paddingVertical:10,
		marginBottom:5,
	},
	buttonContainer : {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
    paddingVertical:12,
		paddingHorizontal:12,
		position:'absolute',
		bottom:0,
		right:0,
		left:0
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
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailBarangScreen);