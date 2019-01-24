import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
	View,
	Dimensions,
	ScrollView,
	FlatList,
} from 'react-native';

import {
	Header,  
	Button, 
	Left,
	Body,
	Right,
	Icon
} from 'native-base';

import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';
import {fetchToko} from './state/toko/actions';
import {fetchCategories} from './state/category/actions';

class FeedScreen extends Component {
	state = {
		width:0,
		page:1,
		autoPlay:true,
	}

	constructor(props) {
		super(props)

		this.allPosts = [];
		this.allCount = 0;

		this.initFavCategoryPosts = [];
		this.initFavCategoryCount = 0;

		this.initFavoritePosts = [];
		this.initFavouriteCount = 0;

		this.initFastServePosts = [];
		this.initFastServeCount = 0;

		this.shuffleFlag = 1;
		
		this._goToNextPage = this._goToNextPage.bind(this)
		this._onScroll = this._onScroll.bind(this)
		this._startAutoPlay = this._startAutoPlay.bind(this)
		this._stopAutoPlay = this._stopAutoPlay.bind(this)
		this._onScrollViewLayout = this._onScrollViewLayout.bind(this)
		this._onTouchStart = this._onTouchStart.bind(this)

		this._currentIndex=1;
		this._childrenCount=4;
	}

	componentWillMount(){
		this.props.fetchToko();
		this.props.fetchCategories();
	}
  
  componentDidMount(){
		this.props.navigation.setParams({ stopPlay: this._stopAutoPlay });
    if(this.state.autoPlay) this._startAutoPlay()
			else this._stopAutoPlay()
	}
	
  render() {
		const {			
			isTokoLoading,
			toko
		} = this.props;

		//Shuffle Array Favorite Other

		if(isTokoLoading){
			return(
				<View>
				</View>
			)
		}
		else{
			for (; this.allCount < toko.items.length; this.allCount++){
				this.allPosts.push(toko.items[this.allCount]);
				if ((toko.items[this.allCount].fast_serve == 1)){
					if(this.initFastServeCount < 4){
						this.initFastServePosts.push(toko.items[this.allCount]);
						this.initFastServeCount++;
					}				
				}
				if ((toko.items[this.allCount].favorite == 1)){
					if(this.initFavCategoryCount < 4){
						this.initFavCategoryPosts.push(toko.items[this.allCount]);
						this.initFavCategoryCount++;
					}				
				}
			}

			if(this.shuffleFlag == 1){
				let x = this.allPosts.length - 1;
				for (; x > 0; x--) {
					const y = Math.floor(Math.random() * (x + 1));
					const temp = this.allPosts[x];
					this.allPosts[x] = this.allPosts[y];
					this.allPosts[y] = temp;
					
					if(x == 1){
						this.shuffleFlag = 0;
					}
				}
			}
				
			for(; this.initFavouriteCount < this.allPosts.length;){
				if(this.initFavouriteCount < 5){
					this.initFavoritePosts.push(this.allPosts[this.initFavouriteCount]);
					this.initFavouriteCount++
				}else{
					break;
				}
			}

			return (
				<View style={styles.container}>
					{/*<Header androidStatusBarColor='black' style={{backgroundColor:'#fafffd'}}>
						<Left style={{flex:0}}>
							<Button transparent onPress={() => {this.props.navigation.navigate('ReDeclareLoc')}}>
								<Icon active name='pin' style={{color:'#342e37'}} />
							</Button>
						</Left>
						<Body style={{flex:3, marginHorizontal:10}}>
							<Text style={{fontWeight: 'bold',color:'#342e37', fontSize:16}}>Tulungagung</Text>
							<Text style={{color:'#655f68', fontSize:10}}>Jl. Abdul Fatah Barat No.34, Batangsaren, Kauman</Text>
						</Body>
						<Right style={{flex:0}}>
							<Button transparent onPress={() => {navigation.navigate('Options')}}>
								<Icon active name='menu' style={{color:'#342e37'}} />
							</Button>
						</Right>
					</Header>
					 */}
					<ScrollView
						showsVerticalScrollIndicator={false}>
						<View style={styles.bannerContainer}>
							<FlatList
								onLayout={this._onScrollViewLayout}
								onScroll={this._onScroll}
								ref="flatlist"
								horizontal={true}
								pagingEnabled={true}
								showsHorizontalScrollIndicator={false}
								scrollEventThrottle={8}
								onTouchStart={this._onTouchStart}
								data={this.initFavCategoryPosts}
								renderItem={({item, index}) => (
									<View>
										<FastImage
											style={styles.imageBanner}
											source={{
												uri:item.link,
												headers:{ Authorization: 'someAuthToken' },
												priority: FastImage.priority.normal,
											}}
											resizeMode={FastImage.resizeMode.cover}
										/>

										<View style={styles.itemBanner}>
											<Text style={styles.textBannerKategori}>{item.category.nama.toUpperCase()} • FAVORIT PER KATEGORI</Text>
											<Text style={styles.textBannerNama}>{item.nama_toko}</Text>
											<Text style={styles.textBannerToko}>Warung Pak Slamet</Text>
										</View>
									</View>
								)}
								keyExtractor={
									(item, index) => {return '${item.nama + index}'}
								}
							/>
						</View>

						<View style={styles.fastServeContainer}>
							<View style={styles.titleFastServe}>
								<Text style={styles.titleFastServeGeneral}>Terdekat Dengan Anda</Text>
								<Text style={styles.titleFastServeMore}>More</Text>
							</View>
							
							<FlatList
								data={this.initFastServePosts}
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								renderItem={({item, index}) => (
									<View style={styles.serveItem}>
										<FastImage
											source={{
												uri:item.link,
												headers:{ Authorization: 'someAuthToken' },
												priority: FastImage.priority.low,
											}}
											resizeMode={FastImage.resizeMode.cover}
											style={styles.serveImage}
										/>
										<View style={styles.textServe}>
											<Text style={styles.textServeKategori}>{item.category.nama.toUpperCase()}</Text>
											<Text style={styles.textServeNama}>{item.nama_toko}</Text>
											<Text style={styles.textServeToko}>
												<Text style={styles.textServeJarak}>± 30 m</Text>
												<Text> • </Text>
												<Text style={styles.textServeJadwal}>{item.buka_toko} - {item.tutup_toko}</Text>
											</Text>
										</View>
									</View>
								)}
								keyExtractor={
									(item, index) => {return '${item.nama + index}'}
								}
							/>
						</View>
						
						<View style={styles.fastServeContainer}>
							<View style={styles.titleFastServe}>
								<Text style={styles.titleFastServeGeneral}>Fast Serve</Text>
								<Text style={styles.titleFastServeMore}>More</Text>
							</View>
							
							<FlatList
								data={this.initFastServePosts}
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								renderItem={({item, index}) => (
									<View style={styles.serveItem}>
										<FastImage
											source={{
												uri:item.link,
												headers:{ Authorization: 'someAuthToken' },
												priority: FastImage.priority.low,
											}}
											resizeMode={FastImage.resizeMode.cover}
											style={styles.serveImage}
										/>
										<View style={styles.textServe}>
											<Text style={styles.textServeKategori}>{item.category.nama.toUpperCase()}</Text>
											<Text style={styles.textServeNama}>{item.nama_toko}</Text>
											<Text style={styles.textServeToko}>
												<Text style={styles.textServeJarak}>± 30 m</Text>
												<Text> • </Text>
												<Text style={styles.textServeJadwal}>{item.buka_toko} - {item.tutup_toko}</Text>
											</Text>
										</View>
									</View>
								)}
								keyExtractor={
									(item, index) => {return '${item.nama + index}'}
								}
							/>
						</View>

						<View style={styles.favoriteContainer}>
							<View style={styles.titleFavorite}>
								<Text style={styles.titleFavoriteGeneral}>Latest</Text>
								<Text style={styles.titleFavoriteMore}>More</Text>
							</View>

							<FlatList
								data={this.initFavoritePosts}
								showsVerticalScrollIndicator={false}
								renderItem={({item, index}) => (
									<View style={styles.favoriteItem}>
										<FastImage
											source={{
												uri:item.link,
												headers:{ Authorization: 'someAuthToken' },
												priority: FastImage.priority.low,
											}}
											resizeMode={FastImage.resizeMode.cover}
											style={styles.favoriteImage}
										/>
										<View style={styles.textFavorite}>
											<Text style={styles.textFavoriteKategori}>{item.category.nama.toUpperCase()}</Text>
											<Text style={styles.textFavoriteNama}>{item.nama_toko}</Text>
											<Text style={styles.textFavoriteToko}>
												<Text style={styles.textFavoriteJarak}>± 30 m</Text>
												<Text> • </Text>
												<Text style={styles.textFavoriteJadwal}>{item.buka_toko} - {item.tutup_toko}</Text>
											</Text>
										</View>
									</View>
								)}
								keyExtractor={
									(item, index) => {return '${item.nama + index}'}
								}
							/>
						</View>						
					</ScrollView>
				</View>
			);
		}
	}

	_onScroll(event){
		let {x} = event.nativeEvent.contentOffset, offset, position = Math.floor(x/this.state.width)
		if(x === this._preScrollX) return;
		this._preScrollX = x
		var divoff = x/this.state.width;
		offset = divoff - position

		if (offset < 0.00001 ){
			this._currentIndex = position + 1
			if(this._currentIndex == this._childrenCount){
				this._currentIndex = 0;
			}
			this._timerId = setInterval(this._goToNextPage,7000);
		}
	}
	_onScrollViewLayout(event){
		let {width} = event.nativeEvent.layout
		this.setState({width:width})
	}
	_onTouchStart(){
		this._stopAutoPlay()
	}
	_goToNextPage(){
		this._stopAutoPlay()
		this.refs.flatlist.scrollToIndex({animated: true, index: this._currentIndex});
	}

	_startAutoPlay(){
		this._timerId = setInterval(this._goToNextPage,7000);
	}

	_stopAutoPlay(){
		if(this._timerId){
			clearInterval(this._timerId);
			this._timerId = null
		}
	}
}

let screenOneHeight = Dimensions.get('window').width/2;
const widthHeader = Dimensions.get('window').width;
const heightHeader = widthHeader/2;

const getCategoryById = (categories, id_kategori) => categories.find(p => p.id_kategori === id_kategori);

const populateTokoData = (toko, categories) => ({
	...toko,
	items: toko.map(item => ({
		...item,
		category:getCategoryById(categories, item.id_kategori)
	}))
})

const mapStateToProps = (state) => ({
  isTokoLoading: state.toko.isLoading,
	toko: populateTokoData(state.toko.toko, state.category.categories)
});

const mapDispatchToProps = {
	fetchToko,
	fetchCategories
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#eaeaea',
	},
	// Banner
	bannerContainer:{
		height:screenOneHeight,
	},
	imageBanner:{
		width:widthHeader,
		height:heightHeader,
		justifyContent:'center',
		alignItems:'center',
	},
	itemBanner:{
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		position: 'absolute',
		bottom: 0, 
		left: 0,  		
		right: 0,
		padding: 10,
		flexDirection:'column',
		alignItems: 'flex-start',
		justifyContent: 'center', 
	},
	textBannerKategori:{
		fontWeight:'bold',
		color: '#ffffff',
		fontSize:9,
	},
	textBannerNama:{
		color: '#ffffff',
		fontSize:16,
	},
	textBannerToko:{
		color: '#ffffff',
		fontSize:8,
	},

	// Fast Serve
	fastServeContainer:{
		backgroundColor:'white',
		marginTop:10,
	},
	titleFastServe:{
		width:widthHeader,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		paddingVertical:15
	},
	titleFastServeGeneral:{
		fontSize:17,
		fontWeight:'bold',
		color:'#342e37',
		marginLeft:15
	},
	titleFastServeMore:{
		fontSize:17,
		fontWeight:'bold',
		color:'orange',
		marginRight:15
	},
  serveItem:{
		width:180,
		alignSelf:'center',
		marginHorizontal:5,
		marginLeft:5,
		marginBottom:'5%',
		backgroundColor:'#fafffd',
		elevation:2
	},
	serveImage:{
		width:'100%',
		height:220,
		justifyContent:'center',
		alignItems:'center',
	},
	textServe:{
		justifyContent:'center',
		alignItems:'center',
		width:'100%',
		paddingVertical:15
	},
	textServeKategori:{
		fontWeight:'bold',
		color: '#342e37',
		fontSize:9
	},
	textServeNama:{
		color: '#342e37',
		fontSize:15,
		fontWeight:'100'
	},
	textServeToko:{
		fontSize:9,
		fontWeight:'bold'
	},
	textServeJarak:{
    color:'orange'
  },
  textServeJadwal:{
    color:'tomato'
	},
	
	
	// Favorit Lainnya
	favoriteContainer:{
		backgroundColor:'white',
		marginTop:10,
		marginBottom:70
	},
	titleFavorite:{
		width:widthHeader,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		paddingVertical:15
	},
	titleFavoriteGeneral:{
		fontSize:17,
		fontWeight:'bold',
		color:'#342e37',
		marginLeft:15
	},
	titleFavoriteMore:{
		fontSize:17,
		fontWeight:'bold',
		color:'orange',
		marginRight:15
	},
  favoriteItem:{
		width:widthHeader,
		alignSelf:'center',
		marginBottom:5,
		borderBottomWidth: 0.5,
		borderColor: '#e5e5e5'
	},
	favoriteImage:{
		width:'100%',
		height:140,
		justifyContent:'center',
		alignItems:'center',
	},
	textFavorite:{
		justifyContent:'center',
		alignItems:'flex-start',
		width:'100%',
		paddingVertical:15,
		marginLeft:15
	},
	textFavoriteKategori:{
		fontWeight:'bold',
		color: '#342e37',
		fontSize:9
	},
	textFavoriteNama:{
		color: '#342e37',
		fontSize:15,
		fontWeight:'100'
	},
	textFavoriteToko:{
		fontSize:9,
		fontWeight:'bold'
	},
	textFavoriteJarak:{
    color:'orange'
  },
  textFavoriteJadwal:{
    color:'tomato'
  },


	// Out
  item: {
		backgroundColor:'#fafafa',
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center',
		height:heightHeader/2,
		marginHorizontal:2.5,
		marginVertical:2.5
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);