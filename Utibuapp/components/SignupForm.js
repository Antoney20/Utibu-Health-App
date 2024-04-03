import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Signup({ onSubmit, error }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();



  const handleSubmit = () => {
    if (first_name && last_name && email && password) {
      onSubmit({ first_name, last_name, email, password });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>

    {error && ( // Returns any error message 
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={first_name}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={last_name}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button}  onPress={handleSubmit} >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Already have an account? 
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Click here to login</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
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
