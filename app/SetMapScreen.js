import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
  StatusBar,
  Animated,
  Easing
} from 'react-native';

import { 
	Container, 
	Header, 
	Content, 
	Footer, 
	FooterTab, 
	Form,
	Button,
	Label,
	Left,
	Right,
	Input, 
	Title, 
	ListItem, 
	Body,
	Item, 
	Icon, 
	Text 
} from 'native-base';

import { connect } from 'react-redux';
import {setAddress} from './state/address/actions';
import Modal from 'react-native-modalbox'

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
 
class SetMapScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      yValue: new Animated.Value(0),
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      initialAddressName : '',
      distanceDestination: 0,
			flag:0,
			flag2:0
    }

    this.setLocation = this.setLocation.bind(this);
    this.startMoveAnimation = this.startMoveAnimation.bind(this);
    this.backMoveAnimation = this.backMoveAnimation.bind(this);
    this.loopMarkerAnimation = this.loopMarkerAnimation.bind(this);
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + initialRegion.latitude + ',' + initialRegion.longitude + '&key=AIzaSyAtQDGwiL_mgCbgKUdXAUN4f_HeWLd_MfE')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({initialAddressName: responseJson.results[0].formatted_address})
      })
      .catch((error) => {
        console.log(error);
      })   

			this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
      this.setState({flag:1})
    },
    (error) => alert(error.message))
  }

  setLocation = () => {
    let setPosition = this.state.markerPosition
    let lat = setPosition.latitude
    let lng = setPosition.longitude
    this.props.setAddress(lat, lng);

    this.props.navigation.goBack();
    

    /*
		Alert.alert(
			'Are You Sure?',
      ('Set lokasi ke : ' + lat + " " + lng),
      
			[
			  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'OK', onPress: () => {
				}
			  },
			],
			{ cancelable: true }
      )
      */
  }
  
  startMoveAnimation = () => {
    Animated.timing(this.state.yValue, {
      toValue:30,
      duration:500,
      easing:Easing.bounce,
    }).start();
  }

  backMoveAnimation = () => {
    Animated.timing(this.state.yValue, {
      toValue:0,
      duration:500,
      easing:Easing.bounce
    }).start();
  }

  loopMarkerAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.yValue, {
        toValue: 30,
        duration: 500,
      }),
      Animated.timing(this.state.yValue, {
        toValue: 0,
        duration: 500
      })
    ]).start((e) => {
        this.loopMarkerAnimation();
    });
  }

  render() {
    const { region } = this.props;
    if(this.state.flag == 0){
      return (
        <View style={styles.loadingActivity}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
    return (
			<Container style={styles.container}>
        <Header androidStatusBarColor='black' style={{backgroundColor:'#fafffd'}}>
          <Left style={{flex:0}}>
            <Button transparent onPress={() => {this.refs.modalConfirm.open()}}>
              <Icon active name='arrow-back' style={{color:'#342e37'}} />
            </Button>
          </Left>
          <Body style={{flex:3, marginHorizontal:10}}>
            <Text style={styles.headerTitle}>Lokasi</Text>
            <Text style={styles.headerTitleSc}>Tentukan lokasi delivery anda</Text>
          </Body>
          <Right style={{flex:0}}>
            <Button transparent onPress={() => {this.refs.modalConfirm.open()}}>
              <Icon active name='checkmark' style={{color:'#342e37'}} />
            </Button>
          </Right>
        </Header>
				
				<Form style={styles.mapForm}>
            <MapView
              style={styles.mapContent}
              initialRegion={this.state.initialPosition}
              loadingEnabled={true}
              onMapReady={(e) => {
                this.loopMarkerAnimation();
              }}
              onRegionChangeComplete={(e) => {
                var newRegion = {
                  latitude: e.latitude,
                  longitude: e.longitude,
                  latitudeDelta: e.latitudeDelta,
                  longitudeDelta: e.longitudeDelta
                }
                this.setState({markerPosition: newRegion})
              }}
              />
          
            <View style={styles.markerContainer}>
              <Animated.View style={{marginBottom:this.state.yValue}}>
                <Icon active name='pin' style={styles.markerFont} />
              </Animated.View>
            </View>
				</Form>
        <Form style={styles.searchForm}>
          <Item>
            <Icon active name='home' active style={{ color: 'tomato'}} />
            <Input
              editable={false}
              placeholder={"Jl. Dr. Cipto No.12, Klojen, Kota Malang, Jawa Timur 65111"}
              style={{color:'black',fontSize:13}} 
              onChangeText={(address_keyword) => this.setState({address_keyword})}
            />
          </Item>
        </Form>

        <Modal 
          style={styles.modalConfirm} 
          position={"center"} 
          swipeToClose={true}
          ref={"modalConfirm"}>
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'#fafffd'}}>
            <Text style={{textAlign:'center', fontSize:16, fontWeight:'bold'}}>
              Apakah anda yakin ?
            </Text>  
          </View>
          <View style={{flex:2, width:'100%', justifyContent:'center'}}>
            <Text style={{textAlign:'center'}}>
              Set lokasi antar ke :
            </Text>
            <Text style={{color:'#655f68', fontSize:12, width:'100%', textAlign:'center'}}>
              Jl. Abdul Fatah Barat No.34, Batangsaren, Kauman
            </Text>
          </View>
          <View style={{flex:1, alignSelf:'flex-end', alignContent:'center', justifyContent:'space-between', flexDirection:'row', width:'100%', backgroundColor:'#fafffd'}}>
            <Button transparent onPress={() => {this.refs.modalConfirm.close()}}>
              <Icon active name='close' style={{color:'red'}} />
            </Button>
            <Button transparent onPress={() => {this.setLocation()}}>
              <Icon active name='checkmark' style={{color:'green'}} />
            </Button>
          </View>
        </Modal>
			</Container>
    );
  }
  }
}

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = {
	setAddress
}

const styles = StyleSheet.create({
	loadingActivity:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
  container: {
    flex: 1,
		backgroundColor:'#eaeaea',
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
	searchForm:{
    position:'absolute',
    bottom:30,
    left:0,
    right:0,
    backgroundColor:'rgba(255,255,255,0.7)',
    marginHorizontal:20
  },
	mapForm:{
		flex:2
	},
  mapContent:{
    height:'100%',
    width:'100%'
  },
  markerContainer:{
    position:'absolute', 
    height:'100%', 
    width:'100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  markerFont:{
    color: 'red', 
    fontSize:30, 
    marginBottom:50
  },
  modalConfirm:{
    justifyContent:'center',
    alignItems:'center',
    width:300,
    height:200,
    paddingHorizontal:5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetMapScreen);