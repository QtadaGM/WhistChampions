
import { height, width } from '../utils/dimension';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Icon from 'react-native-remix-icon';
import AppColors from '../utils/Colors';

const BottomTabs = ({ style }) => {
  const navigation = useNavigation();
  const route = useRoute();

  // Tab configuration with Arabic names as shown in the screenshot
  const tabs = [
    {
      name: 'LeaderboardStack',
      icon: 'trophy-line',
      activeIcon: 'trophy-fill',
      label: 'المتصدرين',
      navigateTo: 'LeaderboardScreen'
    },
    {
      name: 'MainStack',
      icon: 'home-line',
      activeIcon: 'home-fill',
      label: 'الرئيسية',
      navigateTo: 'HomeScreen'
    },
    {
      name: 'CommunicationStack',
      icon: 'chat-3-line',
      activeIcon: 'chat-3-fill',
      label: 'التواصل',
      navigateTo: 'ChatsScreen'
    },
    {
      name: 'LeagueStack',
      icon: 'group-line',
      activeIcon: 'group-fill',
      label: 'الدوريات',
      navigateTo: 'LeagueScreen'
    },
  ];

  const handleTabPress = (tab) => {
    try {
      navigation.navigate(tab.navigateTo);
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  const isTabActive = (tabName) => {
    return route.name === tabName;
  };

  return (
    <View style={[styles.tabBar, style]}>
      {tabs.map((tab) => {
        const focused = isTabActive(tab.navigateTo);
        const iconName = focused ? tab.activeIcon : tab.icon;

        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tabBarItem, focused && styles.focusedTabBarItem]}
            onPress={() => handleTabPress(tab)}
          >
            <Icon
              name={iconName}
              size={24}
              color={focused ? '#FFFFFF' : '#BBBBBB'}
            />
            {/* Only show label for focused tab */}
            {focused && (
              <Text style={styles.focusedTabLabel}>
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    top: height(80),
    left: width(2),
    alignSelf: 'center',
    flexDirection: 'row-reverse', // For RTL layout as shown in the screenshot
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark semi-transparent background
    // borderRadius: width(3),
    paddingHorizontal: width(1),
    paddingVertical: height(1), // Added vertical padding for better spacing
    // borderWidth: 1, // Red border similar to the theme
  },
  tabBarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: width(5), // Width of each tab item
    justifyContent: 'center',
    paddingHorizontal: width(1), // Added horizontal padding between items
    minWidth: width(4), // Minimum width to maintain consistent spacing
  },
  focusedTabBarItem: {
    backgroundColor: 'rgba(139, 0, 0, 0.7)', // Dark red for active tab
    borderColor: 'rgba(139, 0, 0, 0.5)',
    borderRadius: width(50),
    width: width(15),
    transform: [{ scale: 1 }], // Slight scale for focused item
    paddingVertical: height(0.5), // Additional padding for focused item
  },
  focusedTabLabel: {

    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    marginTop: height(0.5),
    color: '#FFFFFF', // White for active tab
  },
});