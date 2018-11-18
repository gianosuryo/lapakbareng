import React, { Component } from 'react';
import {
	StyleSheet,
	AsyncStorage,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
	TouchableHighlight
} from 'react-native';

export default class OptionScreen extends Component<{}> {
	_signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

  render() {
    return (
      <View style={styles.container}>
				<View style={styles.tabIdentitas}>
					<Text style={{fontSize:16,fontWeight:'bold'}}>Giano Suryo Gumelar</Text>
					<Text style={{fontSize:10}}>Jl. Yos Sudarso No. 6, Mejayan, Madiun</Text>
				</View>

				<TouchableOpacity>
					<View style={styles.tabSetting}>
						<Image source={require('./images/icons8_Us_64.png')} style={styles.itemLogo}/>
						<Text style={styles.textSetting}>Akun Anda</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={styles.tabSetting}>
						<Image source={require('./images/icons8_Hamburger_64.png')} style={styles.itemLogo}/>
						<Text style={styles.textSetting}>Term & Privacy Policy</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={styles.tabSetting}>
						<Image source={require('./images/icons8_Hamburger_64.png')} style={styles.itemLogo}/>
						<Text style={styles.textSetting}>Bantuan & Feedback</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._signOutAsync}>
					<View style={styles.tabSetting}>
						<Image source={require('./images/icons8_Hamburger_64.png')} style={styles.itemLogo}/>
						<Text style={styles.textSetting}>Log Out</Text>
					</View>
				</TouchableOpacity>
      </View>
    );
  }
}

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
	itemLogo: {
    width:30,
    height:30
	},
	tabIdentitas:{
		flexDirection:'column',
		elevation: 3,
		backgroundColor:'#f3f3f3',
		alignItems:'flex-start',
		paddingHorizontal:15,
		paddingVertical:10,
		justifyContent:'center',
	},
	tabSetting:{
		flexDirection:'row',
		elevation: 1,
		backgroundColor:'#f0f0f0',
		alignItems:'center',
		padding:15,
		justifyContent:'flex-start',
		borderColor:'#dadada',
		borderWidth:0.5,
	},
	textSetting:{
		fontSize:14, marginHorizontal:15
	},
	identitasRow:{
		borderColor:'#dadada',
		borderWidth:0.5,
		backgroundColor:'#ededed',
		padding:10,

	},
	itemKategori:{
		flexDirection:'row',
		padding:5,
		flexWrap:'wrap',
	},
  item: {
		backgroundColor:'#fafafa',
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center',
		elevation: 2,
		padding:20,
		margin:5
	},
	textItem:{
		fontSize:10,
		fontWeight:'bold',
		textAlign:'center'
	}

});