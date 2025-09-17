import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ElegantLoader = ({
  visible = true,
  type = 'pulse', // 'pulse', 'dots', 'spinner', 'wave', 'bounce'
  color = '#A52A2A',
  size = 'medium', // 'small', 'medium', 'large'
  text = '',
  textColor = '#666',
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  overlay = true,
}) => {
  const animValue1 = useRef(new Animated.Value(0)).current;
  const animValue2 = useRef(new Animated.Value(0)).current;
  const animValue3 = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  const getSizes = () => {
    switch (size) {
      case 'small':
        return { container: 60, dot: 8, spinner: 30 };
      case 'large':
        return { container: 120, dot: 16, spinner: 60 };
      default:
        return { container: 80, dot: 12, spinner: 40 };
    }
  };

  const sizes = getSizes();

  useEffect(() => {
    if (!visible) return;

    const startAnimations = () => {
      switch (type) {
        case 'pulse':
          Animated.loop(
            Animated.sequence([
              Animated.timing(animValue1, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(animValue1, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;

        case 'dots':
          const dotAnimation = () => {
            Animated.sequence([
              Animated.timing(animValue1, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(animValue2, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(animValue3, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.parallel([
                Animated.timing(animValue1, {
                  toValue: 0,
                  duration: 400,
                  useNativeDriver: true,
                }),
                Animated.timing(animValue2, {
                  toValue: 0,
                  duration: 400,
                  useNativeDriver: true,
                }),
                Animated.timing(animValue3, {
                  toValue: 0,
                  duration: 400,
                  useNativeDriver: true,
                }),
              ]),
            ]).start(() => dotAnimation());
          };
          dotAnimation();
          break;

        case 'spinner':
          Animated.loop(
            Animated.timing(spinValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            })
          ).start();
          break;

        case 'wave':
          const waveAnimation = () => {
            Animated.stagger(200, [
              Animated.sequence([
                Animated.timing(animValue1, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(animValue1, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
              Animated.sequence([
                Animated.timing(animValue2, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(animValue2, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
              Animated.sequence([
                Animated.timing(animValue3, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(animValue3, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
            ]).start(() => waveAnimation());
          };
          waveAnimation();
          break;

        case 'bounce':
          Animated.loop(
            Animated.sequence([
              Animated.timing(animValue1, {
                toValue: -20,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(animValue1, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;
      }
    };

    startAnimations();
  }, [visible, type]);
   
  if (!visible) return null;

  const renderLoader = () => {
    switch (type) {
      case 'pulse':
        return (
          <Animated.View
            style={[
              styles.pulseContainer,
              {
                width: sizes.container,
                height: sizes.container,
                backgroundColor: color,
                transform: [
                  {
                    scale: animValue1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
                opacity: animValue1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
              },
            ]}
          />
        );

      case 'dots':
        return (
          <View style={styles.dotsContainer}>
            {[animValue1, animValue2, animValue3].map((anim, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: sizes.dot,
                    height: sizes.dot,
                    backgroundColor: color,
                    transform: [
                      {
                        scale: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1],
                        }),
                      },
                    ],
                    opacity: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        );

      case 'spinner':
        const spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });

        return (
          <Animated.View
            style={[
              styles.spinner,
              {
                width: sizes.spinner,
                height: sizes.spinner,
                borderColor: `${color}30`,
                borderTopColor: color,
                transform: [{ rotate: spin }],
              },
            ]}
          />
        );

      case 'wave':
        return (
          <View style={styles.waveContainer}>
            {[animValue1, animValue2, animValue3].map((anim, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.waveBar,
                  {
                    backgroundColor: color,
                    transform: [
                      {
                        scaleY: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        );

      case 'bounce':
        return (
          <Animated.View
            style={[
              styles.bounceContainer,
              {
                width: sizes.container,
                height: sizes.container,
                backgroundColor: color,
                transform: [{ translateY: animValue1 }],
              },
            ]}
          />
        );

      default:
        return null;
    }
  };

  const containerStyle = overlay
    ? [styles.overlay, { backgroundColor }]
    : styles.inline;

  return (
    <View style={containerStyle}>
      <View style={styles.loaderContainer}>
        {renderLoader()}
        {text ? (
          <Text style={[styles.loadingText, { color: textColor }]}>
            {text}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  inline: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseContainer: {
    borderRadius: 50,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 50,
    marginHorizontal: 4,
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 50,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  waveBar: {
    width: 4,
    height: 40,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  bounceContainer: {
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ElegantLoader;