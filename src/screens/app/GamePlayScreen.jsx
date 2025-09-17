
import { width, height } from '../../utils/dimension';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Rank from '../../components/Rank';

const CardGameScreen = () => {
  const dropAnim = useRef(new Animated.Value(0)).current;
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardSourcePosition, setCardSourcePosition] = useState('left'); // default to bottom


  const players = [
    { id: '1', name: 'Sittalium', avatar: '👤', position: 'left', score: 147 },
    { id: '2', name: 'Player 2', avatar: '👤', position: 'top', score: 547 },
    { id: '3', name: 'Qtada_sama', avatar: '👤', position: 'right', score: 1407 },
    { id: '4', name: 'You', avatar: '👤', position: 'bottom', score: 147 },
  ];

  const chatMessages = [
    { id: '1', playerName: 'Qtada Ahmed', message: 'كسنقو ييي', timestamp: '10:30' },
    { id: '2', playerName: 'الحاح', message: 'شغل بختلف', timestamp: '10:31' },
    { id: '3', playerName: 'Qtada Ahmed', message: 'الله اكبر الله اكبر', timestamp: '10:32' },
  ];

  const playerCards = [
    { id: '1', suit: 'hearts', value: 'A', color: 'red' },
    { id: '2', suit: 'diamonds', value: 'K', color: 'red' },
    { id: '3', suit: 'clubs', value: 'Q', color: 'black' },
    { id: '4', suit: 'spades', value: 'J', color: 'black' },
  ];

  const lastPlayedCard = { id: 'last', suit: 'hearts', value: '1', color: 'red' };

  const getSuitSymbol = (suit) => {
    const symbols = {
      hearts: '♥',
      diamonds: '♦',
      clubs: '♣',
      spades: '♠'
    };
    return symbols[suit] || '♠';
  };
  const getDropAnimationStyle = (position) => {
  const distance = 30;
  let x = 0, y = 0;
  
  switch (position) {
    case 'top': y = -distance; break;
    case 'bottom': y = distance; break;
    case 'left': x = -distance; break;
    case 'right': x = distance; break;
  }

  const style = {
    transform: [
      { translateX: dropAnim.interpolate({ inputRange: [0, 1], outputRange: [x, 0] }) },
      { translateY: dropAnim.interpolate({ inputRange: [0, 1], outputRange: [y, 0] }) },
    ],
  };

  console.log('Animation style:', style, 'for position:', position);
  return style;
};

const playCard = (card, position = 'bottom') => {
  console.log('Playing card:', card);
  
  // Reset animation value
  dropAnim.setValue(0);
  
  // Update states
  setCardSourcePosition(position);
  setSelectedCard(card);

  // Start animation after state updates
  requestAnimationFrame(() => {
    Animated.sequence([
      Animated.timing(dropAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dropAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  });
};

  const renderCard = (card, isPlayable = false, isHidden = false, animatedStyle = {}, playerPosition = 'bottom') => {
  if (isHidden) return <View style={[styles.card, styles.hiddenCard]} />;
  if (!card) return <View style={[styles.card, styles.emptyCard]} />;
  console.log(playerPosition);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.card, styles[`card${playerPosition}`], isPlayable && styles.playableCard]}
        onPress={() => isPlayable && playCard(card, playerPosition)}
        activeOpacity={isPlayable ? 0.7 : 1}
      >
        <Text style={[styles.cardValue, card.color === 'red' && styles.redCard]}>
          {card.value}
        </Text>
        <Text style={[styles.cardSuit, card.color === 'red' && styles.redCard]}>
          {getSuitSymbol(card.suit)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};


  const renderPlayer = (player) => {
    const isCurrentPlayer = player.position === 'bottom';
    const cardCount = isCurrentPlayer ? playerCards.length : 5;

    return (
      <View
        key={player.id}
        style={[styles.playerContainer, styles[`player${player.position.charAt(0).toUpperCase() + player.position.slice(1)}`]]}>
        <Rank score={player.score} style={ styles[`player${player.position.charAt(0).toUpperCase() + player.position.slice(1)}Rank`]} />
        <View style={styles.playerAvatar} >
          <Text style={styles.avatarText}>{player.avatar}</Text>
        </View >
        <Text style={styles.playerName}>{player.name}</Text>

        {/* <View style={[
          styles.opponentCards,
          styles[opponentCards${player.position.charAt(0).toUpperCase() + player.position.slice(1)}]
        ]}>
          {Array.from({ length: cardCount }).map((_, index) => (
            <View key={index}>
              {isCurrentPlayer 
                ? renderCard(playerCards[index], true)
                : renderCard(null, false, true)
              }
            </View>
          ))}
        </View> */}
      </View >
    );
  };



const renderChatPanel = () => (
  <View style={styles.chatPanel}>
    <Text style={styles.chatTitle}>المحادثة</Text>
    <ScrollView style={styles.chatMessages}>
      {chatMessages.map((message) => (
        <View key={message.id} style={styles.chatMessage}>
          <Text style={styles.chatPlayerName}>{message.playerName}</Text>
          <Text style={styles.chatMessageText}>{message.message}</Text>
          <Text style={styles.chatTimestamp}>{message.timestamp}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const renderGameTable = () => (
  <View style={styles.gameTable}>
    <Image
      style={styles.tableBackground}
      source={require('../../assets/table.png')}
      resizeMode="cover"
    />
    <View style={styles.tableCards}>
      <View style={styles.topCardPosition}>
        {renderCard(null, false, true)}
      </View>

      <View style={styles.sideCardsRow}>
        {renderCard(null, false, true)}
        {renderCard(card=lastPlayedCard, isPlayable=true, isHidden=false, animatedStyle=getDropAnimationStyle(cardSourcePosition), playerPosition='right')}
      </View>

<View style={styles.bottomCardPosition}>
  <Animated.View style={getDropAnimationStyle(cardSourcePosition)}>
        {renderCard(card=lastPlayedCard, isPlayable=true, isHidden=false, animatedStyle=getDropAnimationStyle(cardSourcePosition), playerPosition='top')}
  </Animated.View>
</View>

    <View style={styles.centerArea}>
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerText}>منطقة اللعب</Text>
      </View>
    </View>
  </View>
  </View>
);

const renderControls = () => (
  <>
    <View style={styles.sideControls}>
      <TouchableOpacity style={styles.controlButton}>
        <Text style={styles.controlIcon}>⚙️</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton}>
        <Text style={styles.controlIcon}>💬</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.lastCardContainer}>
      <Text style={styles.lastCardLabel}>آخر ورقة</Text>
      {renderCard(lastPlayedCard)}
    </View>

    <View style={styles.strikerPicker}>
      <TouchableOpacity style={styles.strikerButton}>
        <Text style={styles.strikerText}>🎯</Text>
      </TouchableOpacity>
    </View>
  </>
);

return (
  <SafeAreaView style={styles.container}>

    <View style={styles.header}>
      <View style={styles.gameInfo}>
        <Text style={styles.infoText}>المجموع: 120</Text>
        <Text style={styles.infoText}>الجولة: 3</Text>
      </View>
      <Text style={styles.headerText}>لعبة الورق</Text>
    </View>

    <View style={styles.gameArea}>
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../assets/gbBG.png')}
      />

      <View style={styles.table}>
        <Image
          style={[styles.backgroundImage, styles.tableBg]}
          source={{ uri: 'https://example.com/placeholder-table.png' }}
        />
      </View>

      {players.map(renderPlayer)}
      {renderGameTable()}
      {renderChatPanel()}
      {renderControls()}
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a4d3a',
    padding: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
    position: 'absolute',
  },
  table: {
    height: height(59),
    width: width(52),
    position: 'absolute',
    alignSelf: 'center',
    opacity: 1,
    top: height(20),
  },
  tableBg:{
    opacity: 1,
    transform: [{translateX: -500}]
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: height(12),
    top: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#A52A2A',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  gameInfo: {
    flexDirection: 'row-reverse',
    gap: 15,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'right',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  playerContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 3,
    opacity: .4,

  },
  playerTop: {
    top: height(2),
    left: width(38),
    flexDirection: 'row',
    width: 180
  },
  playerLeft: {
    left: width(6),
    bottom: height(28),
  },
  playerRight: {
    left: width(70),
    bottom: height(25),
  },
  playerBottom: {
    display: 'none',
    bottom: width(1),
    left: width(30),
    zIndex: 2,
    flexDirection: 'row'
  },
  playerBLeftRank: {
    width: 10,
    height: 10,
    backgroundColor: 'red'
  },
  playerAvatar: {
    width: height(15),
    height: height(15),
    borderRadius: 30,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#999',
  },
  avatarText: {
    fontSize: 24,
  },
  playerName: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  opponentCards: {
    gap: 2,
  },
  opponentCardsTop: {
    flexDirection: 'row',
  },
  opponentCardsLeft: {
    flexDirection: 'column',
  },
  opponentCardsRight: {
    flexDirection: 'column',
  },
  opponentCardsBottom: {
    flexDirection: 'row',
  },
  gameTable: {
    position: 'absolute',
    top: height(25),
    left: width(15),
    width: height(125),
    height: height(68),
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tableBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  tableCards: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  topCardPosition: {
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
  },
  sideCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    transform: [{ translateY: -30 }],
  },
  bottomCardPosition: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  centerArea: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  centerTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  centerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    width: 40,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardLeft :{
    backgroundColor: 'red'
  },
  hiddenCard: {
    backgroundColor: '#4169E1',
    borderWidth: 1,
    borderColor: '#1E40AF',
  },
  emptyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  playableCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSuit: {
    fontSize: 12,
    color: '#000',
  },
  redCard: {
    color: '#DC2626',
  },
  chatPanel: {
    position: 'absolute',
    right: width(1),
    top: height(15),
    width: width(20),
    height: height(60),
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A52A2A',
  },
  chatTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  chatMessages: {
    flex: 1,
  },
  chatMessage: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
  },
  chatPlayerName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  chatMessageText: {
    color: 'white',
    fontSize: 11,
    marginTop: 2,
    textAlign: 'right',
  },
  chatTimestamp: {
    color: '#ccc',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'left',
  },
  lastCardContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    alignItems: 'center',
  },
  lastCardLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  strikerPicker: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  strikerButton: {
    width: 50,
    height: 50,
    backgroundColor: '#A52A2A',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  strikerText: {
    fontSize: 24,
  },
  sideControls: {
    position: 'absolute',
    left: 10,
    top: height(10),
    gap: 12,
  },
  controlButton: {
    width: 50,
    height: 50,
    backgroundColor: '#A52A2A',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  controlIcon: {
    fontSize: 20,
  },
});

export default CardGameScreen;