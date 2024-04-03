import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Welcome to Utibu App</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <FontAwesome name="sign-in" size={24} color="white" />
            <Text style={styles.buttonText}> Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleRegisterPress}>
            <FontAwesome name="user-plus" size={24} color="white" />
            <Text style={styles.buttonText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
