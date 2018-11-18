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
class BarangScreen extends Component<{}> { 
  componentWillMount(){
    this.props.fetchProducts();
  }
  
    
  render() {
    const { params } = this.props.navigation.state;
    const idtoko = params ? params.idToko : null;
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

    //alert(JSON.stringify(selectedProduct));

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
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Detail', {namaKategori:kategori, idBarang: item.id, namaBarang: item.nama, hargaBarang:item.harga, kuantitasBarang:item.kuantitas, linkBarang:item.link})}>
              <FastImage
                style={styles.image}
  							source={{
                  //butuh 200x200
                  //uri:item.link,
                  uri:item.link,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
								/>
                <View style={styles.textPositioning}>
                  <Text style={styles.textItem}>{item.nama}</Text>                  
                </View>
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
  image: {
    width:heightItem,
    height:heightItem
	},
	logoItem: {
    width:'50%',
		height:'50%',
	},
	logoUtama: {
    width:60,
    height:30
  },
	tabKategori:{
		flexDirection:'column',
		elevation: 3,
		backgroundColor:'#f3f3f3',
		alignItems:'flex-start',
		paddingHorizontal:15,
		paddingVertical:10,
	},
	itemKategori:{
        flex:1,
		flexDirection:'row',
		flexWrap:'wrap',
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
		borderColor:'#e0e0e0'
	},
	textItem:{
    fontSize:17,
    marginBottom:2
  },
  textToko:{
    fontSize:9,
    fontWeight:'bold'
  },
  textAlamat:{
    fontSize:9,
  },
  textPositioning:{
    flexDirection:'column',
    justifyContent:'center',
    marginLeft:15
	}

});

export default connect(mapStateToProps, mapDispatchToProps)(BarangScreen);