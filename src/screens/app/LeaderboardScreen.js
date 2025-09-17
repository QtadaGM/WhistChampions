
import { width, height } from '../../utils/dimension';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Wallpaper from '../../components/wallpaper';
import BottomTabs from '../../route/BottomTabs';
import FriendsList from '../../components/FriendsList';
import AppColors from '../../utils/Colors';
import QuickActions from '../../components/QuickActions';





const LeaderboardScreen = ({ navigation }) => {
  const [activeSubTab, setActiveSubTab] = useState(0)
    // Sample data for the leaderboard table
    const leaderboardData = [
      {
        id: '1',
        rank: '١',
        team: 'ويستنا',
        level: '٥',
        player1: 'Wd_albadawi',
        player2: 'Wd_albadawi',
        skills1: '١',
        skills2: '٢',
        points: '٣'
      },
      // More data rows can be added here
    ];

    const leaderboardDataOne = [
      {
        id: '1',
        rank: '١',
        team: 'ويستنا',
        level: '٥',
        player1: 'Wd_albadawi',
        player2: 'Wd_albadawi',
        skills1: '١',
        skills2: '٢',
        points: '٣666'
      },
      // More data rows can be added here
    ];

    const boardData = ()=> {
      switch(activeSubTab) {
        case 0:
          return leaderboardData;
        break;
        case 1:
          return leaderboardDataOne;
        break;
        default:
          return leaderboardData;
        break;
        
      }
    }
  
    return (
      <Wallpaper style={styles.container}>
        {/* Header with logo and title */}
        
  
        {/* Main navigation menu */}
        <View style={styles.navigationMenu}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/icon.png')} 
            style={styles.logo} 
          />
          <Text style={styles.headerTitle}>ويست الأبطال</Text>
        </View>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>المجموعات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>الدوريات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>المستوى العالمي</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
            <Text style={styles.navButtonText}>السيكات</Text>
          </TouchableOpacity>
        </View>
  
        {/* Sub tabs */}
        <View style={styles.subTabsContainer}>
          <TouchableOpacity onPress={()=>setActiveSubTab(0)} style={[styles.subTab, activeSubTab === 0 && styles.activeSubTab]}>
            <Text style={styles.subTabText}>سيكات لديهم</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.subTab, activeSubTab === 1 && styles.activeSubTab]} onPress={()=>setActiveSubTab(1)}>
            <Text style={styles.subTabText}>سيكات لديهم</Text>
          </TouchableOpacity>
        </View>
  
        {/* Table header */}
        <View style={styles.tableHeader}>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>النقاط</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>سيكات ٢</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>سيكات ١</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>اللاعب ٢</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>اللاعب ١</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>المستوى</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>الفريق</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>الترتيب</Text>
          </View>
        </View>
  
        {/* Table content */}
        <ScrollView style={styles.tableContent}>
          {boardData().map(item => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.points}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.skills2}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.skills1}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.player2}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.player1}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.level}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.team}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.rank}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Bottom navigation tabs */}
          <BottomTabs style={styles.bottomTabs} />
      </Wallpaper>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      padding: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    logo: {
      width: 40,
      height: 40,
      marginLeft: 10,
    },
    headerTitle: {
      color: '#FFD700', // Gold color
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    navigationMenu: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: height(1),
    },
    navButton: {
      backgroundColor: '#8B0000', // Dark red
      paddingHorizontal: width(1),
      flex: 1,
      // paddingVertical: height(1),
      justifyContent: 'center',
      alignItems: 'center',
      // borderRadius: 8,
      minWidth: width(10),
      alignItems: 'center',
    },
    activeNavButton: {
      backgroundColor: '#B22222', // Lighter red for active state
    },
    navButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    

    subTabsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(20, 20, 20, 0.8)',
    },
    subTab: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 5,
      marginLeft: 10,
    },
    activeSubTab: {
      backgroundColor: '#8B0000', // Dark red for active tab
    },
    subTabText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#8B0000', // Dark red
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      marginTop: 10,
      marginHorizontal: 10,
    },
    tableHeaderCell: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tableHeaderText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
    tableContent: {
      backgroundColor: 'rgba(40, 40, 40, 0.9)',
      marginHorizontal: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      flex: 1,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    tableCell: {
      flex: 1,
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tableCellText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
    },
  });
  export default LeaderboardScreen;