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
    gameMode: gameSettings?.gameMode || 'normal', // normal, fast, tournament
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
        <Text style={styles.positionLabel}>{positionName}</Text>
        <View style={[
          styles.playerSlot, 
          player ? styles.filledSlot : styles.emptySlot
        ]}>
          {player ? (
            <View style={styles.playerInfo}>
              <View style={styles.playerAvatar}>
                <Text style={styles.avatarText}>
                  {player.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.playerName} numberOfLines={1}>
                {player.name}
              </Text>
              <Text style={styles.playerLevel}>Lv.{player.level || 1}</Text>
            </View>
          ) : (
            <View style={styles.emptyPlayerInfo}>
              <Text style={styles.emptyText}>Waiting...</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderGameSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Game Settings</Text>
      
      {/* Minimum Level Setting */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Minimum Level</Text>
        <View style={styles.levelSelector}>
          {[1, 5, 10, 15, 20].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelButton,
                localSettings.minLevel === level && styles.selectedLevelButton
              ]}
              onPress={() => updateSetting('minLevel', level)}
            >
              <Text style={[
                styles.levelButtonText,
                localSettings.minLevel === level && styles.selectedLevelButtonText
              ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sound Setting */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Sound Effects</Text>
        <Switch
          value={localSettings.soundEnabled}
          onValueChange={(value) => updateSetting('soundEnabled', value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={localSettings.soundEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Chat Setting */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Chat</Text>
        <Switch
          value={localSettings.chatEnabled}
          onValueChange={(value) => updateSetting('chatEnabled', value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={localSettings.chatEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Game Mode Setting */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Game Mode</Text>
        <View style={styles.gameModeSelector}>
          {['normal', 'fast', 'tournament'].map(mode => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                localSettings.gameMode === mode && styles.selectedModeButton
              ]}
              onPress={() => updateSetting('gameMode', mode)}
            >
              <Text style={[
                styles.modeButtonText,
                localSettings.gameMode === mode && styles.selectedModeButtonText
              ]}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Game Lobby</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Player Positions */}
          <View style={styles.playersSection}>
            <Text style={styles.sectionTitle}>Players ({players.length}/4)</Text>
            <View style={styles.playersGrid}>
              {renderPlayerPosition(1, 'North')}
              {renderPlayerPosition(2, 'East')}
              {renderPlayerPosition(3, 'South')}
              {renderPlayerPosition(4, 'West')}
            </View>
          </View>

          {/* Game Settings */}
          {renderGameSettings()}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={saveSettings}
            >
              <Text style={styles.saveButtonText}>Save & Start</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  diamondModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: width(85),
    maxHeight: height(80),
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalContent: {
    // flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playersSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerPosition: {
    width: '48%',
    marginBottom: 15,
  },
  positionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  playerSlot: {
    height: 80,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledSlot: {
    backgroundColor: '#e8f5e8',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  emptySlot: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  playerInfo: {
    alignItems: 'center',
  },
  playerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  playerLevel: {
    fontSize: 10,
    color: '#666',
  },
  emptyPlayerInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  settingsSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  levelSelector: {
    flexDirection: 'row',
  },
  levelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedLevelButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  levelButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedLevelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gameModeSelector: {
    flexDirection: 'row',
  },
  modeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 6,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedModeButton: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  modeButtonText: {
    fontSize: 12,
    color: '#666',
  },
  selectedModeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GameLobbyModal;