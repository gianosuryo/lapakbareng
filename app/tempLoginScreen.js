import React from 'react';
import {StyleSheet, Text, View, AsyncStorage, Image, Dimensions, TouchableOpacity, ActivityIndicator, Animated, Easing} from 'react-native';
import firebase from './firebase';
import {Container, Content, Header, Form, Input, Item, Button, Label, Icon} from 'native-base';
import FastImage from 'react-native-fast-image'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      email: '',
      password: '',
      userToken: '',
      flag:true,
      formFlag:false,
    }
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount () {
    this.onLoadAnimate()
  }

  signUpUser = () => {
    this.setState({flag:false});
  
    try{
      if(this.state.password.length < 6){
        this.setState({flag:true});
        alert("Please enter at least 6 characters !")
        return;
      }

      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(response){
        return response;
      })
      .then((user) => {
        this._signInAsync(user.uid);
        this.setState({flag:true});
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          alert('Email already in use !');
        } else {
          alert(errorMessage);
        }        
        this.setState({flag:true});
        console.log(error);
      });
    }catch(error){
      this.setState({flag:true});  
      console.log(error.toString())
    }
  }


  loginUser = () => {
    this.setState({flag:false});
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(response){
      return response;  
    })
    .then((user) => {
      this._signInAsync(user.user.uid);
      alert(JSON.stringify(user.user.uid));
      this.setState({flag:true});
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }        
      this.setState({flag:true});
      console.log(error);
    });
  }

  _signInAsync = async (token) => {
    const {navigate} = this.props.navigation;
    await AsyncStorage.setItem('userToken', token);
    this.props.navigation.navigate('App');
  };

  changeForm = () => {
    this.onLoadAnimate()
    this.setState({formFlag:!this.state.formFlag})
  }

  onLoadAnimate = () => {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }
 
  render() {
    const opacityIn = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const opacityOut = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    
    const widthHeader = Dimensions.get('window').width;
    const heightHeader = widthHeader/2;

    return (
      <View style={styles.container}>
        <FastImage
          style={styles.imageBackground}
          source={{
            uri:'https://www.ocf.berkeley.edu/~sather/wp-content/uploads/2018/01/food--1200x600.jpg',
            headers:{ Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
              <Image
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png'}}
                style={styles.logoImage}
              />
          </View>
          {this.state.formFlag &&     // Form Sign Up
          <Animated.View 
            style={{opacity:this.state.formFlag ? opacityIn : opacityOut, width:widthHeader*0.6, alignItems:'center', justifyContent:'center'}}
            ref={'loginForm'}>
            <Item style={{marginTop:40}}>
              <Icon active name='mail' active style={{ color: '#fff', fontSize:15, bottom:-5, }} />
              <Input 
                placeholder="Email Address"
                style={{color:'#fff',fontSize:11, textAlign:'center', bottom:-7}}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
              />
            </Item>

            <Item>
              <Icon active name='lock' active style={{ color: '#fff', fontSize:15, bottom:-5 }} />
              <Input
                placeholder="Password"
                style={{color:'#fff',fontSize:11, textAlign:'center', bottom:-7}} 
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})}
              />
            </Item>         

            <Button style={{marginTop:40, backgroundColor:'rgba(226, 153, 48, 0.7)', elevation:10}}
              full
              disabled={!this.state.flag}
              onPress={() => this.loginUser()}
              //onPress={() => this._onPressCart()}
              >
              {this.state.flag && 
                <Text style={{color: 'white', fontSize:11, fontWeight:'bold'}}>LOG IN</Text>
              }

              {!this.state.flag && <ActivityIndicator/>}
              
            </Button>


            <Text style={{color:'rgba(255,255,255,0.7)', fontSize:11, marginTop:40,}}>
              <Text>Belum memiliki akun? </Text>
                <Text onPress={() => this.changeForm()}>
                  <Text>Silahkan daftar </Text>
                  <Text style={{fontWeight:'bold'}}>disini</Text>
                </Text>
            </Text>
          </Animated.View>
          }

          {!this.state.formFlag && // Form Sign Up
          <Animated.View style={{opacity:this.state.formFlag ? opacityOut : opacityIn, width:widthHeader*0.6, alignItems:'center', justifyContent:'center'}}>
            <Item style={{marginTop:40}}>
              <Icon active name='mail' active style={{ color: '#fff', fontSize:15, bottom:-5, }} />
              <Input 
                placeholder="Email Address"
                style={{color:'#fff',fontSize:11, textAlign:'center', bottom:-7}}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
              />
            </Item>

            <Item>
              <Icon active name='lock' active style={{ color: '#fff', fontSize:15, bottom:-5 }} />
              <Input
                placeholder="Password  (8 - 12 characters)"
                style={{color:'#fff',fontSize:11, textAlign:'center', bottom:-7}} 
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
            

            <Button style={{marginTop:40, backgroundColor:'rgba(33, 124, 163, 0.7)', elevation:10}}
              full
              disabled={!this.state.flag}
              onPress={() => this.signUpUser()}
              >
              {this.state.flag && 
                <Text style={{color: 'white', fontSize:11, fontWeight:'bold'}}>SIGN UP</Text>
              }

              {!this.state.flag && <ActivityIndicator/>}
            </Button>

            <Text style={{color:'rgba(255,255,255,0.7)', fontSize:11, marginTop:40,}}>
              <Text>Sudah memiliki akun?</Text>
                <Text onPress={() => this.changeForm()}>
                  <Text> Silahkan login</Text>
                  <Text style={{fontWeight:'bold'}}> disini</Text>
                </Text>
            </Text>
          </Animated.View>
          }      
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:null,
    height:null,
  },
  formContainer: {
    backgroundColor: 'rgba(33, 31, 48, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0,
    elevation:2
  },
  imageBackground:{
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0
  },
  logoContainer:{
    alignItems:'center'
  },
  logoImage:{
    width: 100,
    height: 100,
  },
  logoName: {
    color: 'white',
    fontSize: 12,
    marginTop: 15,
    opacity: 1,
    fontWeight:'bold'
  }
});
