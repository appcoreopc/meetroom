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

// const SectionHeader = ({ title }) => {
//     return (
//       <View style={styles.sectionHeaderContainer}>
//         <Text style={styles.sectionHeaderText}>
//           {title}
//         </Text>
//       </View>
//     );
//   };
  
export default class PhotoListScreen extends React.Component {    
    
    static navigationOptions = {
        title: 'My Photos',
    };

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
        if (global.username) 
        {                       
            let apiUri = "http://meetroomserver.azurewebsites.net/photo/user/" + global.username;
            
            try {
                let response = await fetch(apiUri);
                let responseJson = await response.json();
                
                this.setState({ 
                    data : responseJson
                });
                
                return responseJson.articles;
            } catch (error) {
                console.error(error);
            }
        }              
    }   
    
    // _renderSectionHeader = ({ section }) => {
    //     return <SectionHeader title={section.title} />;
    //  };
     
    render() {
        
        return (
            <View style={styles.containerSchedule}>                  

                <List containerStyle={styles.containerLightBorder}>  
                {
                    this.state.data.map((l, i) => (

                        <ListItem containerStyle={styles.bottomBorderLight}     
                        key={1}
                        title={              
                        <View>
                            <Text style={{fontSize:14, color:'#3a4354'}}> {l.description} </Text> 
                        </View>    
                        }
                        subtitle={
                        <View style={{paddingTop: 6}}>
                            <Text style={{fontSize:11, color:'#787d87'}}> {l.description} </Text> 
                        </View>             
                        }

                        rightIcon={
                        <View>               
                            <Icon reverse name='user' type='font-awesome' color='#394DCF' />
                            <Text style={{fontSize:11, color:'#394DCF'}}> See Details </Text> 
                        </View>   
                        }                
                        />                      
                            
                            // <ListItem
                            // roundAvatar
                            // avatar={{uri: l.url}}
                            // key={i}
                            // title={l.description}
                            // leftIcon={{name: l.icon}}
                            // />
                        ))                    
                }

                </List>           
            
            </View>
        );
    }       
}

