import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Wallpaper from '../components/wallpaper';
import BottomTabs from '../route/BottomTabs';
import FriendsList from '../components/FriendsList';
import { width, height } from '../utils/dimension';
import AppColors from '../utils/Colors';
import QuickActions from '../components/QuickActions';


const Test = ({ navigation }) => {
  // 12 online friends - 8 visible initially and 4 that need scrolling to see
  const [friends] = useState([
    {
      id: '1',
      avatar: require('../assets/images/icon.png'), // Replace with your actual avatar images
      online: true,
    },
    {
      id: '2',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '3',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '4',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '5',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '6',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '7',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '8',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    // These 4 will need scrolling to see
    {
      id: '9',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '10',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '11',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
    {
      id: '12',
      avatar: require('../assets/images/icon.png'),
      online: true,
    },
  ]);

  const handleFriendPress = (friend) => {
    // Handle friend press - e.g., navigate to profile or open chat
    console.log('Friend pressed:', friend.id);
  };
  const handleQuickAction = (actionId) => {
    console.log('Quick action pressed:', actionId);
    
    // Handle different actions
    switch (actionId) {
      case 'store':
        // Navigate to store
        break;
      case 'friends':
        // Navigate to friends list
        break;
      case 'messages':
        // Navigate to messages
        break;
      case 'leagues':
        // Navigate to leagues
        break;
      case 'settings':
        // Navigate to settings
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Wallpaper>
        <View style={styles.container}>
          {/* Your main game content goes here */}
          
          {/* Play button would go here */}
          
          {/* FriendsList positioned at bottom */}
          <QuickActions 
            style={styles.quickActions}
            onActionPress={handleQuickAction}
          />
          <FriendsList 
            friends={friends} 
            containerStyle={styles.friendsList}
            onFriendPress={handleFriendPress}
            visibleCount={8} // Show 8 friends initially, with +4 indicator
          />
          
          {/* Bottom navigation tabs */}
          <BottomTabs style={styles.bottomTabs} />
        </View>
      </Wallpaper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: '#000',
  },
  container: {
    // flex: 1,
    position: 'relative',
  },
  friendsList: {
    position: 'static',
    top: height(80), // Position above the bottom tabs
    left: width(60),
    // right: 10,
    width: width(40)
  },
  bottomTabs: {

    // bottom: 100,
    // The BottomTabs component already handles its positioning
  },
});

export default Test;