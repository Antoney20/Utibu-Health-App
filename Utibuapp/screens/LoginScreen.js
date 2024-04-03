import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import LoginForm from '../components/LoginForm';
import { BASE_URL } from '@env'



const LoginScreen = () => {
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  console.log('API Base URL:', BASE_URL);

  

  const handleSubmit = async (formData) => {
    console.log(formData)
    try {

      const csrfResponse = await fetch(`${BASE_URL}csrf_token/`);
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      const response = await fetch(`${BASE_URL}login/`, {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData),
      });
      console.log(response)
      const data = await response.json();
      console.log('Registration successful:', data);


      if (!response.ok) {
        // If login is unsuccessful
        const errorMessage = data.message || 'Login failed';
        setError(errorMessage);
        return;
      }
    
      // If login is successful, navigate home

      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Login failed');
    }
  };

 

  return (
      <View style={styles.container}>
        <LoginForm onSubmit={handleSubmit}  error={error}/>
      </View>
    );
};

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
});

export default LoginScreen;

