// components/CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AppColors from '../utils/Colors';
import Icon from 'react-native-remix-icon';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === 'MainStack') iconName = 'home';
        if (route.name === 'LeaderboardStack') iconName = 'trophy';
        if (route.name === 'LeagueStack') iconName = 'people';
        if (route.name === 'CommunicationStack') iconName = 'chatbubble';

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.focused]}>
            {route.name === 'MainStack' ? (
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={isFocused ? AppColors.green : '#888C95'}
              />
            ) : (
              <Icon
                name={iconName}
                size={24}
                color={isFocused ? AppColors.green : '#888C95'}
              />
            )}
            {isFocused && (
              <Text style={styles.label}>
                {options.tabBarLabel || route.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: AppColors.darkRed,
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
    width: 240,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  focused: {
    borderColor: AppColors.green,
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
  },
  label: {
    color: AppColors.white,
    fontSize: 12,
    marginTop: 4,
  },
});
