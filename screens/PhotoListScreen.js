import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text, Button,
    TouchableOpacity,
    View, RefreshControl
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
        title: 'My Photos', headerStyle: {
            elevation: 0,
            shadowOpacity: 0
        }
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
    
    onRefresh = () => {
        
        this.getPhotoList();
    }
    
    async getPhotoList() 
    {        
        if (global.username) 
        {                       
            let apiUri = "http://meetroomserver.azurewebsites.net/photo/user/" + 'test';
            console.log(apiUri);
            
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
    }   
      
    // _renderSectionHeader = ({ section }) => {
    //     return <SectionHeader title={section.title} />;
    //  };
     
    render() {
        
        return (
            <View style={styles.containerSchedule}>          
            
            <ScrollView refreshControl={
                  <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
             />
            }>
              
                <List containerStyle={styles.containerLightBorder}>  
                {
                    this.state.data.map((l, i) => (

                        <ListItem containerStyle={styles.bottomBorderLight}     
                        key={i}
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
                            <Image style={{ borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                justifyContent:'center',
                                width:40,
                                height:40,
                                backgroundColor:'#fff',
                                borderRadius:100}} source={{uri: l.url}} />                   
                            <Text style={{fontSize:11, color:'#394DCF'}}> See Details </Text> 
                        </View>   
                        }                
                        />                      
                         
                        ))                    
                }

                </List>  
                
             </ScrollView>
            
            </View>
        );
    }       
}

