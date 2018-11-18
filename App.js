import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Image,
  StatusBar,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';

import  { createStackNavigator, createSwitchNavigator, createBottomTabNavigator }  from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './app/LoginScreen';

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

HomeNavigation.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{backgroundColor:'#fafffd',},
    headerTitle:(
      <Text style={{color:'#342e37', fontSize:13, marginLeft:15}}>
        <Text>LAPAK </Text>
        <Text style={{fontWeight: 'bold'}}>BARENG</Text>
      </Text>
    ),
    headerRight:(
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{paddingHorizontal:15}} onPress={() => navigation.navigate('Options')}>
          <Ionicons name="ios-menu" size={25} color="#342e37" />
        </TouchableOpacity>
      </View>
    )
  }
}

Toko.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{backgroundColor:'#fafffd',},
    headerTitle:(
      <Text style={{color:'#342e37', fontSize:15, marginLeft:15}}>
        <Text>{navigation.state.params.namaKategori}</Text>
      </Text>
    ),
  }
}

Barang.navigationOptions = ({navigation}) => {
  return{
    headerStyle:{backgroundColor:'#fafffd',},
    headerTitle:(
      <Text style={{color:'#342e37', fontSize:13, marginLeft:15}}>
        <Text>{navigation.state.params.namaToko}</Text>
      </Text>
    ),
  }
}

Detail.navigationOptions = ({navigation}) => {
  return{
    header:(
      <View style={stylesDetail.item}>
        <Image
          source={{uri:navigation.state.params.linkBarang}}
          style={stylesDetail.logo}/>
      </View>
    )
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
});
const AuthStack = createStackNavigator({ SignIn: Login });

const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
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