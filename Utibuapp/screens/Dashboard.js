import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BottomTab from '../components/BottomTab';


function Dashboard({ navigation }) {


  return (
    <View style={styles.container}> 
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Medication')}>
        <Text style={styles.cardTitle}>Medication</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('order')}>
        <Text style={styles.cardTitle}>Orders</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Visit</Text>
      </View>
      <BottomTab navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Dashboard;