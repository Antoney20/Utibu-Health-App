import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginForm = ({ onSubmit , error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      onSubmit({ email, password });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
     <View style={styles.card}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        keyboardType="numeric"
      />
     {error && ( // Returns any error message 
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <Button title="Login" style={styles.buttonText} onPress={handleSubmit} color="#007bff" />
      </View>

  );
};

const styles = StyleSheet.create({
      card: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      errorCard: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      errorText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default LoginForm;
