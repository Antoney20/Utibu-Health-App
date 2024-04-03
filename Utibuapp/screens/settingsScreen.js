import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import BottomTab from '../components/BottomTab';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.card}>
        <FontAwesome name="lock" size={24} color="black" />
        <Text style={styles.cardText}>Privacy and Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="moon-o" size={24} color="black" />
        <Text style={styles.cardText}>Dark Mode</Text>
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="info-circle" size={24} color="black" />
        <Text style={styles.cardText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="phone" size={24} color="black" />
        <Text style={styles.cardText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="user-circle-o" size={24} color="black" />
        <Text style={styles.cardText}>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="history" size={24} color="black" />
        <Text style={styles.cardText}>My History</Text>
      </TouchableOpacity>
      <BottomTab navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '100%',
  },
  cardText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default SettingsScreen;
