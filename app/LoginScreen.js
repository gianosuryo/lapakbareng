import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions
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
	List, 
	ListItem, 
	Body,
	Item, 
	Icon, 
	Text 
} from 'native-base';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class DecideDestScreen extends Component {
	constructor(props) {
		super(props);
		this.state= {
			address_keyword: '',
			addressItems:[
				'Simon Mignolet',
				'Nathaniel Clyne',
				'Dejan Lovren',
				'Mama Sakho',
				'Emre Can'
			],
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

  render() {
		return (
			<Container style={styles.container}>
				<Content>
					<Form style={styles.searchForm}>
						<Text style={styles.searchFormTitle}>Pilih alamat tujuan anda</Text>
            <Item>
              <Icon active name='search' active style={{ color: 'black', fontSize:15, bottom:-5 }} />
              <Input
								placeholder="Pilih lokasi anda"
                style={{color:'black',fontSize:13, bottom:-5}} 
                onChangeText={(address_keyword) => this.setState({address_keyword})}
              />
            </Item>
          </Form>

					<Form style={styles.mapForm}>
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
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full style={{backgroundColor:'orange'}}>
              <Text>Save</Text>
            </Button>
          </FooterTab>
        </Footer>
			</Container>
		);
	}
}

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#eaeaea',
	},
	searchForm:{
		backgroundColor:'white',
		paddingVertical:15,
		marginBottom:5
	},
	searchFormTitle:{
		marginLeft:15,
	},
	resultForm:{
		backgroundColor:'white',
		paddingVertical:15,
	}
});

export default DecideDestScreen;