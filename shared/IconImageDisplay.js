
import React, {Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator, 
    View, Image
} from 'react-native';

import { Icon } from 'react-native-elements';

export const IconImageDisplay = ({uriPath}) => { 
        
    if (uriPath && uriPath != "")
    {
        return (              
            <Image style={{ borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:40, marginBottom : 5,
                height:40,
                backgroundColor:'#fff',
                borderRadius:100}} source={{uri: uriPath}} />                   
                
            );
        }
        else { 
            return (
                <Icon reverse name='google-plus-square' type='font-awesome' color='#394DCF' />
            )
        }

    };  
    