import {
     StyleSheet,
    ActivityIndicator, 
    View
} from 'react-native';

export const ActivitySpinner = () => {
    
    return (
        <ActivityIndicator style={{ position : 'absolute', left: 0, 
         right: 0, top: 0, bottom: 0, alignItems: 'center',justifyContent: 'center'}}
        animating={true} color = '#0a1640' size = "large" /> 
    );
  };  
