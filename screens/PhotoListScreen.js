import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text, Button,
    TouchableOpacity,
    View
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, List, ListItem } from 'react-native-elements';

export default class PhotoListScreen extends React.Component {    
    
    list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President', 
            icon: 'av-timer'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman',
            icon: 'flight-takeoff'
            
        },
    ];  
    
    static navigationOptions = {
        header: null,
    };
        
    constructor(props) {
        
        super(props);
        
        this.state = {            
            loading: false,
            data: [],         
            error: null,
            refreshing: false
        };
    }
        
    async componentDidMount() {      

        this.getPhotoList();
    }

    async getPhotoList() 
    {
      let apiUri = "http://meetroomserver.azurewebsites.net/photo/user/mark";
            
      try {
        let response = await fetch(apiUri);
        let responseJson = await response.json();

        console.log(responseJson);
        
        this.setState({ 
          data : responseJson
        });
        
        return responseJson.articles;
      } catch (error) {
        console.error(error);
      }
    }        

    render() {

        return (
            <View style={styles.container}>
            
            <List containerStyle={{marginBottom: 20}}>
            {
                this.state.data.map((l, i) => (
                    
                    <ListItem
                    roundAvatar
                    avatar={{uri: l.url}}
                    key={i}
                    title={l.description}
                    leftIcon={{name: l.icon}}
                    />
                ))

            }
            </List>           
            
            </View>
        );
    }   
  
}

