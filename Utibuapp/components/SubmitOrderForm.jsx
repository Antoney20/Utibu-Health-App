import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';

const SubmitOrderForm = ({ onSubmit, errors }) => {
  const [medication, setMedication] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = () => {
    onSubmit({ medication, quantity });
  };

  return (
    <Card>
      <TextInput
        style={styles.input}
        placeholder="Medication"
        value={medication}
        onChangeText={setMedication}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      {errors && <Text style={styles.error}>{errors}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Order</Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SubmitOrderForm;
