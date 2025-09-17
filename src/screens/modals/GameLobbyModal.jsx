import React, { useState } from 'react';
import { 
  ScrollView, 
  Text, 
  View, 
  TouchableOpacity, 
  Switch, 
  StyleSheet 
} from 'react-native';
import Modal from 'react-native-modal';
import { height, width } from '../../utils/dimension';

const GameLobbyModal = ({ 
  modalVisible, 
  setModalVisible, 
  gameSettings, 
  setGameSettings,
  players = [] // array of player objects with {id, name, avatar, position}
}) => {
  const [localSettings, setLocalSettings] = useState({
    minLevel: gameSettings?.minLevel || 1,
    soundEnabled: gameSettings?.soundEnabled || true,
    chatEnabled: gameSettings?.chatEnabled || true,
    gameMode: gameSettings?.gameMode || 'normal',
    maxPlayers: 4,
    ...gameSettings
  });

  const updateSetting = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    setGameSettings(localSettings);
    setModalVisible(false);
  };

  const getPlayerAtPosition = (position) => {
    return players.find(player => player.position === position);
  };

  const renderPlayerPosition = (position, positionName) => {
    const player = getPlayerAtPosition(position);
    
    return (
      <View style={styles.playerPosition} key={position}>
        {player ? (
          <View style={styles.playerSlot}>
            <View style={styles.playerAvatar}>
              <Text style={styles.avatarText}>
                {player.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.playerName} numberOfLines={1}>
              {player.name}
            </Text>
          </View>
        ) : (
          <View style={styles.emptySlot}>
            <View style={styles.emptyAvatar}>
              <Text style={styles.emptyAvatarText}>+</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.7}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      style={styles.modal}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        {/* Left Side - Players */}
        <View style={styles.leftSection}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>نوع اللعبة: اسكجور جولات</Text>
          </View>

          {/* Players Section */}
          <View style={styles.playersSection}>
            <View style={styles.playersGrid}>
              {/* Top player */}
              <View style={styles.topPlayer}>
                {renderPlayerPosition(1, 'North')}
              </View>
              
              {/* Middle row with left, center, right */}
              <View style={styles.middleRow}>
                <View style={styles.leftPlayer}>
                  {renderPlayerPosition(4, 'West')}
                </View>
                
                <View style={styles.centerArea}>
                  {/* Center content - could be game info or logo */}
                </View>
                
                <View style={styles.rightPlayer}>
                  {renderPlayerPosition(2, 'East')}
                </View>
              </View>
              
              {/* Bottom player */}
              <View style={styles.bottomPlayer}>
                {renderPlayerPosition(3, 'South')}
              </View>
            </View>
          </View>
        </View>

        {/* Right Side - Settings and Actions */}
        <View style={styles.rightSection}>
          {/* Settings Section */}
          <View style={styles.settingsSection}>
            {/* Required Level */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>المستوى المطلوب للعب:</Text>
              <View style={styles.levelSelector}>
                <TouchableOpacity style={styles.levelDropdown}>
                  <Text style={styles.levelText}>{localSettings.minLevel}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sounds */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>الأصوات:</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>مغلقة</Text>
                <Switch
                  value={localSettings.soundEnabled}
                  onValueChange={(value) => updateSetting('soundEnabled', value)}
                  trackColor={{ false: '#4a4a4a', true: '#ff6b6b' }}
                  thumbColor={localSettings.soundEnabled ? '#fff' : '#666'}
                  style={styles.switch}
                />
                <Text style={styles.switchLabel}>مفتوحة</Text>
              </View>
            </View>

            {/* Tournament */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>البطولة:</Text>
              <Text style={styles.tournamentText}>غرفة مجموعة</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => {/* Handle share */}}
            >
              <Text style={styles.shareIcon}>📤</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width(80),
    height: height(85),
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#333',
    flexDirection: 'row',
  },
  leftSection: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  playersSection: {
    flex: 1,
    padding: 15,
  },
  playersGrid: {
    flex: 1,
    position: 'relative',
  },
  topPlayer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -30,
  },
  middleRow: {
    position: 'absolute',
    top: '50%',
    marginTop: -30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftPlayer: {
    marginLeft: 0,
  },
  rightPlayer: {
    marginRight: 0,
  },
  centerArea: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#444',
  },
  bottomPlayer: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -30,
  },
  playerPosition: {
    alignItems: 'center',
  },
  playerSlot: {
    alignItems: 'center',
  },
  playerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#DAA520',
    marginBottom: 5,
  },
  avatarText: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  emptySlot: {
    alignItems: 'center',
  },
  emptyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#444',
    borderStyle: 'dashed',
  },
  emptyAvatarText: {
    color: '#666',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsSection: {
    padding: 15,
    flex: 1,
  },
  settingRow: {
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'right',
  },
  levelSelector: {
    alignItems: 'flex-end',
  },
  levelDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    minWidth: 50,
  },
  levelText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  dropdownArrow: {
    color: '#fff',
    fontSize: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  switchLabel: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 5,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  tournamentText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameLobbyModal;