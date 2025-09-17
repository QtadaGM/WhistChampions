import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import Wallpaper from '../../components/wallpaper';
import BottomTabs from '../../route/BottomTabs';
import FriendsList from '../../components/FriendsList';
import { width, height } from '../../utils/dimension';
import AppColors from '../../utils/Colors';
import QuickActions from '../../components/QuickActions';


const LeagueScreen = ({  }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const handleTabPress = () => {
    try {
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };
  return (
    <Wallpaper>
      {/* Top Logo and Title Image */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Image source={require('../../assets/images/wchamp.png')} style={styles.titleImage} />
      </View>

      {/* Language Switch */}
      <Text style={styles.languageSwitch}>English</Text>

      {/* Login Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.facebook]} onPress={() => handleTabPress()}>
          <Icon name="facebook" size={20} color="#fff" />
          <Text style={styles.buttonText}>الاستمرار عن طريق فايسبوك</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.google]} onPress={() => handleTabPress()}>
          <Icon name="google" size={20} color="#000" />
          <Text style={[styles.buttonText, { color: '#000' }]}>الاستمرار مع قوقل</Text>
        </TouchableOpacity>

        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={[styles.button, styles.guest]} onPress={() => handleTabPress()}>
          <Text style={styles.guestText}>الدخول كضيف</Text>
        </TouchableOpacity>
      </View>
    </Wallpaper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  titleImage: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
  },
  languageSwitch: {
    position: 'absolute',
    top: 50,
    right: 20,
    color: '#fff',
    fontWeight: '600',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    justifyContent: 'center',
  },
  facebook: {
    backgroundColor: '#3b5998',
  },
  google: {
    backgroundColor: '#fff',
  },
  guest: {
    backgroundColor: '#a00000',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
  guestText: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
  or: {
    color: '#fff',
    marginVertical: 10,
    fontStyle: 'italic',
  },
});


export default LeagueScreen;