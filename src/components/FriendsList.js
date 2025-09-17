
import { height, width } from '../utils/dimension';
import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text, Animated, Easing } from 'react-native';
import AppColors from '../utils/Colors';
import Icon from 'react-native-remix-icon'; // Assuming you're using this for icons

const FriendsList = ({ friends, containerStyle, onFriendPress, onChatPress, onPlayWithPress, onPlayAgainstPress }) => {
  // State to track which friend is selected
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  // Timer ref for auto-closing the action buttons
  const timerRef = useRef(null);
  // Animation value for the action buttons
  const actionAnimValue = useRef(new Animated.Value(0)).current;

  // Calculate how many additional friends are hidden
  const visibleCount = friends.length < 12 ? friends.length : 12; // More visible items for landscape
  const hiddenCount = friends.length > visibleCount ? friends.length - visibleCount : 0;

  // Handle friend item press
  const handleFriendPress = (friend) => {
    // If the same friend is clicked again, close the actions
    if (selectedFriendId === friend.id) {
      closeActions();
      return;
    }

    // Close any existing action menu
    clearTimeout(timerRef.current);

    // Set the selected friend and animate the actions opening
    setSelectedFriendId(friend.id);

    // Animate the actions appearing
    Animated.timing(actionAnimValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // Start timer to auto-close after 3 seconds
    timerRef.current = setTimeout(() => {
      closeActions();
    }, 3000);

    // Call the parent's onFriendPress callback if provided
    if (onFriendPress) {
      onFriendPress(friend);
    }
  };

  // Function to close action buttons
  const closeActions = () => {
    // Animate the actions disappearing
    Animated.timing(actionAnimValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSelectedFriendId(null);
    });

    // Clear the auto-close timer
    clearTimeout(timerRef.current);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle action button press
  const handleActionPress = (action, friend) => {
    // Close action menu
    closeActions();

    // Call the appropriate callback based on the action
    switch (action) {
      case 'chat':
        if (onChatPress) onChatPress(friend);
        break;
      case 'playWith':
        if (onPlayWithPress) onPlayWithPress(friend);
        break;
      case 'playAgainst':
        if (onPlayAgainstPress) onPlayAgainstPress(friend);
        break;
      default:
        break;
    }
  };

  const renderFriendItem = ({ item, index }) => {
    const isSelected = selectedFriendId === item.id;

    // Animation configurations for the three action buttons - adjusted for landscape
    const chatTranslateX = actionAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width(8)] // Move to the left
    });

    const playWithTranslateY = actionAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height(10)] // Move up
    });

    const playAgainstTranslateX = actionAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width(8)] // Move to the right
    });

    const actionsOpacity = actionAnimValue;

    return (
      <View style={styles.friendItemContainer}>
        <TouchableOpacity
          style={[
            styles.friendItem,
            isSelected && styles.selectedFriendItem
          ]}
          onPress={() => handleFriendPress(item)}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={item.avatar}
              style={styles.avatar}
              resizeMode="cover"
            />
            {item.online && <View style={styles.onlineIndicator} />}
          </View>
{isSelected && <Text style={styles.nameLabel}>{String(item.name || 'Lion')}</Text>}

          {/* Place actions INSIDE the TouchableOpacity so they align correctly */}
          {isSelected && (
            <View style={styles.actionsContainer}>
              {/* Chat */}
              <Animated.View style={[
                styles.actionButton,
                {
                  opacity: actionsOpacity,
                  transform: [{ translateX: chatTranslateX }]
                }
              ]}>
                <TouchableOpacity
                  style={[styles.actionButtonInner, styles.chatButton]}
                  onPress={() => handleActionPress('chat', item)}
                >
                  <Icon name="chat-3-line" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </Animated.View>

              {/* Play With */}
              <Animated.View style={[
                styles.actionButton,
                {
                  opacity: actionsOpacity,
                  transform: [{ translateY: playWithTranslateY }]
                }
              ]}>
                <TouchableOpacity
                  style={[styles.actionButtonInner, styles.playWithButton]}
                  onPress={() => handleActionPress('playWith', item)}
                >
                  <Icon name="add-line" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </Animated.View>

              {/* Play Against */}
              <Animated.View style={[
                styles.actionButton,
                {
                  opacity: actionsOpacity,
                  transform: [{ translateX: playAgainstTranslateX }]
                }
              ]}>
                <TouchableOpacity
                  style={[styles.actionButtonInner, styles.playAgainstButton]}
                  onPress={() => handleActionPress('playAgainst', item)}
                >
                  <Icon name="add-line" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </TouchableOpacity>
      </View>

    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={friends.slice(0, visibleCount)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFriendItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        initialNumToRender={visibleCount}
      />
      {hiddenCount > 0 && (
        <View style={styles.countIndicator}>
          <Text style={styles.countText}>+{hiddenCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    // height: width(20),
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderLeftColor: AppColors?.darkRed || '#8B0000',
    borderLeftWidth: 1,
    overflow: 'visible',
    paddingHorizontal: width(1), // Reduced for landscape
  },
  listContent: {
    // paddingVertical: height(1),
    alignItems: 'center',

  },
  friendItemContainer: {
    position: 'relative',
    paddingTop: height(15),
    overflow: 'visible',
    // width: width(5),
    // height: width(15),
    marginHorizontal: width(0.5), // Reduced for landscape
    zIndex: 1,
  },
  friendItem: {
    alignItems: 'center',

    justifyContent: 'center',
  },
  selectedFriendItem: {
    zIndex: 2,
    transform: [{ translateY: -height(5) }] 
  },
  avatarContainer: {
    position: 'relative',
    width: width(5), // Smaller for landscape
    // height: width(5), // Smaller for landscape
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: width(4.5), // Smaller for landscape
    height: width(4.5), // Smaller for landscape
    borderRadius: width(2.25), // Half of width
    borderWidth: 2,
    borderColor: AppColors?.darkRed || '#8B0000',
  },
  onlineIndicator: {
    position: 'absolute',
    width: width(1),
    height: width(1),
    borderRadius: width(0.5),
    backgroundColor: '#00FF00',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    bottom: width(0.3),
    right: width(0.3),
  },
  nameLabel: {
    color: '#FFD700',
    fontSize: width(1.5),
    marginTop: height(0.5),
    fontWeight: 'bold',
  },
  actionsContainer: {
    position: 'absolute',
    top: 0,
    // height: height(25),
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    transform: [{ translateY: -height(4) }] ,
    alignItems: 'center',
    zIndex: 3,
  },

  actionButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  actionButtonInner: {
    width: width(6), // Smaller for landscape
    height: height(5), // Smaller for landscape
    borderRadius: width(1),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatButton: {
    backgroundColor: AppColors?.darkRed || '#8B0000',
  },
  playWithButton: {
    backgroundColor: AppColors?.darkRed || '#8B0000',
  },
  playAgainstButton: {
    backgroundColor: AppColors?.darkRed || '#8B0000',
  },
  countIndicator: {
    width: width(4),
    height: width(4),
    borderRadius: width(2),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width(1),
  },
  countText: {
    color: '#FFFFFF',
    fontSize: width(1.5),
    fontWeight: 'bold',
  },
});

export default FriendsList;