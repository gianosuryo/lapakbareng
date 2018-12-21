import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import {fetchProducts} from './state/product/actions';
import FastImage from 'react-native-fast-image'

/*
*/
class BarangScreen extends Component { 
  componentWillMount(){
    this.props.fetchProducts();
  }
  
    
  render() {
    const { params } = this.props.navigation.state;
    const idtoko = params ? params.idToko : null;
    const namatoko = params ? params.namaToko : null;
    const alamattoko = params ? params.alamatToko : null;
    const kategori = params ? params.namaKategori : null;
    const selectedProduct= [];

    const {
			isProductsLoading,
      products,
		} = this.props;

    for (var i = 0; i < products.length; i++){
      if (products[i].id_toko == idtoko){
          selectedProduct.push(products[i]);
      }
    }

    if (isProductsLoading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
					data={selectedProduct}
					renderItem={({item, index}) => (
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Detail', {namaKategori:kategori, idBarang: item.id_barang, namaBarang: item.nama, hargaBarang:item.harga, linkBarang:item.link, namaToko:namatoko, alamatToko:alamattoko})}>
              <View style={styles.textNumbering}>
                 <Text style={styles.textNumberingItem}>#{index+1}</Text>                  
              </View>
              <View style={styles.textPositioning}>
                <Text style={styles.textPositioningItemNama}>{item.nama}</Text>                  
                <Text style={styles.textPositioningItemHarga}>{"Rp. " + (item.harga * 1).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
              </View>
              <FastImage
                style={styles.imageContainer}
  							source={{
                  uri:item.link,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
							/>
  					</TouchableOpacity>
					)}
					keyExtractor={
						(item, index) => {return '${item.nama + index}'}
					}
        />
      </View>
    );
  }
}

/*const getAddressToko = (toko, id_toko) => toko.find(t => t.id_toko === id_toko);

const addAddressToko = (products, toko) => ({
  ...products,
	items: products.map(item => ({
		...item,
		address: getAddressToko(toko, item.id_toko),//// CEK POINT
	})),
});
*/

const mapStateToProps = (state) => ({
	isProductsLoading: state.product.isLoading,
  products:state.product.products,
});

const mapDispatchToProps = {
  fetchProducts
};

const widthScreen = Dimensions.get('window').width;
const heightItem = widthScreen/4;

const styles = StyleSheet.create({
  container: {
    flex: 1
	},
	navBar: {
    height: 55,
    backgroundColor: '#0b8f6e',
    elevation: 5,
    paddingHorizontal:15,
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
  },
  logo: {
    width:30,
    height:30
    },
  item: {
    backgroundColor:'#fafafa',    
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-start',
		elevation: 2,
		width:widthScreen,
    height:heightItem,
    borderWidth:0.5,
    borderColor:'#e0e0e0',
    flex:1
  },
  textNumberingItem:{
    fontSize:30,
		fontWeight:'bold',
    color:'#BAB5A2',
    textAlign:'center'
  },
  textNumbering:{
    flexDirection:'column',
    justifyContent:'center',    
    flex:2
  },
  textPositioningItemNama:{
    color: '#342e37',
		fontWeight:'100',
    fontSize:15,
    textAlign:'left'
  },
  textPositioningItemHarga:{
    fontSize:11,
    color:'#342e37',
    textAlign:'left'
  },
  textPositioning:{
    flexDirection:'column',
    justifyContent:'center',
    flex:5
  },
  imageContainer: {
    width:heightItem,
    height:heightItem,
    flex:3
	},

});

export default connect(mapStateToProps, mapDispatchToProps)(BarangScreen);