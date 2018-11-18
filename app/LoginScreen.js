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
			]
		}
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
								placeholder="Masukkan alamat anda"
                style={{color:'black',fontSize:13, bottom:-5}} 
                onChangeText={(address_keyword) => this.setState({address_keyword})}
              />
            </Item>
          </Form>

					{!(this.state.address_keyword == '') && 
					<Form style={styles.resultForm}>
						<Text style={styles.resultFormTitle}>Search result</Text>
						<List 
							dataArray={this.state.addressItems}
							style={styles.resultFormList}
							renderRow={(item) =>
								<ListItem iconLeft >
									<Icon active name='pin' style={{ color: 'orange', fontSize:15}} />
									<Body>
										<Text style={{fontSize:13}}>{item}</Text>
										<Text note style={{fontSize:12}}>Jl. Supriyadi</Text>
									</Body>
								</ListItem>
							}>
						</List>
          </Form>
					}
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
		height:heightScreen/2.8
	},
	resultFormTitle:{
		marginLeft:15,
	},
	resultFormList:{
		marginTop:10
	}
});

export default DecideDestScreen;