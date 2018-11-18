import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import {setAddress} from './state/address/actions';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
 
class MapScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      myPosition:{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      updatedPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      lapakBarengPosition: {
        latitude: -8.064680,
        longitude: 111.900624
      },
      initialAddressName : '',
      distanceDestination: 0,
      flag:0
    }

    this.setLocation = this.setLocation.bind(this);
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
      this.setState({myPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
      this.setState({flag:1})
    },
    (error) => alert(error.message))
  }

  setLocation = (lat, lng, ongkos, alamat) => {
    const { goBack } = this.props.navigation;

		Alert.alert(
			'Peringatan',
			('Set lokasi ke : ' + alamat),
			[
			  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'OK', onPress: () => {
          this.props.setAddress(lat, lng, ongkos, alamat);
          goBack();
				}
			  },
			],
			{ cancelable: true }
		  )
	}

  render() {
    const { region } = this.props;
    if(this.state.flag == 0){
      fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=-8.064680,111.900624' +  '&destinations=' + this.state.markerPosition.latitude + ',' + this.state.markerPosition.longitude + '&mode=driving' + '&key=AIzaSyAtQDGwiL_mgCbgKUdXAUN4f_HeWLd_MfE')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson.rows[0].elements[0].distance.value));
        this.setState({distanceDestination: responseJson.rows[0].elements[0].distance.value})
      })
      .catch((error) => {
        console.log(error);
      })
      
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
    return (
      <View style={styles.container}>
        <MapView
          //provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.initialPosition}
          loadingEnabled={true}
          onRegionChangeComplete={(e) => {
            var newRegion = {
              latitude: e.latitude,
              longitude: e.longitude,
              latitudeDelta: e.latitudeDelta,
              longitudeDelta: e.longitudeDelta
            }
            this.setState({initialPosition: newRegion})
          }}
          onPress={(e) => {
            var newMarker = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            }

            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + newMarker.latitude + ',' + newMarker.longitude + '&key=AIzaSyASuh87T092TqQwAgpo8MJ5nf45y0v7bvg')
            .then((response) => response.json())
            .then((responseJson) => {
              //console.log(JSON.stringify(responseJson.results[0].formatted_address));
              this.setState({initialAddressName: responseJson.results[0].formatted_address})
            })
            .catch((error) => {
              console.log(error);
            })

            fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=-8.064680,111.900624' +  '&destinations=' + newMarker.latitude + ',' + newMarker.longitude + '&mode=driving' + '&key=AIzaSyASuh87T092TqQwAgpo8MJ5nf45y0v7bvg')
            .then((response) => response.json())
            .then((responseJson) => {
              //console.log(JSON.stringify(responseJson.rows[0].elements[0].distance.value));
              this.setState({distanceDestination: responseJson.rows[0].elements[0].distance.value})
            })
            .catch((error) => {
              console.log(error);
            })
            this.setState({markerPosition: newMarker})
          }}>

          <MapView.Marker
            coordinate={this.state.myPosition}>
            <View style={styles.radius}>
              <View style={styles.marker}>
              </View>
            </View>
          </MapView.Marker>
          <MapView.Marker
            draggable
            onDragEnd={(e) => this.setState({x: e.nativeEvent.coordinate})}
            coordinate={this.state.markerPosition}>
            <Image
              source={require('./images/icons8_Map_Pin_50px.png')}
              style={{width:35,height:35}}/>
          </MapView.Marker>
          <MapView.Marker
            coordinate={this.state.lapakBarengPosition}>
            <View style={styles.radius}>
              <View style={styles.lapakBarengMarker}>
              </View>
            </View>
          </MapView.Marker>
        </MapView>
        <View style={styles.input}>
          <View style={styles.viewInputAlamat}>
            <Text style={styles.labelAlamat}>Alamat</Text>
            <Text style={styles.inputAlamat}>{this.state.initialAddressName}</Text>
          </View>
          <View style={styles.viewInputJarakHarga}>
            <View style={styles.viewHarga}>
              <Text style={styles.inputJarak}>
                {"Ongkos Kirim ( " + this.state.distanceDestination.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + " m ) : "}
              </Text>
              <Text style={styles.inputHarga}>
                {"Rp. " + (this.state.distanceDestination*2.5).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </Text>
            </View>
            <TouchableOpacity style={styles.viewKonfirmasi} onPress={() => this.setLocation(this.state.initialPosition.latitude, this.state.initialPosition.longitude, this.state.distanceDestination*2.5, this.state.initialAddressName)}>
              <Text style={styles.labelKonfirmasi}>SET</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
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
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F5FCFF',
  },
  map: {
    left:0,
    right:0,
    top:0,
    bottom:0,
    position:'absolute'
  },
  input:{
		position: 'absolute',
		bottom: 0, 
		left: 0,  		
    right: 0,
    width:SCREEN_WIDTH,
		flexDirection:'column',
		alignItems: 'flex-start',
		justifyContent: 'center', 
  },
  viewInputAlamat:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection:'column',
    borderBottomColor:'rgba(0,0,0,0.5)',
    borderTopColor:'rgba(0,0,0,0)',
    borderLeftColor:'rgba(0,0,0,0)',
    borderRightColor:'rgba(0,0,0,0)',
    borderWidth:0.5,
    paddingHorizontal:15,
    paddingVertical:7,
  },
  viewInputJarakHarga:{
    flexDirection:'row',
  },
  viewHarga:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width:SCREEN_WIDTH/2,
    flexDirection:'column',
    paddingHorizontal:15,
    paddingVertical:7,
  },
  viewKonfirmasi:{
    backgroundColor: 'rgba(21, 214, 78, 0.7)',
    width:SCREEN_WIDTH/2,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  labelKonfirmasi:{
    fontWeight:'bold',
		color: '#fff',
		fontSize:13,  
    justifyContent:'center',
  },
  labelAlamat:{
		color: '#ffffff',
		fontSize:10,  
    justifyContent:'center',
  },
  inputAlamat:{
    fontWeight:'bold',
		color: '#ffffff',
		fontSize:12,  
    justifyContent:'center',
  },
  inputJarak:{
    justifyContent:'center',
    color: '#ffffff',
		fontSize:10,
  },
  inputHarga:{
    justifyContent:'center',
    fontWeight:'bold',
    color: '#ffffff',
		fontSize:12,  
  },
  radius:{
    height:50,
    width:50,
    borderRadius:50/2,
    overflow:'hidden',
    backgroundColor:'rgba(0, 122, 255, 0.1)',
    borderWidth:1,
    borderColor:'rgba(0, 112, 255, 0.3)',
    alignItems:'center',
    justifyContent:'center'
  },
  marker:{
    height:20,
    width:20,
    borderWidth:3,
    borderColor:'white',
    borderRadius:20/2,
    overflow:'hidden',
    backgroundColor:'#007AFF'
  },
  lapakBarengMarker:{
    height:20,
    width:20,
    borderWidth:3,
    borderColor:'white',
    borderRadius:20/2,
    overflow:'hidden',
    backgroundColor:'#f44242'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);