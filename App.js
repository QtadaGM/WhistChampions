import { StyleSheet, View, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import  DimensionProvider  from './src/context/DimensionContext';
import { Provider } from 'react-redux';
import React, { useEffect, useState } from 'react';
import store from './src/Redux/store';
import Routes from './src/route/Routes';
import Orientation from 'react-native-orientation-locker';
import { width, height } from './src/utils/dimension';
import axios from 'axios';
console.log('Routes:', Routes);
console.log('DimensionProvider:', DimensionProvider);

const App = () => {

  const [isReady, setIsReady] = useState(false);
  const [runApp , setRunApp] = useState(true);

 useEffect(() => {
  const waitForOrientation = async () => {
    Orientation.lockToLandscape();

    let tries = 0;
    const maxTries = 10;
    const delay = 100;

    const waitUntilLandscape = () => new Promise(resolve => {
      
      const check = () => {
      console.log("checking :");
      const { width, height } = Dimensions.get("window");
        
      console.log("width : ", width, " and height : ", height );
        if (width > height || tries >= maxTries) {
          resolve();
        } else {
          tries++;
          
          setTimeout(check, delay);
        }
      };
      check();
    });

    await waitUntilLandscape();
    setIsReady(true);
  };

  waitForOrientation();

  return () => {
    Orientation.unlockAllOrientations();
  };
}, []);


  if (!isReady) {
    return null; // or <LoadingScreen /> if you have one
  }

  return (
    
    
      runApp === false ? 
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'black' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'black' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'black' }} />
      </View> 
      : 
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {/* <DimensionProvider> */}
          <Routes />
        {/* </DimensionProvider> */}
      </Provider>
    </GestureHandlerRootView>
  
  );
}

export default App;

const styles = StyleSheet.create({});
 