import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import Test from '../screens/Test';
import HomeScreen from '../screens/app/HomeScreen';
import LeaderboardScreen from '../screens/app/LeaderboardScreen';
import LeagueScreen from '../screens/app/LeagueScreen';
import ChatsScreen from '../screens/app/ChatsScreen';
import LoginScreen from '../screens/app/LoginScreen';
import GamePlayScreen from '../screens/app/GamePlayScreen';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const [appIsReady, setAppIsReady] = useState(false);
  const isLogin = useSelector(state => state?.user?.login);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Add any async initialization here
        await new Promise(resolve => setTimeout(resolve, 100));
      } finally {
        setAppIsReady(true);
        SplashScreen.hide();
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'LoginScreen'}
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
          statusBarBackgroundColor: '#FFFFFF',
          statusBarHidden: true
        }}>
        
        {/* Main test screen with bottom tabs */}
        <Stack.Screen
          name="Test"
          component={Test}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />
        {/* Login screen */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false, animation: 'default'}}
        />
        <Stack.Screen
          name="GamePlayScreen"
          component={GamePlayScreen}
          options={{headerShown: false, animation: 'fade_from_bottom'}}
        />
        
        {/* All screens that the bottom tabs navigate to */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />
        
        <Stack.Screen
          name="LeaderboardScreen"
          component={LeaderboardScreen}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />
        
        <Stack.Screen
          name="LeagueScreen"
          component={LeagueScreen}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />
        
        <Stack.Screen
          name="ChatsScreen"
          component={ChatsScreen}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />
        
        {/* Auth screens (commented out for now) */}
        {/* {!isLogin ? (
          // ... auth screens
        ) : (
          // ... app screens
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});