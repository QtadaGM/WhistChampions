import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react';

const ProgressBarWithStreaks = () => {
  // Sample progress value (0-1)
  const progress = 0.6;
  
  // Sample streak data (active/inactive)
  const streaks = [
    { active: true },
    { active: true },
    { active: true },
    { active: true },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { height: `${progress * 100}%` }]} />
        </View>
        
        <View style={styles.streakContainer}>
          {streaks.map((streak, index) => (
            <View key={index} style={styles.streakIconContainer}>
              <Flame 
                size={24}
                color={streak.active ? "#ff8c00" : "#222"} 
                fill={streak.active ? "#ff8c00" : "none"}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  progressBar: {
    height: '100%',
    alignItems: 'center',
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
  }
});

export default ProgressBarWithStreaks;