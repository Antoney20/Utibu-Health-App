import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { BASE_URL } from '@env';
import Signup from '../components/SignupForm';

const Register = () => {

  const [error, setError] = useState(null); 
  const navigation = useNavigation();
  console.log('API Base URL  signup:', BASE_URL);

 const handleSubmit = async (formData) => {
  try {
    const csrfResponse = await fetch(`${BASE_URL}csrf_token/`);
    const csrfData = await csrfResponse.json();
    const csrfToken = csrfData.csrfToken;

    const response = await fetch(`${BASE_URL}api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        'Cookie': `csrftoken=${csrfToken}`, // Include the CSRF token in the Cookie header
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok!');
    }

    console.log(response)
    const data = await response.json();
    console.log('Registration successful:', data);

    // If login is successful, navigate home

    navigation.navigate('Login');
    
  } catch (error) {
    console.error('Registration failed:', error.message);
    setError(error.message);
  }
};


  return (
    <View style={styles.container}>
      <Signup onSubmit={handleSubmit} error ={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f0f8ff', 
  },
});

export default Register;