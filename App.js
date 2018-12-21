import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';

import { 
	Header, 
	Button,
	Left,
	Right,
	Body,
	Icon, 
	Text 
} from 'native-base';

import  { createStackNavigator, createSwitchNavigator, createBottomTabNavigator }  from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './app/LoginScreen';
import SetMap from './app/SetMapScreen'

import Feed from './app/FeedScreen';
import Cart from './app/CartScreen';
import Kategori from './app/KategoriScreen';


import Toko from './app/TokoScreen';
import Barang from './app/BarangScreen';
import Options from './app/OptionScreen';
import Detail from './app/DetailBarangScreen';
import MapRoute from './app/MapScreen';

Login.navigationOptions = ({navigation}) => {
  title: 'Please Sign In/ Log in'
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    //await AsyncStorage.removeItem('cart');
    
    //alert(userToken);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeNavigation = createBottomTabNavigator({
  Feed: {
    screen: Feed,
    path:'home/feed',
    navigationOptions:{
      tabBarLabel:'Beranda'
    }
  },
  Kategori: {
    screen: Kategori,
    path:'home/kategori',
    navigationOptions:{
      tabBarLabel:'Kategori'
    }
  },
  Cart:{
    screen : Cart,
    path: 'home/cart',
    navigationOptions:{
      tabBarLabel:'Keranjang',
    }
  }
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Feed') {
        iconName = `ios-home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Kategori') {
        iconName = `ios-pizza${focused ? '' : '-outline'}`;
      } else if (routeName === 'Cart') {
        iconName = `ios-cart${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#f8b500',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#fafffd',
    },
  },
  initialRouteName:'Feed',
	lazy:true,
	swipeEnabled:false,
	animationEnabled:true
})

Login.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{display:'none'},
  }
}

SetMap.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{display:'none'}
  }
}

HomeNavigation.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{backgroundColor:'#fafffd',},
    header:(
      <Header androidStatusBarColor='black' style={{backgroundColor:'#fafffd'}}>
        <Left style={{flex:0}}>
          <Button transparent onPress={() => {navigation.navigate('ReDeclareLoc')}}>
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
    )
  }
}

Toko.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{backgroundColor:'#fafffd',},
    header:(
      <Header androidStatusBarColor='black' style={{backgroundColor:'#fafffd'}}>
        <Left style={{flex:0}}>
          <Button transparent onPress={() => {navigation.goBack()}}>
            <Icon active name='arrow-back' style={{color:'#342e37'}} />
          </Button>
        </Left>
        <Body style={{flex:3, marginHorizontal:10}}>
          <Text style={{color:'#655f68', fontSize:10}}>Kategori</Text>
          <Text style={{fontWeight: 'bold',color:'#342e37', fontSize:16}}>{navigation.state.params.namaKategori}</Text>
        </Body>
      </Header>
    )
  }
}

Barang.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{backgroundColor:'#fafffd',},
    header:(
      <Header androidStatusBarColor='black' style={{backgroundColor:'#fafffd'}}>
        <Left style={{flex:0}}>
          <Button transparent onPress={() => {navigation.goBack()}}>
            <Icon active name='arrow-back' style={{color:'#342e37'}} />
          </Button>
        </Left>
        <Body style={{flex:3, marginHorizontal:10}}>
          <Text style={{fontWeight: 'bold',color:'#342e37', fontSize:16}}>{navigation.state.params.namaToko}</Text>
          <Text style={{color:'#655f68', fontSize:10}}>{navigation.state.params.alamatToko}</Text>
        </Body>
      </Header>
    )
  }
}

Detail.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{display:'none'}
  }
}

MapRoute.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{backgroundColor:'#2f3131'},
    headerTitle:'Map Route',
    headerTitleStyle:{color:'#FFF', fontSize:12},
  }
}

const AppStack = createStackNavigator({ 
  Home: {
    screen: HomeNavigation,
    path:'home'
  },
  ReDeclareLoc: {
    screen: SetMap,
    path:'home'
  }, 
  Options: {
    screen: Options,
    path:'options'
  }, 
  Toko: {
    screen: Toko,
    path:'kategori/:idkategori'
  }, 
  Barang: {
    screen: Barang,
    path:'kategori/:idkategori/:namatoko'
  },
  Detail:{
    screen:Detail,
    path: 'kategori/:idkategori/:idbarang'
  }, 
  Map:{
    screen:MapRoute,
    path:'cart/maproute'
  }
},
{
  initialRouteName:'Home',
  //initialRouteParams:{namaKategori:"Ayam", idBarang: 0, namaBarang: "Ayam Lodho", hargaBarang:4500, namaToko:"Ayam Bakar Wong Solo", linkBarang:"https://3.bp.blogspot.com/-lDOHCAdaVW8/VrhXbFTaLeI/AAAAAAAADtA/gjG2ytD118I/s1600/Resep%2BAyam%2BLodho%2BKhas%2BPonorogo.jpg",alamatToko:'Jl. Sasdklj aslkj laksjd lkja sd'},
});
const AuthStack = createStackNavigator({ SignIn: Login });
const SetMapStack = createStackNavigator({ SetMap: SetMap });

const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    DeclareLoc: SetMapStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const widthHeader = Dimensions.get('window').width;
const heightHeader = widthHeader;

const stylesBarang = StyleSheet.create({
  item: {
    elevation:3,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width:widthHeader,
    height:heightHeader/3,
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
  logo: {
    width:widthHeader,
    height:heightHeader/3,
    justifyContent:'center',
    alignItems:'center'
  },
  textItem:{
    color:'#ffffff',
    fontSize:13,
    fontWeight:'bold',	
    textAlign:'center',
  }
});

const stylesDetail = StyleSheet.create({
  item: {
    elevation:3,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width:widthHeader,
    height:heightHeader/2,
  },
  itemTextPositioning:{
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
		position: 'absolute',
		bottom: 0, 
		left: 0,  		
		right: 0,
		padding: 10,
    flexDirection:'column',
    alignItems: 'flex-start',
		justifyContent: 'center', 
  },
  logo: {
    width:widthHeader,
    height:heightHeader/1.5,
    justifyContent:'center',
    alignItems:'center'
  },
  textItem:{
    color:'#ffffff',
    fontSize:13,
    fontWeight:'bold',	
    textAlign:'center',
  },
  textBannerKategori:{
		fontWeight:'bold',
		color: '#ffffff',
		fontSize:8,
	},
	textBannerNama:{
		color: '#ffffff',
		fontSize:15,
	},
	textBannerToko:{
		color: '#ffffff',
		fontSize:7,
	},
});

export default App;
//export default HomeNavigation;
