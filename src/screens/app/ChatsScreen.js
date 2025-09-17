
import { width, height } from '../../utils/dimension';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-remix-icon';
import Wallpaper from '../../components/wallpaper';
import BottomTabs from '../../route/BottomTabs';
import FriendsList from '../../components/FriendsList';
import AppColors from '../../utils/Colors';
import QuickActions from '../../components/QuickActions';
import Rank from '../../components/Rank';



const ChatsScreen = ({ navigation }) => {

  const [message, setMessage] = useState('');

  // Sample data for contacts
  const contacts = [
    { id: '1', name: 'whist_SD', avatar: require('../../assets/images/cover.png'), status: 'wd_albadawi, iron, Qtada_...' },
    { id: '2', name: 'wd_Albadawi', avatar: require('../../assets/images/cover.png'), status: 'متفرغ مبارة ببجي موبايل، هل تنضم؟' },
    { id: '3', name: 'Qtada_sami', avatar: require('../../assets/images/white-avatar.png'), status: 'متواجد في ديسكورد 🔥' },
    { id: '4', name: 'jadallah', avatar: require('../../assets/images/white-avatar.png'), status: 'متاح للعب ببجي موبايل في هذا الوقت' },
    { id: '5', name: 'king_ali', avatar: require('../../assets/images/white-avatar.png'), status: '...' },
  ];
  const group = { id: '6', name: 'whist_SD', avatar: require('../../assets/images/cover.png'), status: 'wd_albadawi, iron, Qtada_...' };

  // Sample data for achievements/badges
  const badges = [
    { id: '1', icon: require('../../assets/images/icon.png') },
    { id: '2', icon: require('../../assets/images/icon.png') },
    { id: '3', icon: require('../../assets/images/icon.png') },
    { id: '4', icon: require('../../assets/images/icon.png') },
  ];

  // Navigation items


  // Render contact item
  const renderContactItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactItem} 
      onPress={() => console.log(item.name)}
    >
      <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactStatus} numberOfLines={1}>{item.status}</Text>
      </View>
      <Image source={item.avatar} style={styles.contactAvatar} />
    </TouchableOpacity>
  );

  // Render badge item
  const renderBadgeItem = ({ item }) => (
    <Image source={item.icon} style={styles.badgeIcon} />
  );

  // Render navigation item
  const renderNavItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.navItem, item.active ? styles.navItemActive : null]}
    >
      <Text style={styles.navLabel}>{item.label}</Text>
      <Image source={item.icon} style={styles.navIcon} />
    </TouchableOpacity>
  );

  return (
    <Wallpaper >
      {/* Left section: Contacts */}
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن شخص أو نادي"
              placeholderTextColor="#999"
            />
            {/* <Search size={18} color="#999" style={styles.searchIcon} /> */}
          </View>
          <View style={styles.groupIcon}>
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{group.name}</Text>
                <Text style={styles.contactStatus} numberOfLines={1}></Text>
              </View>
              <Image source={group.avatar} style={styles.contactAvatar} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={contacts}
            renderItem={renderContactItem}
            keyExtractor={item => item.id}
            style={styles.contactsList}
          />
        </View>

        {/* Right section: Profile and Chat */}
        <View style={styles.rightSection}>
          {/* Profile header */}
          <View style={styles.profileHeader}>


            <View style={styles.avatarContainer}>
              <Image source={require('../../assets/images/cover.png')} style={styles.profileAvatar} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>wd_Albadawi</Text>
              <Image source={require('../../assets/images/flag.png')} style={styles.flagIcon} />
            </View>
            {/* Level and username section */}
            <View style={styles.levelSection}>
              <View style={styles.levelItem}>
                <Text style={styles.levelLabel}>: المستوى</Text>
                {/* <View style={styles.trophyContainer}>
              <Image source={require('../../assets/images/trophy.png')} style={styles.trophyIcon} />
            </View> */}
                <Rank></Rank>
              </View>

              <View style={styles.levelItem}>
                <Text style={styles.usernameLabel}>: اللاعب</Text>
                <Text style={styles.usernameValue}>whist_SD</Text>
              </View>

              <View style={styles.levelItem}>
                <Text style={styles.badgesLabel}>: الإنجازات</Text>
                <FlatList
                  data={badges}
                  renderItem={renderBadgeItem}
                  keyExtractor={item => item.id}
                  horizontal
                  style={styles.badgesList}
                />
              </View>
            </View>
          </View>



          {/* Chat section */}
          <View style={styles.chatSection}>
            <View style={styles.chatContainer}>
              {/* Today label */}
              <View style={styles.dayContainer}>
                <Text style={styles.dayLabel}>اليوم</Text>
              </View>

              {/* Action buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>اتصل</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>ساعدني</Text>
                </TouchableOpacity>
              </View>

              {/* Chat messages */}
              <ScrollView style={styles.messagesContainer}>
                <View style={styles.receivedMessage}>
                  <Text style={styles.messageText}>آخر تحديث يرفع طلب اللعب الآن</Text>
                </View>

                <View style={styles.receivedMessage}>
                  <Text style={styles.messageText}>كان بتلعب معي باغي انس سعادتك مع ناس متفرغين</Text>
                </View>
                <View style={styles.receivedMessage}>
                  <Text style={styles.messageText}>كان بتلعب معي باغي انس سعادتك مع ناس متفرغين</Text>
                </View>
                <View style={styles.receivedMessage}>
                  <Text style={styles.messageText}>كان بتلعب معي باغي انس سعادتك مع ناس متفرغين</Text>
                </View>

                <View style={styles.receivedMessage}>
                  <Text style={styles.messageText}>متفرغ مبارة ببجي موبايل. هل تنضم؟ ببليتشك متاحة للمباراة القادمة قبل نفاذ الوقت خلال الـ 20 الثانية</Text>
                </View>
              </ScrollView>

              {/* Message input */}
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.sendButton}>
                  <Icon name="send" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <TextInput
                  style={styles.messageInput}
                  placeholder="احسن ليك والله"
                  placeholderTextColor="#999"
                  value={message}
                  onChangeText={setMessage}
                />

                <TouchableOpacity style={styles.attachButton}>
                  <Image source={require('../../assets/images/Send.png')} style={styles.attachIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Navigation */}
        <BottomTabs></BottomTabs>
      </View>
    </Wallpaper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSection: {
    width: width(29),
    height: height(75),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    margin: 10,
    padding: 10,

  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 0,
    marginBottom: 15,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'arial',
  },
  contactsList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  contactInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  contactName: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  contactStatus: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'right',
  },
  profileHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  flagIcon: {
    width: 24,
    height: 16,
  },
  avatarContainer: {
    padding: 3,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#333',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  levelSection: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  levelLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  usernameLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  usernameValue: {
    color: '#fff',
    fontSize: 16,
  },
  badgesLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  trophyContainer: {
    flexDirection: 'row',
  },
  trophyIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 2,
  },
  badgesList: {
    height: 30,
  },
  badgeIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  chatSection: {
    flex: 1,
    marginTop: 10,
  },
  chatContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  dayContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dayLabel: {
    color: '#fff',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  actionButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#8B0000',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    maxWidth: width(78),
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
  },
  messageInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    textAlign: 'right',
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#8B0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachIcon: {
    width: 24,
    height: 24,
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
  },
  navContainer: {
    justifyContent: 'space-around',
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  navItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B0000',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default ChatsScreen;