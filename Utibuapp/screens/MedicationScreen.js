import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '../components/BottomTab';
import { BASE_URL } from '@env';

export default function MedicationScreen() {
  const [medications, setMedications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await fetch(`${BASE_URL}medication_list/`);
      const data = await response.json();
      setMedications(data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const handleMedicationPress = (medicationId) => {
    navigation.navigate('MedicationDetails', { medicationId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleMedicationPress(item.id)}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Order Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
      <BottomTab navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#00FFFF',
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    flex: 1,
    minWidth: '45%',
    maxWidth: '45%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  orderButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
