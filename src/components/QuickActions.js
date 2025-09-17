
import { width, height } from '../utils/dimension';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-remix-icon';
import AppColors from '../utils/Colors';

const QuickActions = ({ onActionPress, style }) => {
  const [expanded, setExpanded] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  // Actions to display with their icons and labels
  const actions = [
    { id: 'store', icon: 'store-line', label: 'متجر' },
    { id: 'friends', icon: 'user-follow-line', label: 'أصدقاء' },
    { id: 'messages', icon: 'chat-3-line', label: 'رسائل' },
    { id: 'leagues', icon: 'trophy-line', label: 'دوري' },
    { id: 'settings', icon: 'settings-5-line', label: 'إعدادات' },
  ];

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Toggle button at the top */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          expanded ? styles.toggleButtonActive : null,
        ]}
        onPress={toggleExpanded}
      >
        <Icon 
          name={expanded ? "close-line" : "menu-line"} 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>

      {/* Action buttons that expand downward */}
      {actions.map((action, index) => {
        const translateY = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ((index + 1) * (height(8) + height(2)))] // Adjust the spacing as needed
        });

        const opacity = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0, 1],
        });

        // Only allow touch events when fully expanded
        const pointerEvents = expanded ? 'auto' : 'none';

        return (
          <Animated.View
            key={action.id}
            style={[
              styles.actionButtonContainer,
              {
                transform: [{ translateY }],
                opacity,
                zIndex: -index, // Higher items appear on top
              },
            ]}
            pointerEvents={pointerEvents}
          >
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onActionPress && onActionPress(action.id)}
            >
              <Icon name={action.icon} size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height(8),
    left: width(88),
    right: width(5),
    alignItems: 'center',
    zIndex: 100,
  },
  actionButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: width(1), // Position below the toggle button
  },
  actionButton: {
    width: width(8),
    height: width(5),
    borderRadius: width(0.5),
    backgroundColor: AppColors?.darkRed || '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  toggleButton: {
    width: width(8),
    height: width(4),
    borderRadius: width(1),
    backgroundColor: AppColors?.darkRed || '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    zIndex: 101, // Ensure toggle is above action buttons
  },
  toggleButtonActive: {
    backgroundColor: AppColors?.darkRed || '#7c0000',
  },
});

export default QuickActions;