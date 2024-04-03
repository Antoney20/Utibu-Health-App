import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function BottomTab({ navigation }) {

  return (
    <View style={styles.bottomTabContainer}>
      <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Dashboard')}>
          <FontAwesome name="home" size={24} color="black" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Medication')}>
          <FontAwesome name="medkit" size={24} color="black" />
          <Text style={styles.tabText}>Medication</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Settings')}>
          <FontAwesome name="cog" size={24} color="black" />
          <Text style={styles.tabText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
});
