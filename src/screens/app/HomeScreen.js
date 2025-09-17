import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, Button, ProgressBarAndroidBase, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Wallpaper from '../../components/wallpaper';
import BottomTabs from '../../route/BottomTabs';
import FriendsList from '../../components/FriendsList';
import ElegantLoader from '../../components/ElegantLoader';
import { width, height } from '../../utils/dimension';
import AppColors from '../../utils/Colors';
import QuickActions from '../../components/QuickActions';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import Modal from "react-native-modal"
import GameLobbyModal from '../modals/GameLobbyModal';
import { Animated } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [levelName, setLevelName] = useState('ملازم');
  const [loadingText, setLoadingText] = useState('Loading');
  const [isScreenReady, setIsScreenReady] = useState(false); // Add this state

  // 12 online friends - 8 visible initially and 4 that need scrolling to see
  const [friends, setFrinds] = useState([
    {
      id: '1',
      avatar: require('../../assets/images/icon.png'), // Replace with your actual avatar images
      online: true,
    },
    {
      id: '2',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
    {
      id: '3',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
    {
      id: '4',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
    {
      id: '5',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
    {
      id: '6',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
    {
      id: '7',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
    {
      id: '8',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
    {
      id: '9',
      avatar: require('../../assets/images/icon.png'),
      online: true,
    },
  ]);
  const [lobbyModalVisible, setLobbyModalVisible] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    minLevel: 1,
    soundEnabled: true,
    chatEnabled: true,
    gameMode: 'normal'
  });

  // Sample players data - replace with your actual player data
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Player1',
      level: 15,
      position: 1, // North
      avatar: 'avatar1.png'
    },
    {
      id: 2,
      name: 'JohnDoe',
      level: 8,
      position: 3, // South
      avatar: 'avatar2.png'
    }
    // Positions 2 (East) and 4 (West) are empty
  ]);

  // Add useEffect to handle initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenReady(true);
    }, 100); // Small delay to ensure everything is mounted

    return () => clearTimeout(timer);
  }, []);

  const handleSettingsUpdate = (newSettings) => {
    setGameSettings(newSettings);
    console.log('Updated game settings:', newSettings);
    // Here you would typically send the settings to your game server
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handlePlay = async () => {
    setLoadingText("جاري البحث عن طاولة ...")
    setLoading(true)
    await wait(100);
    setLoading(false);
    navigation.navigate('GamePlayScreen');
  }

  const handlePlayWith = (f) => {
    console.log('====================================');
    console.log("play with :", f);
    console.log('====================================');
  }

  const handlePlayAgainst = (f) => {
    console.log('====================================');
    console.log("play against :", f);
    console.log('====================================');
  }

  const handleChatWith = (f) => {
    console.log('====================================');
    console.log("chat with :", f);
    console.log('====================================');
  }

  // Sample progress value (0-1)
  const progress = 0.6;

  // Sample streak data (active/inactive)
  const streaks = [
    { active: true },
    { active: true },
    { active: true },
    { active: true },
  ];

  const handleGamePlay = (type) => {
    console.log('====================================');
    setLobbyModalVisible(true)
    console.log('====================================');
  };

  const handleFriendPress = (friend) => {
    // Handle friend press - e.g., navigate to profile or open chat
    console.log('Friend pressed:', friend.id);
  };

  const score = 1;
  const diamonds = 104;
  const name = 'Abdul Kadir'; // Replace with actual player name
  const clan = 'ويست الابطال'; // Replace with actual clan name

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

  const Rank = ({ score, style, onLevelChange }) => {
    // the image source depends on the score value passed to the component
    let imageSource;
    let level; // Define level here

    if (score <= 100) {
      level = 'ملازم';
      imageSource = require('../../assets/images/ranks/1.png');
    } else if (score <= 200) {
      level = 'ملازم أول';
      imageSource = require('../../assets/images/ranks/2.png');
    } else if (score <= 300) {
      level = 'نقيب';
      imageSource = require('../../assets/images/ranks/3.png');
    } else if (score <= 400) {
      level = 'رائد';
      imageSource = require('../../assets/images/ranks/4.png');
    } else if (score <= 500) {
      level = 'مقدم';
      imageSource = require('../../assets/images/ranks/5.png');
    } else if (score <= 600) {
      level = 'عقيد';
      imageSource = require('../../assets/images/ranks/6.png');
    } else if (score <= 700) {
      level = 'عميد';
      imageSource = require('../../assets/images/ranks/7.png');
    } else if (score <= 800) {
      level = 'لواء';
      imageSource = require('../../assets/images/ranks/8.png');
    } else if (score <= 900) {
      level = 'فريق';
      imageSource = require('../../assets/images/ranks/9.png');
    } else if (score <= 1000) {
      level = 'فريق أول';
      imageSource = require('../../assets/images/ranks/10.png');
    } else if (score >= 1100) {
      level = 'مشير';
      imageSource = require('../../assets/images/ranks/11.png');
    } else {
      level = 'جندي';
      imageSource = require('../../assets/images/ranks/11.png');
    }

    useEffect(() => {
      if (onLevelChange) {
        onLevelChange(level);
      }
    }, [level, onLevelChange]);

    return (
      <View style={styles.container}>
        <Image source={imageSource} resizeMode='contain' style={{ ...style, aspectRatio: '1/1' }} />
      </View>
    );
  };

  // Don't render anything until screen is ready
  if (!isScreenReady) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Wallpaper>
          <View style={styles.loadingContainer}>
            <Text style={{ color: 'white' }}>Loading...</Text>
          </View>
        </Wallpaper>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Wallpaper>
        <View style={styles.userTab}>
          <View style={{ flexDirection: 'row', width: "60%" }}>
            <View style={{ width: 50 }}>
              {/* user img */}
              <Image 
                source={require('../../assets/images/icon.png')}
                style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: AppColors.white }}
                resizeMode="cover" 
              />
            </View>
            <View style={{ width: 125 }}>
              <Text style={styles.playerName}>{name}</Text>
              <Text style={{ color: AppColors.white, fontSize: 14, textAlign: 'center' }} numberOfLines={1} ellipsizeMode="tail">{clan}</Text>
            </View>
          </View>
          <View style={{ width: 37.5, display: 'flex', justifyContent: 'center' }}>
            <Rank score={score} style={styles.rank} onLevelChange={setLevelName} />
          </View>
          <View style={{ width: 37.5 }}>
            <Text style={{ color: AppColors.white, fontSize: 14, textAlign: 'center' }} numberOfLines={1} ellipsizeMode="tail">{score}</Text>
            <Text style={{ color: AppColors.white, fontSize: 14, textAlign: 'center' }} numberOfLines={1} ellipsizeMode="tail">{levelName}</Text>
          </View>
        </View>

        {/* FriendsList positioned at bottom */}
        <QuickActions style={styles.quickActions} onActionPress={handleQuickAction} />
        
        <FriendsList
          friends={friends}
          onChatPress={handleChatWith}
          onPlayAgainstPress={handlePlayAgainst}
          onPlayWithPress={handlePlayWith}
          containerStyle={styles.friendsList}
          onFriendPress={handleFriendPress} 
        />
        
        <TouchableOpacity style={styles.buyDiamonds} onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/images/diamond.png')} style={{ width: 15, height: 15 }} resizeMode="cover" />
          <Text style={{ color: AppColors.white, fontSize: 14, textAlign: 'center' }} numberOfLines={1} ellipsizeMode="tail">{diamonds} +</Text>
        </TouchableOpacity>

        {/* play buttons would go here */}
        <View style={styles.mainPlay}>
          <TouchableOpacity style={styles.mainBtn} onPress={handlePlay}>
            <Text style={styles.mainBTnText} numberOfLines={1} ellipsizeMode="tail">لعبه سريعة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => handleGamePlay('private')}>
            <Image source={require('../../assets/room.png')} />
          </TouchableOpacity>
        </View>

        {/* vertical progress bar and the streak indicators*/}
        <View style={styles.mycontainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { height: `${progress * 100}%` }]} />
            </View>

            <View style={styles.streakContainer}>
              {streaks.map((streak, index) => (
                <View key={index} style={styles.streakIconContainer}>
                  <Video
                    source={streak.active
                      ? require('../../assets/active-flame.mp4')
                      : require('../../assets/inactive-flame.mp4')
                    }
                    style={styles.streakVideo}
                    repeat={true}
                    resizeMode="cover"
                    muted={true}
                    playInBackground={false}
                    playWhenInactive={false}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Bottom navigation tabs */}
        <BottomTabs style={styles.bottomTabs} />
        
        <ElegantLoader
          visible={isLoading}
          type="wave"
          text={loadingText}
          color="#A52A2A"
        />
      </Wallpaper>

      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.5}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.diamondModal}
        statusBarTranslucent={true}
      >
        <ScrollView style={styles.modalContent}>
          <Text>ggggg</Text>
          <Text>ggggg</Text>
          <Text>ggggg</Text>
          <Text>ggggg</Text>
          <Text>ggggg</Text>
        </ScrollView>
      </Modal>

      <GameLobbyModal
        modalVisible={lobbyModalVisible}
        setModalVisible={setLobbyModalVisible}
        gameSettings={gameSettings}
        setGameSettings={handleSettingsUpdate}
        players={players}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buyDiamonds: {
    position: 'absolute',
    display: 'flex',
    top: height(5),
    left: width(40),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: AppColors.darkRed,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.white,
    width: 'auto',
    paddingHorizontal: 5,
    maxWidth: 100,
  },
  safeArea: {
    // flex: 1, // Changed from commented out to flex: 1
    backgroundColor: '#000',
  },
  container: {
    // Changed from commented out to flex: 1
      position: 'relative',
      },
      loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      },
      friendsList: {
      position: 'absolute',
      bottom: height(5),
      left: width(55),
      overflow: 'visible',
      width: width(40),
      },
      mainPlay: {
      position: 'absolute',
      top: height(55),
      left: width(55),
      width: width(30),
      height: height(12),
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      transform: [{ translateY: 0 }],
      },
      mainBtn: {
      backgroundColor: AppColors.darkRed,
      position: 'relative',
      borderRadius: 10,
      height: height(10),
      paddingHorizontal: 20,
      marginHorizontal: 5,
      width: width(20),
      justifyContent: 'center',
      alignItems: 'center',
      },
      mainBTnText: {
      color: AppColors.white, // Added color
    fontSize: 16, // Added font size
    fontWeight: 'bold', // Added font weight
  },
  secondaryBtn: {
    backgroundColor: AppColors.darkRed,
    borderRadius: 10,
    marginHorizontal: 5,
    width: width(5),
    height: width(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabs: {
    // The BottomTabs component already handles its positioning
  },
  rank: {
    height: "100%",
    paddingRight: width(2),
  },
  userTab: {
    position: 'absolute',
    top: height(5),
    left: width(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    width: 260,
  },
  playerName: {
    color: AppColors.white,
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    alignItems: 'flex-start', // Changed from 'left' to 'flex-start'
  },
  progressBarContainer: {
    width: 12,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderRadius: 6,
  },
  streakContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  streakIconContainer: {
    marginHorizontal: 4,
  },
  streakVideo: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  mycontainer: {
    flex: 1,
    justifyContent: 'flex-start', // Changed from 'left' to 'flex-start'
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: height(65),
    top: height(20),
    width: width(50),
    left: width(5),
    position: 'absolute',
    padding: 20,
  },
  diamondModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    overflow: 'hidden',
    width: width(50),
    alignContent: "center",
  }
});

export default HomeScreen;