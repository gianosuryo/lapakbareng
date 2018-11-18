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


import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';
import {fetchCategories} from './state/category/actions';

class KategoriScreen extends Component {
	componentWillMount(){
		this.props.fetchCategories();
	}

	constructor(props) {
		super(props)
	}

  render() {
		const {
			isCategoriesLoading,
			categories
		} = this.props;

		let screenOneHeight = Dimensions.get('window').width/2;
		
		if (isCategoriesLoading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
		}
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={{backgroundColor:'#ffffff'}}>
					<Text style={styles.titleKategori}>Kategori</Text>
						<FlatList
							numColumns={2}
							data={categories}
							style={styles.kategoriView}
							renderItem={({item, index}) => (
								<TouchableOpacity key={item.id_kategori} style={styles.item} onPress={() => this.props.navigation.navigate('Toko', {idKategori: item.id_kategori, namaKategori: item.nama, linkKategori: item.link})}>
									<FastImage
									//butuh 360x180
										style={styles.logo}
										source={{
											uri:item.link,
											headers:{ Authorization: 'someAuthToken' },
											priority: FastImage.priority.normal,
										}}
										resizeMode={FastImage.resizeMode.cover}
									/>
								
									<View style={styles.itemTextPositioning}>
										<Text style={styles.textItem}>{item.nama}</Text>
									</View>
									
								</TouchableOpacity>
							)}
							keyExtractor={
								(item, index) => {return '${item.item.nama + index}'}
							}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	isCategoriesLoading: state.category.isLoading,
	categories: state.category.categories
});

const mapDispatchToProps = {
	fetchCategories
}

const widthHeader = Dimensions.get('window').width;
const heightHeader = widthHeader/2;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	// Out
  titleKategori:{
		fontSize: 15,
		fontWeight: 'bold',
		marginVertical:15,
		marginHorizontal:15,
	},
	logo: {
		width:widthHeader/2,
		height:heightHeader/2,
		justifyContent:'center',
		alignItems:'center'
	},
	kategoriView:{
		marginHorizontal:2.5
	},
  item: {
		backgroundColor:'#fafafa',
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center',
		height:heightHeader/2,
		marginHorizontal:2.5,
		marginVertical:2.5
	},
	itemTextPositioning:{
		position: 'absolute',
		top:0,
		bottom: 0, 
		left: 0,  		
		right: 0,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	textItem:{
		color:'rgba(255,255,255, 0.8)',
		fontSize:15,
		textAlign:'center',
		
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(KategoriScreen);