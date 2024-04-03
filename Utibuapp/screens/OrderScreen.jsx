import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import BottomTab from '../components/BottomTab';
import { BASE_URL } from '@env';

export default function MedicationDetailsScreen({ route, navigation }) {
  const { medicationId } = route.params;
  const [medication, setMedication] = useState(null);

  useEffect(() => {
    const fetchMedicationDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}medication_details/${medicationId}`);
        const data = await response.json();
        setMedication(data);
      } catch (error) {
        console.error('Error fetching medication details:', error);
      }
    };
  
    fetchMedicationDetails();
  }, [medicationId]);

  const handleOrderNow = async () => {
    try {
      const requestBody = {
        medication: medicationId,
      };
      console.log(requestBody)

      const csrfResponse = await fetch(`${BASE_URL}csrf_token/`);
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;
      console.log(csrfToken)
  
      const response = await fetch(`${BASE_URL}api/submit_order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
      
      const responseData = await response.json();
      
      console.log('Order submitted successfully:', responseData);
      Alert.alert('Success', 'Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error.message);
      Alert.alert('Error', 'Failed to submit order');
    }
  };
  
  const handleSetReminder = () => {
    // Implement reminder functionality
  };

  if (!medication) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{medication.name}</Text>
      <Text style={styles.description}>{medication.description}</Text>
      <Text style={styles.price}>{medication.price}</Text>
      <TouchableOpacity style={styles.button} onPress={handleOrderNow}>
        <Text style={styles.buttonText}>Order Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSetReminder}>
        <Text style={styles.buttonText}>Set Reminder</Text>
      </TouchableOpacity>
      <BottomTab navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});