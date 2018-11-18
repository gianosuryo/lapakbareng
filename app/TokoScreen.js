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
import {fetchToko} from './state/toko/actions';
import FastImage from 'react-native-fast-image'

/*
*/
class TokoScreen extends Component<{}> { 
  componentWillMount(){
    this.props.fetchToko();
  }
    
  render() {
    const { params } = this.props.navigation.state;
    const kategori = params ? params.namaKategori : null;
    const idkategori = params ? params.idKategori : null;
    const selectedToko= [];

    const {			
      isTokoLoading,
			toko
		} = this.props;

    for (var i = 0; i < toko.length; i++){
      if (toko[i].id_kategori == idkategori){
        selectedToko.push(toko[i]);
      }
    }

    //alert(JSON.stringify(selectedProduct));

    if (isTokoLoading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.itemContainer}
					data={selectedToko}
					renderItem={({item, index}) => (
            
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Barang', {namaKategori:kategori, idToko:item.id_toko, namaToko:item.nama_toko, alamatToko:item.alamat})}>
              <FastImage
                style={styles.image}
  							source={{
                  uri:item.link,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
								/>
                <View style={styles.textPositioning}>
                  <Text style={styles.textToko}>{item.nama_toko}</Text>
                  <Text style={styles.textAlamat}>{item.alamat}</Text>
                  <Text style={styles.textChoiceToko}>
                    <Text style={styles.textJarak}>± 30 m</Text>
                    <Text> • </Text>
                    <Text style={styles.textJadwal}>{item.buka_toko} - {item.tutup_toko}</Text>
                    <Text>{item.fast_serve == 1 ? ' • ' : ''}</Text>
                    {item.fast_serve == 1 ? (
                      <Text style={styles.textServe}>Fast Serve</Text>
                    ) : (
                      ''
                    )}
                  </Text>
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

const mapStateToProps = (state) => ({
  isTokoLoading: state.toko.isLoading,
	toko: state.toko.toko
});

const mapDispatchToProps = {
  fetchToko
};

const widthScreen = Dimensions.get('window').width;
const heightItem = widthScreen/4;

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
  itemContainer:{
    backgroundColor:'white',    
  },
  item: {
    paddingVertical:5,
    marginBottom:5,
		borderBottomWidth: 0.5,
		borderColor: '#e5e5e5'
  },
  image: {
    width:"100%",
    height:140
	},
  textToko:{
    fontSize:14,
    fontWeight:'bold'
  },
  textAlamat:{
    fontSize:11,
  },
  textPositioning:{
    flexDirection:'column',
    justifyContent:'center',
    marginLeft:10,
    marginTop:10,
    marginBottom:5,
  },
  textChoiceToko:{
    fontSize:11,
    fontWeight:'bold'
  },
  textJarak:{
    color:'orange',    
  },
  textJadwal:{
    color:'tomato'
  },
  textServe:{
    color:'green'
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(TokoScreen);